## Features

* [ASP.NET Core](http://www.dot.net/)
* [Angular](https://angular.io/)
* [Angular CLI](https://cli.angular.io/) (Only code scaffolding for now)
* [Webpack 2](https://webpack.github.io/)
* [Bootstrap 4](http://v4-alpha.getbootstrap.com/)
* [ng-bootstrap](https://ng-bootstrap.github.io/)
* [@ngx-translate](http://www.ngx-translate.com/)
* [Typescript 2](http://www.typescriptlang.org/)
* [SASS](http://sass-lang.com/) support
* [Best practices](https://angular.io/docs/ts/latest/guide/style-guide.html) in file and application organization for Angular.
* Testing Angular code with [Jasmine](http://jasmine.github.io/) and [Karma](https://karma-runner.github.io/0.13/index.html).
* [HMR](https://webpack.github.io/docs/hot-module-replacement.html) (Hot Module Replacement) with Webpack
* Webpack DLL support for fast rebuilds
* [Compodoc](https://compodoc.github.io/compodoc/) for Angular documentation
* [Server](https://github.com/aspnet/dotnet-watch) and [client](https://webpack.github.io/docs/hot-module-replacement.html) watches
* [jQuery](https://jquery.com/) for building front-end application
* [Sammyjs](http://sammyjs.org) for building front-end application

## Pre-requisites

1. [.Net core sdk](https://www.microsoft.com/net/core#windows)
2. Either [VSCode](https://code.visualstudio.com/) with [C#](https://marketplace.visualstudio.com/items?itemName=ms-vscode.csharp) extension OR [Visual studio 2017](https://www.visualstudio.com/)
3. [Nodejs](https://nodejs.org/en/)

**Make sure you have Node version >= 6.9.x and NPM >= 3**

## Installation

1. Change directory to root of source code
	cd WebApplication
2. dotnet restore
3. Install global dependencies
	npm install protractor rimraf http-server @angular/cli -g
4. Install dependency packages
	npm install
6. Run the app (in Development mode)
	npm run dev:watch
6. Run the app (in Production mode)
	npm run build:prod