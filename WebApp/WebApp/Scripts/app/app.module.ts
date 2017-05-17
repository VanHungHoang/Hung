import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import "rxjs/Rx";

import { AppComponent } from './app.component';

@NgModule({
    // modules
    imports: [BrowserModule, FormsModule, HttpModule],

    // directives, components, and pipes
    declarations: [AppComponent],

    // providers
    providers: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}