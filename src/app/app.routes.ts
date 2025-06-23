import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SettingsComponent } from './components/settings/settings.component';
import { LoadingComponent } from './components/loading/loading.component';

export const routes: Routes = [
    { path: '', redirectTo: 'settings', pathMatch: 'full' }, // Default route
    { path: 'home', component: HomeComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'loading', component: LoadingComponent },
    { path: '**', redirectTo: 'settings' } //  Wildcard fallback
];


