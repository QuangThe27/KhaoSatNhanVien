// import manage
import Manage from '../pages/manage/index';
import Department from '../pages/manage/Department/Department';
import CreateDepartment from '../pages/manage/Department/CreateDepartment';
import EditDepartment from '../pages/manage/Department/EditDepartment';
import User from '../pages/manage/Users/User';
import CreateUser from '../pages/manage/Users/CreateUser';
import EditUser from '../pages/manage/Users/EditUser';

// import user
import Home from '../pages/user/Home/Home';
import Login from '../pages/auth/Login';

export const UserRoutes = [
    {
        path: '/',
        page: Home,
        isShowHeader: true,
        isShowFooter: true,
    },
    {
        path: '/login',
        page: Login,
        isShowHeader: false,
        isShowFooter: false,
    },
];

export const ManageRoutes = [
    {
        path: '/admin',
        page: Manage,
        isManageRoute: true,
    },
    {
        path: '/admin/phongban',
        page: Department,
        isManageRoute: true,
    },
    {
        path: '/admin/phongban/add',
        page: CreateDepartment,
        isManageRoute: true,
    },
    {
        path: '/admin/phongban/edit/:id',
        page: EditDepartment,
        isManageRoute: true,
    },
    {
        path: '/admin/users',
        page: User,
        isManageRoute: true,
    },
    {
        path: '/admin/users/add',
        page: CreateUser,
        isManageRoute: true,
    },
    {
        path: '/admin/users/edit/:id',
        page: EditUser,
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
