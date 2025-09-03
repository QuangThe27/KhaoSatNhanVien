// src/routes/index.js (or wherever your main route file is located)

// import separated route files
import { UserRoutes } from './UserRoutes';
import { ManageRoutes } from './ManageRoutes';

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
