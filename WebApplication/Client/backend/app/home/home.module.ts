import { NgModule } from '@angular/core';

import { homeRouting } from './home.routes';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [ homeRouting, SharedModule ],
    declarations: [ HomeComponent ]
})

export class HomeModule {

}