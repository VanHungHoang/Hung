import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { AppComponent } from './app.component';
import { NavComponent } from './nav.component';
import { appRouting } from './app.routes';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ApiTranslationLoader } from './shared/services/api-translation-loader.service';
import { HomeModule } from './home/home.module';


@NgModule({
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        appRouting,
        HttpModule,
        FormsModule,
        CoreModule.forRoot(),
        SharedModule.forRoot(),
        HomeModule,
        TranslateModule.forRoot({loader: { provide: TranslateLoader, useClass: ApiTranslationLoader }})
    ],
    declarations: [
        AppComponent,
        NavComponent
    ],
    providers: [],
    // Bootstrap simutanously both AppComponent and NavComponent
    bootstrap: [ AppComponent, NavComponent ]
})

export class AppModule { }