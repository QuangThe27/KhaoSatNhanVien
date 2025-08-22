// import manage
import Manage from '../pages/manage/index';
import Department from '../pages/manage/Department/Department';
import CreateDepartment from '../pages/manage/Department/CreateDepartment';
import EditDepartment from '../pages/manage/Department/EditDepartment';

// import user
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
