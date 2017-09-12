import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthorComponent } from "app/components/author/author.component";
import { ApiService } from "app/services/api.service";

const appRoutes: Routes = [
  { path: 'app-author', component: AuthorComponent },
  { path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  { path: '**', component: AppComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    AuthorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
