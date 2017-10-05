import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { settingRouting } from './setting.routes';
import { SettingComponent } from './setting.component';
import { GeneralSettingComponent } from './general/general-setting.component';

@NgModule({
    imports: [ SharedModule, settingRouting ],
    declarations: [
        SettingComponent,
        GeneralSettingComponent
    ]
})

export class SettingModule {
    
}