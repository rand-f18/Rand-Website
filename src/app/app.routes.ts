import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminLayoutComponent } from './pages/admin-layout/admin-layout.component';


export const routes: Routes = [
    {
        //defaul rout
        path:'',
        redirectTo:'login',
        pathMatch:'full'
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'',
        component:LayoutComponent,
        children:[
            {
                path:'dashboard',
                component:DashboardComponent
            },
        ]
    },
    {
        path:'',
        component:AdminLayoutComponent,
        children:[
            {
                path:'admin',
                component:AdminComponent
            },
        ]
    },
];
