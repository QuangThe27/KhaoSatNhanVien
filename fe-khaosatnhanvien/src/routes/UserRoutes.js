// src/routes/UserRoutes.js

// import user
import Home from '../pages/user/Home/Home';
import Login from '../pages/auth/Login';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';
import ExamList from '../pages/user/ExamsList/ExamList';
import ExamDetail from '../pages/user/ExamDetail/ExamDetail';
import ExamResults from '../pages/user/ExamResults/ExamResults';

export const UserRoutes = [
    {
        path: '/',
        page: Home,
        isShowHeader: true,
        isShowFooter: true,
    },
    // Auth
    {
        path: '/login',
        page: Login,
        isShowHeader: false,
        isShowFooter: false,
    },
    {
        path: '/forgot-password',
        page: ForgotPassword,
        isShowHeader: false,
        isShowFooter: false,
    },
    {
        path: '/reset-password',
        page: ResetPassword,
        isShowHeader: false,
        isShowFooter: false,
    },
    // Exam
    {
        path: '/exams-list',
        page: ExamList,
        isShowHeader: true,
        isShowFooter: true,
    },
    // Bài thi (trang làm bài của Exam)
    {
        path: '/exam/:id',
        page: ExamDetail,
        isShowHeader: true,
        isShowFooter: true,
    },
    {
        path: '/exam-results',
        page: ExamResults,
        isShowHeader: true,
        isShowFooter: true,
    },
];
