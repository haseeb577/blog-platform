import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard'; 

export const routes: Routes = [
  {
    path: 'posts',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/posts/posts.module').then((m) => m.PostsModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    redirectTo: 'posts',
    pathMatch: 'full',
  },
];
