webpackJsonp_name__lib([0],{

/***/ 1:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ 530:
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
var shared_module_1 = __webpack_require__(107);
var setting_routes_1 = __webpack_require__(534);
var setting_component_1 = __webpack_require__(532);
var general_setting_component_1 = __webpack_require__(533);
var SettingModule = (function () {
    function SettingModule() {
    }
    SettingModule = __decorate([
        core_1.NgModule({
            imports: [shared_module_1.SharedModule, setting_routes_1.settingRouting],
            declarations: [
                setting_component_1.SettingComponent,
                general_setting_component_1.GeneralSettingComponent
            ]
        })
    ], SettingModule);
    return SettingModule;
}());
exports.SettingModule = SettingModule;


/***/ }),

/***/ 532:
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
// The home page of setting page
var core_1 = __webpack_require__(4);
var SettingComponent = (function () {
    function SettingComponent() {
    }
    SettingComponent = __decorate([
        core_1.Component({
            selector: 'app-child-setting',
            template: __webpack_require__(535)
        }),
        __metadata("design:paramtypes", [])
    ], SettingComponent);
    return SettingComponent;
}());
exports.SettingComponent = SettingComponent;


/***/ }),

/***/ 533:
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
var GeneralSettingComponent = (function () {
    function GeneralSettingComponent() {
    }
    GeneralSettingComponent = __decorate([
        core_1.Component({
            template: __webpack_require__(536),
            styles: [__webpack_require__(537)]
        }),
        __metadata("design:paramtypes", [])
    ], GeneralSettingComponent);
    return GeneralSettingComponent;
}());
exports.GeneralSettingComponent = GeneralSettingComponent;


/***/ }),

/***/ 534:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = __webpack_require__(29);
var setting_component_1 = __webpack_require__(532);
var general_setting_component_1 = __webpack_require__(533);
/**
 * The routes for the setting module (setting page)
 */
var settingRoutes = [
    {
        path: 'setting',
        component: setting_component_1.SettingComponent,
        children: [
            // Active general tab by default
            { path: '', redirectTo: 'general', pathMatch: 'full' },
            { path: 'general', component: general_setting_component_1.GeneralSettingComponent }
        ]
    }
];
exports.settingRouting = router_1.RouterModule.forChild(settingRoutes);


/***/ }),

/***/ 535:
/***/ (function(module, exports) {

module.exports = "<h1>This is homepage of Setting page</h1>\r\n<!-- Nav for setting -->\r\n<div class=\"tab-panel\">\r\n    <a routerLinkActive=\"active\" [routerLink]=\"['general']\">General</a>\r\n</div>\r\n<div class=\"tab-container\">\r\n    <!-- Routing placeholder for Setting module -->\r\n    <router-outlet></router-outlet>\r\n</div>"

/***/ }),

/***/ 536:
/***/ (function(module, exports) {

module.exports = "<h2>General setting content</h2>"

/***/ }),

/***/ 537:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ })

});
//# sourceMappingURL=0.js.map