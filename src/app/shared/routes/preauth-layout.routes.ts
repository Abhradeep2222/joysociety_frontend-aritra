import { Routes } from '@angular/router';
import { APP_ROUTES } from './app-routes';

export const PRE_AUTH_ROUTES: Routes = [
    {
        path: APP_ROUTES.root,
        loadChildren: () => import('../../pages/pre-auth-pages/pre-auth-pages.module').then(m => m.PreAuthModule)
    }
];