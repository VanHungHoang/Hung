import { Routes, RouterModule } from '@angular/router';

import { SettingComponent } from './setting.component';
import { GeneralSettingComponent } from './general/general-setting.component';

/**
 * The routes for the setting module (setting page)
 */
const settingRoutes: Routes = [
    { 
        path: 'setting', 
        component: SettingComponent,
        children: [
            // Active general tab by default
            { path: '', redirectTo: 'general', pathMatch: 'full' },
            { path: 'general', component: GeneralSettingComponent }
        ]
    }
];

export const settingRouting = RouterModule.forChild(settingRoutes);