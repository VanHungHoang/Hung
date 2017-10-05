// What is core module: https://angular.io/guide/ngmodule#the-core-module
import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { APP_BASE_HREF, LocationStrategy } from '@angular/common';
import { RouteReuseStrategy } from '@angular/router';

import { ExtHashLocationStrategy } from './strategies/ExtHashLocationStrategy';
import { StatelessRouteReuseStrategy } from './strategies/StatelessRouteReuseStrategy';
import { ApiOriginUri } from './services/ApiOriginUri';
import { DataService } from './services/data.service';
import { UtilityService } from './services/utility.service';

@NgModule({
    imports: [],
    declarations:[],
    providers: []
})

export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) { 
        // Prevent reimport of the CoreModule
        if(parentModule) {
            throw new Error('CoreModule is already imported. Import it in the AppModule only');
        }
    }

    /**
     * forRoot
     * Referent: https://angular.io/guide/ngmodule#configure-core-services-with-coremoduleforroot
     */
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                ApiOriginUri,
                { provide: APP_BASE_HREF, useValue: window.location.pathname },
                { provide: LocationStrategy, useClass: ExtHashLocationStrategy },
                { provide: RouteReuseStrategy, useClass: StatelessRouteReuseStrategy },
                DataService,
                UtilityService
            ]
        };
    }
}