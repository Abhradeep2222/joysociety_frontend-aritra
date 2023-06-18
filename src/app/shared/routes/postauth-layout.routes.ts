import { Routes } from '@angular/router';
import { APP_ROUTES } from './app-routes';

export const POST_AUTH_ROUTES: Routes = [
    {
        path: APP_ROUTES.root,
        loadChildren: () => import('../../pages/post-auth-pages/post-auth-pages.module').then(m => m.PostAuthModule)
    }
];