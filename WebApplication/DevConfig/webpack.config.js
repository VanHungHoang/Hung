const fs = require('fs');
const path = require('path');
const helpers = require('./helpers');
const webpack = require('webpack');
const postcssUrl = require('postcss-url');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const { NoEmitOnErrorsPlugin, SourceMapDevToolPlugin, NamedModulesPlugin } = require('webpack');
const ngcWebpack = require('ngc-webpack');
const { CommonsChunkPlugin } = require('webpack').optimize;
const devConfig = require('./webpack.dev');
const prodConfig = require('./webpack.prod');
const isDevBuild = process.argv.indexOf('--env.prod') < 0;
const nodeModules = path.join(process.cwd(), 'node_modules');

const HMR = helpers.hasProcessFlag('hot');
const AOT = helpers.hasNpmFlag('aot');

const minimizeCss = false;
const baseHref = "";
const deployUrl = "";

const realNodeModules = fs.realpathSync(nodeModules);
const genDirNodeModules = path.join(process.cwd(), 'Client', '$$_gendir', 'node_modules');

const postcssPlugins = function () {
    // safe settings based on: https://github.com/ben-eb/cssnano/issues/358#issuecomment-283696193
    const importantCommentRe = /@preserve|@license|[@#]\s*source(?:Mapping)?URL|^!/i;
    const minimizeOptions = {
        autoprefixer: false,
        safe: true,
        mergeLonghand: false,
        discardComments: { remove: (comment) => !importantCommentRe.test(comment) }
    };
    return [
        postcssUrl({
            url: (URL) => {
                // Only convert root relative URLs, which CSS-Loader won't process into require().
                if (!URL.startsWith('/') || URL.startsWith('//')) {
                    return URL;
                }
                if (deployUrl.match(/:\/\//)) {
                    // If deployUrl contains a scheme, ignore baseHref use deployUrl as is.
                    return `${deployUrl.replace(/\/$/, '')}${URL}`;
                }
                else if (baseHref.match(/:\/\//)) {
                    // If baseHref contains a scheme, include it as is.
                    return baseHref.replace(/\/$/, '') +
                        `/${deployUrl}/${URL}`.replace(/\/\/+/g, '/');
                }
                else {
                    // Join together base-href, deploy-url and the original URL.
                    // Also dedupe multiple slashes into single ones.
                    return `/${baseHref}/${deployUrl}/${URL}`.replace(/\/\/+/g, '/');
                }
            }
        }),
        autoprefixer(),
    ].concat(minimizeCss ? [cssnano(minimizeOptions)] : []);
};

console.log("==========Is Dev Build = " + isDevBuild + " ============")
console.log("==========Is AOT Build = " + AOT + " ============")

let commonConfig = {
    entry: {
        /*
         * Entry for back-end
         */
        'backendApp': AOT ? './Client/backend/main.aot.ts' : './Client/backend/main.ts',
        'backendpolyfills': './Client/backend/polyfills.ts',
        /*
         * Entries for front-end 
         */
        'frontendMain': './Client/frontend/main.ts'
    },
    devtool: 'inline-source-map',
    output: {
        path: path.join(__dirname, '../wwwroot/dist/'),
        publicPath: '/dist/',
        // The name of the global variable which the library's
        // require() function will be assigned to
        library: '[name]_lib'
    },
    resolve: {
        /*
       * An array of extensions that should be used to resolve modules.
       *
       * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
       */
        extensions: ['.ts', '.js'],

        // An array of directory names to be resolved to the current directory
        modules: [helpers.root('Client/frontend'), helpers.root('Client/backend'), 'node_modules']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: [/\.(spec|e2e)\.ts$/],
                use: [
                    {
                        loader: 'ng-router-loader',
                        options: {
                            loader: 'async-import',
                            genDir: 'compiled',
                            aot: AOT
                        }
                    },
                    'awesome-typescript-loader',
                    'angular2-template-loader'
                ]
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    //use: "css-loader"
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: false,
                                importLoaders: 1
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                                ident: 'postcss',
                                plugins: postcssPlugins
                            }
                        }
                    ]
                })
            },
            {
                test: /\.scss$|\.sass$/,
                loader: ExtractTextPlugin.extract({
                    //fallback: "style-loader",
                    use: [
                        "exports-loader?module.exports.toString()",
                        //'to-string-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: false,
                                importLoaders: 1
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                                ident: 'postcss',
                                plugins: postcssPlugins
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                precision: 8,
                                includePaths: []
                            }
                        }
                    ]
                })
            },
            { test: /\.html$/, use: 'raw-loader' },
            { test: /\.json$/, use: 'json-loader' },
            {
                test: /\.(jpg|png|webp|gif|otf|ttf|woff|woff2|ani)$/,
                //loader: "url-loader?name=[name].[hash:20].[ext]&limit=10000"
                loader: "file-loader?name=assets/[path][name].[hash:20].[ext]"
            },
            {
                test: /\.(eot|svg|cur)$/,
                loader: "file-loader?name=assets/[path][name].[hash:20].[ext]"
            }
            //{ test: /\.(jpg|png|gif)$/, loader: 'file-loader?name=assets/[name].[ext]!extract-loader!html-loader' },
            //{ test: /\.(jpg|png|gif)$/, loader: 'url-loader?limit=25000' },
            /*{
                test: /\.(jpg|png|gif)$/,
                loader: 'file-loader',
                options: {
                    context: '',
                    name: '[path][name].[ext]',
                    publicPath: 'assets/'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                loader: 'file-loader',
                options: {
                    context: '',
                    name: '[path][name].[ext]',
                    publicPath: 'assets/'
                }
            }*/
            //{ test: /\.(woff|woff2|eot|ttf|svg)$/, loader: 'file-loader?name=assets/[name].[ext]!extract-loader!html-loader' }
        ]
    },
    profile: true,
    plugins: [
        new NoEmitOnErrorsPlugin(),

        new ProgressPlugin(),
        new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' }), // Maps these identifiers to the jQuery package (because Bootstrap expects it to be a global variable)
        new CleanWebpackPlugin([path.join(__dirname, '../wwwroot/dist/')]),
        // ExtractTextPlugin generates a file per entry, so you must use [name], [id] or [contenthash] when using multiple entries
        // Reference: https://webpack.js.org/plugins/extract-text-webpack-plugin/
        new ExtractTextPlugin("[name].css"),
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(isDevBuild ? 'Development' : 'Production')
            }
        }),
        /*
       * Plugin: ForkCheckerPlugin
       * Description: Do type checking in a separate process, so webpack don't need to wait.
       *
       * See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
       */
        new CheckerPlugin(),
        new ngcWebpack.NgcWebpackPlugin({
            disabled: !AOT,
            tsConfig: helpers.root('tsconfig.webpack.json')
        }),
        new CommonsChunkPlugin({
            name: [
              'backendApp'
            ],
            minChunks: 2,
            async: 'common'
        }),
        new CommonsChunkPlugin({
            'name': ['backendvendor'],
            'minChunks': (module) => {
                return module.resource
                    && (module.resource.startsWith(nodeModules)
                        || module.resource.startsWith(genDirNodeModules)
                        || module.resource.startsWith(realNodeModules));
            },
            'chunks': [
              'backendApp'
            ]
        }),
        new webpack.optimize.CommonsChunkPlugin({
            'name': ['frontendvendor'],
            'minChunks': (module) => {
                return module.resource
                    && (module.resource.startsWith(nodeModules)
                        || module.resource.startsWith(genDirNodeModules)
                        || module.resource.startsWith(realNodeModules));
            },
            'chunks': [
                'frontendMain'
            ]
          }),
        /**
         * Plugin: ContextReplacementPlugin
         * Description: Provides context to Angular's use of System.import
         *
         * See: https://webpack.github.io/docs/list-of-plugins.html#contextreplacementplugin
         * See: https://github.com/angular/angular/issues/11580
         */
        new ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)@angular/,
            helpers.root('Client'), // location of your Client
            {
                // your Angular Async Route paths relative to this root directory
            }
        ),
        /**
         * Vendors for jQuery and jQuery's plugins
         */
        
        /*new webpack.optimize.CommonsChunkPlugin({
            "name": [
                "frontEndVendor"
            ],
            "minChunks": (module) => {
                console.log(module.resource);
                return module.resource && module.resource.startsWith(nodeModules)
                    && (
                        module.resource.endsWith('jquery.js')
                        ||
                        module.resource.indexOf('sammy') != -1
                        ||
                        module.resource.indexOf('mustache') != -1
                    );
            },
            "chunks": [
                "frontendMain"
            ]
        })*/
        
    ]
};

module.exports = commonConfig;
