import { lazy, FC } from 'react';
import { Route, RouteProps, Switch } from 'react-router-dom';

export enum routesEnum {
  home = '/',
  // minting = '/minting',
  auction = '/auction',
  game = '/game',
}

const routes: RouteProps[] = [
  {
    path: routesEnum.home,
    exact: true,
    component: lazy(() => import('./LandingPage')),
  },
  // {
  //   path: routesEnum.minting,
  //   exact: true,
  //   component: lazy(() => import('./Minting')),
  // },
  {
    path: routesEnum.game,
    //exact: true,
    component: lazy(() => import('./Home')),
  },
];

export const Routes: FC = () => {
  return (
    <Switch>
      {routes.map((route) => (
        <Route path={route.path} key={route.path as string} exact={route.exact} component={route.component} />
      ))}
    </Switch>
  );
};
