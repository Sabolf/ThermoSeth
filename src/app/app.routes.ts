import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { MapComponent } from './views/map/map.component';
import { SettingsComponent } from './views/settings/settings.component';
import { DetailsComponent } from './views/details/details.component';
import { NgModule } from '@angular/core';


export const routes: Routes = [

    { path: 'dash', component: DashboardComponent},
    { path: 'map', component: MapComponent},
    { path: 'settings', component: SettingsComponent},
    { path: 'details/:id', component: DetailsComponent},


];

