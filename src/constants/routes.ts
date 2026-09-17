type Slug =
  | 'home'
  | 'research'
  | 'teaching';

export type Route = {
  path: string,
  name: string,
};

type Routes = Record<Slug, Route>;

export const routes: Routes = {
  home: {
    path: '/',
    name: 'About',
  },
  research: {
    path: '/research',
    name: 'Research',
  },
  teaching: {
    path: '/teaching',
    name: 'Teaching',
  },
};
