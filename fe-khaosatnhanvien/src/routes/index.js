// import manage
import Manage from '../pages/manage/index';
import Department from '../pages/manage/Department/Department';
import CreateDepartment from '../pages/manage/Department/CreateDepartment';
import EditDepartment from '../pages/manage/Department/EditDepartment';
import User from '../pages/manage/Users/User';
import CreateUser from '../pages/manage/Users/CreateUser';
import EditUser from '../pages/manage/Users/EditUser';
import Exam from '../pages/manage/Exam/Exam';
import CreateExam from '../pages/manage/Exam/CreateExam';
import EditExam from '../pages/manage/Exam/EditExam';
import Question from '../pages/manage/Question/Question';
import CreateQuestion from '../pages/manage/Question/CreateQuestion';
import EditQuestion from '../pages/manage/Question/EditQuestion';

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
    // Trang admin
    {
        path: '/admin',
        page: Manage,
        isManageRoute: true,
    },
    // Phòng ban
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
    // Người dùng
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
    // Bài kiểm tra
    {
        path: '/admin/baikiemtra',
        page: Exam,
        isManageRoute: true,
    },
    {
        path: '/admin/baikiemtra/add',
        page: CreateExam,
        isManageRoute: true,
    },
    {
        path: '/admin/baikiemtra/edit/:id',
        page: EditExam,
        isManageRoute: true,
    },
    // Câu hỏi
    {
        path: '/admin/cauhoi',
        page: Question,
        isManageRoute: true,
    },
    {
        path: '/admin/cauhoi/add',
        page: CreateQuestion,
        isManageRoute: true,
    },
    {
        path: '/admin/cauhoi/edit/:id',
        page: EditQuestion,
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
