// What is core module: https://angular.io/guide/ngmodule#the-core-module
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

import { TranslationService } from './services/translation.service';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        TranslateModule,
        ReactiveFormsModule,
        RouterModule
    ],
    exports: [
        CommonModule,
        HttpModule,
        FormsModule,
        TranslateModule,
        ReactiveFormsModule,
        RouterModule
    ],
    declarations:[],
    providers: []
})

export class SharedModule {
    /**
     * forRoot
     * Referent: https://angular.io/guide/ngmodule#configure-core-services-with-coremoduleforroot
     */
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [ TranslationService ]
        };
    }
}