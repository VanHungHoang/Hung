"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../../typings/globals/node/index.d.ts" />
/// <reference path="../../typings/globals/core-js/index.d.ts" />
// main entry point
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var app_module_1 = require("./app.module");
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);
