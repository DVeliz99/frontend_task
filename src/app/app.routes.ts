import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SettingsComponent } from './components/settings/settings.component';
import { LoadingComponent } from './components/loading/loading.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' }, // Ruta por defecto
    { path: 'home', component: HomeComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'loading', component: LoadingComponent },
    { path: '**', redirectTo: 'home' } // Ruta comodín para redireccionar
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
