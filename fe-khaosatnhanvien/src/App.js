import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes';

import DefaultLayout from './layouts/DefaultLayout/DefaultLayout';
import ManageLayout from './layouts/ManageLayout/ManageLayout';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import 'antd/dist/reset.css';

function App() {
    return (
        <Router>
            <Routes>
                {routes.map((route, index) => {
                    const Page = route.page;
                    const Layout = route.isManageRoute ? ManageLayout : DefaultLayout;

                    // Nếu là route admin thì bọc bằng ProtectedRoute
                    const element = route.isManageRoute ? (
                        <ProtectedRoute requiredRole="admin">
                            <Layout isShowHeader={route.isShowHeader} isShowFooter={route.isShowFooter}>
                                <Page />
                            </Layout>
                        </ProtectedRoute>
                    ) : (
                        <Layout isShowHeader={route.isShowHeader} isShowFooter={route.isShowFooter}>
                            <Page />
                        </Layout>
                    );

                    return <Route key={index} path={route.path} element={element} />;
                })}
            </Routes>
        </Router>
    );
}

export default App;
