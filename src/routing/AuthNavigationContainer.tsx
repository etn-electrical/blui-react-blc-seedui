import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useInjectedUIContext } from '../index';
import { SelfRegistration } from '../components/pages/self-invite-registration/SelfRegistration';
import { Registration } from '../components/pages/admin-invite-registration/Registration';
import { SelfInvite } from '../components/pages/self-invite/SelfInvite';
import { Login } from '../components/pages/login/Login';

export type RouteConfig = {
    LOGIN?: string;
    INVITE_REGISTER?: string;
    SELF_INVITE?: string;
    SELF_REGISTRATION?: string;
};
export type NavigationContainerComponentProps = {
    routeConfig?: RouteConfig;
    extraRoutes?: JSX.Element[];
    children?: any
};

const defaultRoutes: Required<RouteConfig> = {
    LOGIN: '/login',
    INVITE_REGISTER: '/inviteregistration',
    SELF_INVITE: '/selfinvite',
    SELF_REGISTRATION: '/selfregistration',
};

const prefixRoutes = (routes: RouteConfig): { routes: Required<RouteConfig>; routesArray: string[] } => {
    const newRoutes = defaultRoutes;
    const newRoutesArray: string[] = [];
    Object.keys(routes).forEach((route) => {
        const customPath = routes[route as keyof RouteConfig];
        const routeWithPrefix = `${customPath.startsWith('/') ? '' : '/'}${customPath}`;
        newRoutes[route as keyof RouteConfig] = routeWithPrefix;
    });
    Object.keys(newRoutes).forEach((route) => {
        newRoutesArray.push(newRoutes[route as keyof RouteConfig]);
    });
    return { routes: newRoutes, routesArray: newRoutesArray };
};


export const AuthNavigationContainer: React.FC<
    React.PropsWithChildren<React.PropsWithChildren<NavigationContainerComponentProps>>
> = (props) => {
    const injectedContext = useInjectedUIContext();
    const { routeConfig, children } = props;
   
    const {
        showInviteRegistration = true,
        showSelfRegistration = true,
    } = injectedContext;

    const { routes } = prefixRoutes({ ...defaultRoutes, ...routeConfig });

    const RedirectToLogin = <Navigate to={routes.LOGIN} replace />;

    return (
        <BrowserRouter>
            <Routes>
                <>
                    <Route
                        path={routes.LOGIN}
                        element={<Login />}
                    />

                    <Route
                        path={routes.INVITE_REGISTER}
                        element={<>{showInviteRegistration ? <Registration /> : RedirectToLogin}</>}
                    />
                    <Route
                        path={routes.SELF_INVITE}
                        element={<>{showSelfRegistration ? <SelfInvite /> : RedirectToLogin}</>}
                    />

                    <Route
                        path={routes.SELF_REGISTRATION}
                        element={<>{showSelfRegistration ? <SelfRegistration /> : RedirectToLogin}</>}
                    />
                </>
               
                <Route path={'*'} element={<>{children}</>} />

            </Routes>

        </BrowserRouter>
    );
};
