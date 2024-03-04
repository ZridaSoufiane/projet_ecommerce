import { ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { CustomersComponent } from './customers/customers.component';
import { LoginComponent } from './login/login.component';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { AuthenticationService } from './services/authentication.service';
import { inject } from '@angular/core';
import { authenticationGuard } from './guards/authentication.guard';

export const routes: Routes = [
    {path: "login", component: LoginComponent},
    {path: "", component: LoginComponent},
    {path: "admin", component: AdminTemplateComponent, 
    canActivate: [
        authenticationGuard
    ],
    children: [
        {path: "products", component: ProductsComponent},
        {path: "customers", component: CustomersComponent}
    ]},
];