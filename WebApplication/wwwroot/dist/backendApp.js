var backendApp_lib =
webpackJsonp_name__lib([1],{

/***/ 107:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// What is core module: https://angular.io/guide/ngmodule#the-core-module
var core_1 = __webpack_require__(4);
var common_1 = __webpack_require__(31);
var http_1 = __webpack_require__(78);
var forms_1 = __webpack_require__(120);
var core_2 = __webpack_require__(80);
var router_1 = __webpack_require__(29);
var translation_service_1 = __webpack_require__(143);
var SharedModule = (function () {
    function SharedModule() {
    }
    SharedModule_1 = SharedModule;
    /**
     * forRoot
     * Referent: https://angular.io/guide/ngmodule#configure-core-services-with-coremoduleforroot
     */
    SharedModule.forRoot = function () {
        return {
            ngModule: SharedModule_1,
            providers: [translation_service_1.TranslationService]
        };
    };
    SharedModule = SharedModule_1 = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                http_1.HttpModule,
                forms_1.FormsModule,
                core_2.TranslateModule,
                forms_1.ReactiveFormsModule,
                router_1.RouterModule
            ],
            exports: [
                common_1.CommonModule,
                http_1.HttpModule,
                forms_1.FormsModule,
                core_2.TranslateModule,
                forms_1.ReactiveFormsModule,
                router_1.RouterModule
            ],
            declarations: [],
            providers: []
        })
    ], SharedModule);
    return SharedModule;
    var SharedModule_1;
}());
exports.SharedModule = SharedModule;


/***/ }),

/***/ 118:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 118;

/***/ }),

/***/ 143:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(4);
var ApiOriginUri_1 = __webpack_require__(144);
var data_service_1 = __webpack_require__(145);
var TranslationService = (function () {
    function TranslationService(apiUri, dataService) {
        this.apiUri = apiUri;
        this.dataService = dataService;
    }
    TranslationService.prototype.get = function (twoLetterLanguage) {
        return this.dataService.get(this.apiUri.API_ORIGIN_URI + '/Translation', { lang: twoLetterLanguage || 'en' });
    };
    TranslationService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [ApiOriginUri_1.ApiOriginUri, data_service_1.DataService])
    ], TranslationService);
    return TranslationService;
}());
exports.TranslationService = TranslationService;


/***/ }),

/***/ 144:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(4);
var ApiOriginUri = (function () {
    function ApiOriginUri() {
    }
    Object.defineProperty(ApiOriginUri.prototype, "API_ORIGIN_URI", {
        /**
         * Gets current Uri to the API host
         */
        get: function () {
            return window['__apiUri__'];
        },
        enumerable: true,
        configurable: true
    });
    ApiOriginUri = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], ApiOriginUri);
    return ApiOriginUri;
}());
exports.ApiOriginUri = ApiOriginUri;


/***/ }),

/***/ 145:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(4);
var http_1 = __webpack_require__(78);
var Rx_1 = __webpack_require__(146);
var Subject_1 = __webpack_require__(6);
var utility_service_1 = __webpack_require__(165);
var data_service_options_1 = __webpack_require__(455);
var DataService = (function () {
    function DataService(http, us) {
        this.http = http;
        this.us = us;
        // Define the internal Subject we'll use to push the command count
        this.pendingCommandsSubject = new Subject_1.Subject();
        this.pendingCommandCount = 0;
        this.pendingCommands$ = this.pendingCommandsSubject.asObservable();
    }
    // I perform a GET request to the API, appending the given params
    // as URL search parameters. Returns a stream.
    DataService.prototype.get = function (url, params) {
        var options = new data_service_options_1.DataServiceOptions();
        options.method = http_1.RequestMethod.Get;
        options.url = url;
        options.params = params;
        return this.request(options);
    };
    // I perform a POST request to the API. If both the params and data
    // are present, the params will be appended as URL search parameters
    // and the data will be serialized as a JSON payload. If only the
    // data is present, it will be serialized as a JSON payload. Returns
    // a stream.
    DataService.prototype.post = function (url, data, params) {
        if (!data) {
            data = params;
            params = {};
        }
        var options = new data_service_options_1.DataServiceOptions();
        options.method = http_1.RequestMethod.Post;
        options.url = url;
        options.params = params;
        options.data = data;
        return this.request(options);
    };
    DataService.prototype.put = function (url, data, params) {
        if (!data) {
            data = params;
            params = {};
        }
        var options = new data_service_options_1.DataServiceOptions();
        options.method = http_1.RequestMethod.Put;
        options.url = url;
        options.params = params;
        options.data = data;
        return this.request(options);
    };
    DataService.prototype.delete = function (url) {
        var options = new data_service_options_1.DataServiceOptions();
        options.method = http_1.RequestMethod.Delete;
        options.url = url;
        return this.request(options);
    };
    DataService.prototype.request = function (options) {
        var _this = this;
        options.method = (options.method || http_1.RequestMethod.Get);
        options.url = (options.url || '');
        options.headers = (options.headers || {});
        options.params = (options.params || {});
        options.data = (options.data || {});
        this.interpolateUrl(options);
        this.addXsrfToken(options);
        this.addContentType(options);
        this.addAuthToken(options);
        var requestOptions = new http_1.RequestOptions();
        requestOptions.method = options.method;
        requestOptions.url = options.url;
        requestOptions.headers = options.headers;
        requestOptions.search = this.buildUrlSearchParams(options.params);
        requestOptions.body = JSON.stringify(options.data);
        this.pendingCommandsSubject.next(++this.pendingCommandCount);
        var stream = this.http.request(options.url, requestOptions)
            .catch(function (error) {
            _this.handleErrors(error);
            return Rx_1.Observable.throw(error);
        })
            .map(this.unwrapHttpValue)
            .catch(function (error) {
            return Rx_1.Observable.throw(_this.unwrapHttpError(error));
        })
            .finally(function () {
            _this.pendingCommandsSubject.next(--_this.pendingCommandCount);
        });
        return stream;
    };
    DataService.prototype.addContentType = function (options) {
        // if (options.method !== RequestMethod.Get) {
        options.headers['Content-Type'] = 'application/json; charset=UTF-8';
        // }
        return options;
    };
    DataService.prototype.addAuthToken = function (options) {
        var authTokens = localStorage.getItem('auth-tokens');
        if (authTokens) {
            // tslint:disable-next-line:whitespace
            options.headers.Authorization = 'Bearer ' + JSON.parse(authTokens).access_token;
        }
        return options;
    };
    DataService.prototype.extractValue = function (collection, key) {
        var value = collection[key];
        delete (collection[key]);
        return value;
    };
    DataService.prototype.addXsrfToken = function (options) {
        var xsrfToken = this.getXsrfCookie();
        if (xsrfToken) {
            options.headers['X-XSRF-TOKEN'] = xsrfToken;
        }
        return options;
    };
    DataService.prototype.getXsrfCookie = function () {
        var matches = document.cookie.match(/\bXSRF-TOKEN=([^\s;]+)/);
        try {
            return matches ? decodeURIComponent(matches[1]) : '';
        }
        catch (decodeError) {
            return '';
        }
    };
    // private addCors(options: DataServiceOptions): DataServiceOptions {
    //     options.headers['Access-Control-Allow-Origin'] = '*';
    //     return options;
    // }
    DataService.prototype.buildUrlSearchParams = function (params) {
        var searchParams = new http_1.URLSearchParams();
        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                searchParams.append(key, params[key]);
            }
        }
        return searchParams;
    };
    DataService.prototype.interpolateUrl = function (options) {
        var _this = this;
        options.url = options.url.replace(/:([a-zA-Z]+[\w-]*)/g, function ($0, token) {
            // Try to move matching token from the params collection.
            if (options.params.hasOwnProperty(token)) {
                return (_this.extractValue(options.params, token));
            }
            // Try to move matching token from the data collection.
            if (options.data.hasOwnProperty(token)) {
                return (_this.extractValue(options.data, token));
            }
            // If a matching value couldn't be found, just replace
            // the token with the empty string.
            return ('');
        });
        // Clean up any repeating slashes.
        options.url = options.url.replace(/\/{2,}/g, '/');
        // Clean up any trailing slashes.
        options.url = options.url.replace(/\/+$/g, '');
        return options;
    };
    DataService.prototype.unwrapHttpError = function (error) {
        try {
            return (error.json());
        }
        catch (jsonError) {
            return ({
                code: -1,
                message: 'An unexpected error occurred.'
            });
        }
    };
    DataService.prototype.unwrapHttpValue = function (value) {
        return (value.json());
    };
    DataService.prototype.handleErrors = function (error) {
        if (error.status === 401) {
            sessionStorage.clear();
            this.us.navigateToSignIn();
        }
        else if (error.status === 403) {
            // Forbidden
            this.us.navigateToSignIn();
        }
    };
    DataService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, utility_service_1.UtilityService])
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;


/***/ }),

/***/ 165:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(4);
var router_1 = __webpack_require__(29);
var Rx_1 = __webpack_require__(146);
var UtilityService = (function () {
    function UtilityService(router) {
        this._router = router;
    }
    UtilityService.prototype.convertDateTime = function (date) {
        var _formattedDate = new Date(date.toString());
        return _formattedDate.toDateString();
    };
    UtilityService.prototype.navigate = function (path) {
        this._router.navigate([path]);
    };
    UtilityService.prototype.navigateToSignIn = function () {
        this.navigate('/login');
    };
    UtilityService.prototype.getParams = function () {
        var searchParams = window.location.search.split('?')[1];
        if (searchParams) {
            var paramsObj_1 = {};
            searchParams.split('&').forEach(function (i) {
                paramsObj_1[i.split('=')[0]] = i.split('=')[1];
            });
            return paramsObj_1;
        }
        return undefined;
    };
    UtilityService.prototype.readableColumnName = function (columnName) {
        // Convert underscores to spaces
        if (typeof (columnName) === 'undefined' || columnName === undefined || columnName === null) {
            return columnName;
        }
        if (typeof (columnName) !== 'string') {
            columnName = String(columnName);
        }
        return columnName.replace(/_+/g, ' ')
            .replace(/^[A-Z]+$/, function (match) {
            return ((match.charAt(0)).toUpperCase() + match.slice(1)).toLowerCase();
        })
            .replace(/([\w\u00C0-\u017F]+)/g, function (match) {
            return (match.charAt(0)).toUpperCase() + match.slice(1);
        })
            .replace(/(\w+?(?=[A-Z]))/g, '$1 ');
    };
    UtilityService.prototype.loadStyle = function (link) {
        if (this.isLoadedStyle(link)) {
            return Rx_1.Observable.of('');
        }
        else {
            var head = document.getElementsByTagName('head')[0];
            // Load jquery Ui
            var styleNode = document.createElement('link');
            styleNode.rel = 'stylesheet';
            styleNode.type = 'text/css';
            styleNode.href = link;
            styleNode.media = 'all';
            head.appendChild(styleNode);
            return Rx_1.Observable.fromEvent(styleNode, 'load');
        }
    };
    UtilityService.prototype.loadScript = function (script) {
        if (this.isLoadedScript(script)) {
            return Rx_1.Observable.of('');
        }
        else {
            var head = document.getElementsByTagName('head')[0];
            // Load jquery Ui
            var scriptNode = document.createElement('script');
            scriptNode.src = script;
            scriptNode.async = false;
            // scriptNode.type = 'text/javascript';
            // scriptNode.charset = 'utf-8';
            head.insertBefore(scriptNode, head.firstChild);
            return Rx_1.Observable.fromEvent(scriptNode, 'load');
        }
    };
    // Detect if library loaded
    UtilityService.prototype.isLoadedScript = function (lib) {
        return document.querySelectorAll('[src="' + lib + '"]').length > 0;
    };
    UtilityService.prototype.isLoadedStyle = function (lib) {
        return document.querySelectorAll('[href="' + lib + '"]').length > 0;
    };
    UtilityService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router])
    ], UtilityService);
    return UtilityService;
}());
exports.UtilityService = UtilityService;


/***/ }),

/***/ 166:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(4);
var HomeComponent = (function () {
    function HomeComponent() {
    }
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'app-child-home',
            template: __webpack_require__(462),
            styles: [__webpack_require__(463)]
        }),
        __metadata("design:paramtypes", [])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;


/***/ }),

/***/ 179:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(34);
module.exports = __webpack_require__(180);


/***/ }),

/***/ 180:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(181);
var core_1 = __webpack_require__(4);
var platform_browser_dynamic_1 = __webpack_require__(185);
var app_module_1 = __webpack_require__(187);
var environment_1 = __webpack_require__(464);
if (environment_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);


/***/ }),

/***/ 181:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 187:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(4);
var animations_1 = __webpack_require__(188);
var platform_browser_1 = __webpack_require__(32);
var http_1 = __webpack_require__(78);
var forms_1 = __webpack_require__(120);
var core_2 = __webpack_require__(80);
var app_component_1 = __webpack_require__(194);
var nav_component_1 = __webpack_require__(196);
var app_routes_1 = __webpack_require__(198);
var core_module_1 = __webpack_require__(456);
var shared_module_1 = __webpack_require__(107);
var api_translation_loader_service_1 = __webpack_require__(459);
var home_module_1 = __webpack_require__(460);
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                animations_1.BrowserAnimationsModule,
                platform_browser_1.BrowserModule,
                app_routes_1.appRouting,
                http_1.HttpModule,
                forms_1.FormsModule,
                core_module_1.CoreModule.forRoot(),
                shared_module_1.SharedModule.forRoot(),
                home_module_1.HomeModule,
                core_2.TranslateModule.forRoot({ loader: { provide: core_2.TranslateLoader, useClass: api_translation_loader_service_1.ApiTranslationLoader } })
            ],
            declarations: [
                app_component_1.AppComponent,
                nav_component_1.NavComponent
            ],
            providers: [],
            // Bootstrap simutanously both AppComponent and NavComponent
            bootstrap: [app_component_1.AppComponent, nav_component_1.NavComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;


/***/ }),

/***/ 194:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(4);
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'root-app',
            template: __webpack_require__(195)
        }),
        __metadata("design:paramtypes", [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;


/***/ }),

/***/ 195:
/***/ (function(module, exports) {

module.exports = "<!-- component routing placeholder -->\r\n<div class=\"container-fluid component-placehoder\">\r\n    <div class=\"component-placehoder-inner\">\r\n        <router-outlet></router-outlet>\r\n    </div>\r\n</div>"

/***/ }),

/***/ 196:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(4);
var NavComponent = (function () {
    function NavComponent() {
    }
    NavComponent = __decorate([
        core_1.Component({
            selector: 'nav-app',
            template: __webpack_require__(197)
        }),
        __metadata("design:paramtypes", [])
    ], NavComponent);
    return NavComponent;
}());
exports.NavComponent = NavComponent;


/***/ }),

/***/ 197:
/***/ (function(module, exports) {

module.exports = "\r\n<ul class='sublinks collapse in'>\r\n    <li class=\"list-group-item small\" routerLinkActive=\"active-menu\">\r\n        <a [routerLink]=\"['home']\">\r\n            <span class='glyphicon glyphicon-home pull-left'></span> Home\r\n        </a>\r\n    </li>\r\n    <li class=\"list-group-item small\" routerLinkActive=\"active-menu\">\r\n        <a [routerLink]=\"['setting']\">\r\n            <span class='glyphicon glyphicon-education pull-left'></span> Setting\r\n        </a>\r\n    </li>\r\n</ul>"

/***/ }),

/***/ 198:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = __webpack_require__(29);
// Core app router
var routes = [
    // Redirect to Home's routing module
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    // Lazy async route modules
    { path: 'setting', loadChildren: function() { return __webpack_require__.e/* import() */(0).then(__webpack_require__.bind(null, 530))  .then( function(module) { return module['SettingModule']; } ); } }
];
exports.appRouting = router_1.RouterModule.forRoot(routes, { preloadingStrategy: router_1.PreloadAllModules });


/***/ }),

/***/ 455:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DataServiceOptions = (function () {
    function DataServiceOptions() {
        this.headers = {};
        this.params = {};
        this.data = {};
    }
    return DataServiceOptions;
}());
exports.DataServiceOptions = DataServiceOptions;


/***/ }),

/***/ 456:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
// What is core module: https://angular.io/guide/ngmodule#the-core-module
var core_1 = __webpack_require__(4);
var common_1 = __webpack_require__(31);
var router_1 = __webpack_require__(29);
var ExtHashLocationStrategy_1 = __webpack_require__(457);
var StatelessRouteReuseStrategy_1 = __webpack_require__(458);
var ApiOriginUri_1 = __webpack_require__(144);
var data_service_1 = __webpack_require__(145);
var utility_service_1 = __webpack_require__(165);
var CoreModule = (function () {
    function CoreModule(parentModule) {
        // Prevent reimport of the CoreModule
        if (parentModule) {
            throw new Error('CoreModule is already imported. Import it in the AppModule only');
        }
    }
    CoreModule_1 = CoreModule;
    /**
     * forRoot
     * Referent: https://angular.io/guide/ngmodule#configure-core-services-with-coremoduleforroot
     */
    CoreModule.forRoot = function () {
        return {
            ngModule: CoreModule_1,
            providers: [
                ApiOriginUri_1.ApiOriginUri,
                { provide: common_1.APP_BASE_HREF, useValue: window.location.pathname },
                { provide: common_1.LocationStrategy, useClass: ExtHashLocationStrategy_1.ExtHashLocationStrategy },
                { provide: router_1.RouteReuseStrategy, useClass: StatelessRouteReuseStrategy_1.StatelessRouteReuseStrategy },
                data_service_1.DataService,
                utility_service_1.UtilityService
            ]
        };
    };
    CoreModule = CoreModule_1 = __decorate([
        core_1.NgModule({
            imports: [],
            declarations: [],
            providers: []
        }),
        __param(0, core_1.Optional()), __param(0, core_1.SkipSelf()),
        __metadata("design:paramtypes", [CoreModule])
    ], CoreModule);
    return CoreModule;
    var CoreModule_1;
}());
exports.CoreModule = CoreModule;


/***/ }),

/***/ 457:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = __webpack_require__(31);
var ExtHashLocationStrategy = (function (_super) {
    __extends(ExtHashLocationStrategy, _super);
    function ExtHashLocationStrategy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExtHashLocationStrategy.prototype.prepareExternalUrl = function (internal) {
        var query = window.location.search || '';
        var url = this.getBaseHref() + (query.length > 0 ? query : '') + '#' + internal + query;
        return url;
    };
    return ExtHashLocationStrategy;
}(common_1.HashLocationStrategy));
exports.ExtHashLocationStrategy = ExtHashLocationStrategy;


/***/ }),

/***/ 458:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = __webpack_require__(29);
/**
 * Class is used to prevent component/module reloading while the route is change.
 */
var StatelessRouteReuseStrategy = (function (_super) {
    __extends(StatelessRouteReuseStrategy, _super);
    function StatelessRouteReuseStrategy() {
        var _this = _super.call(this) || this;
        _this.storedRouteHandles = {};
        return _this;
    }
    /**
     * Determines if this route (and its subtree) should be detached to be reused later
     * @param route
     */
    StatelessRouteReuseStrategy.prototype.shouldDetach = function (route) {
        return true;
    };
    /**
     * Stores the detached route
     * @param route
     * @param handle
     */
    StatelessRouteReuseStrategy.prototype.store = function (route, handle) {
        this.storedRouteHandles[route.routeConfig.path] = handle;
    };
    /**
     * Determines if this route (and its subtree) should be reattached
     * @param route
     */
    StatelessRouteReuseStrategy.prototype.shouldAttach = function (route) {
        return !!route.routeConfig && !!this.storedRouteHandles[route.routeConfig.path];
    };
    /**
     * Retrieves the previously stored route
     * @param route
     */
    StatelessRouteReuseStrategy.prototype.retrieve = function (route) {
        if (!route.routeConfig)
            return null;
        return this.storedRouteHandles[route.routeConfig.path];
    };
    /**
     * Determines if a route should be reused
     * @param future
     * @param curr
     */
    StatelessRouteReuseStrategy.prototype.shouldReuseRoute = function (future, curr) {
        return curr.routeConfig == future.routeConfig;
    };
    return StatelessRouteReuseStrategy;
}(router_1.RouteReuseStrategy));
exports.StatelessRouteReuseStrategy = StatelessRouteReuseStrategy;


/***/ }),

/***/ 459:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(4);
var core_2 = __webpack_require__(80);
var translation_service_1 = __webpack_require__(143);
var ApiTranslationLoader = (function (_super) {
    __extends(ApiTranslationLoader, _super);
    function ApiTranslationLoader(translationService) {
        var _this = _super.call(this) || this;
        _this.translationService = translationService;
        return _this;
    }
    ApiTranslationLoader.prototype.getTranslation = function (lang) {
        return this.translationService.get(lang);
    };
    ApiTranslationLoader = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [translation_service_1.TranslationService])
    ], ApiTranslationLoader);
    return ApiTranslationLoader;
}(core_2.TranslateLoader));
exports.ApiTranslationLoader = ApiTranslationLoader;


/***/ }),

/***/ 460:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(4);
var home_routes_1 = __webpack_require__(461);
var home_component_1 = __webpack_require__(166);
var shared_module_1 = __webpack_require__(107);
var HomeModule = (function () {
    function HomeModule() {
    }
    HomeModule = __decorate([
        core_1.NgModule({
            imports: [home_routes_1.homeRouting, shared_module_1.SharedModule],
            declarations: [home_component_1.HomeComponent]
        })
    ], HomeModule);
    return HomeModule;
}());
exports.HomeModule = HomeModule;


/***/ }),

/***/ 461:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = __webpack_require__(29);
var home_component_1 = __webpack_require__(166);
var routing = [
    { path: 'home', component: home_component_1.HomeComponent }
];
exports.homeRouting = router_1.RouterModule.forChild(routing);


/***/ }),

/***/ 462:
/***/ (function(module, exports) {

module.exports = "<h1>Hello from API Home component</h1>"

/***/ }),

/***/ 463:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 464:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = {
    production: false
};


/***/ })

},[179]);
//# sourceMappingURL=backendApp.js.map