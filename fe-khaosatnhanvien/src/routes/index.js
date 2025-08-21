import Manage from '../pages/manage/index';
import Home from '../pages/user/Home/Home';

export const UserRoutes = [
    {
        path: '/',
        page: Home,
        isShowHeader: true,
        isShowFooter: true,
    },
];

export const ManageRoutes = [
    {
        path: '/admin',
        page: Manage,
        isManageRoute: true,
    },
];

export const routes = [
    ...UserRoutes,
    ...ManageRoutes,
    {
        path: '*',
        // page: NotFoundPage
        isShowHeader: false,
        isShowFooter: false,
    },
];
