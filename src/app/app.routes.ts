import { RouterConfig } from '@angular/router';
import { Home } from './home';
import { Teach } from './teach/teach';
import { Learn } from './learn/learn';

import { DataResolver } from './app.resolver';

export const routes: RouterConfig = [
  { path: '',      component: Home },
  { path: 'home',  component: Home },
  { path: 'teach',  component: Teach },
  { path: 'learn',  component: Learn },
];
