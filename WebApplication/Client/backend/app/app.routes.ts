import { RouterModule, Routes, PreloadAllModules } from '@angular/router';


// Core app router
const routes: Routes = [
    // Redirect to Home's routing module
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    // Lazy async route modules
    { path: 'setting', loadChildren: './setting/setting.module#SettingModule' }
];

export const appRouting = RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules });