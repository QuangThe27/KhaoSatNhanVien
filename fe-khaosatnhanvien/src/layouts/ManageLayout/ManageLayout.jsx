import { Layout, Row, Col, Menu } from 'antd';
import { UserOutlined, SettingOutlined, AppstoreOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import styles from './ManageLayout.module.scss';
import { useNavigate, Link } from 'react-router-dom';

// eslint-disable-next-line no-unused-vars
const cx = classNames.bind(styles);
const { Sider, Content } = Layout;

function ManageLayout({ children }) {
    const navigate = useNavigate();
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Row style={{ flex: 1, width: '100%' }}>
                <Col span={4}>
                    <Sider
                        width="100%"
                        style={{
                            backgroundColor: '#000',
                            color: '#fff',
                            height: '100vh',
                            overflowY: 'auto',
                        }}
                    >
                        <div
                            style={{
                                padding: '16px',
                                fontSize: '18px',
                                fontWeight: 'bold',
                                color: '#fff',
                                cursor: 'pointer',
                            }}
                            onClick={() => navigate('/admin')}
                        >
                            Manage
                        </div>
                        <Menu
                            theme="dark"
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            style={{ backgroundColor: '#000', color: '#fff' }}
                            items={[
                                {
                                    key: '1',
                                    icon: <UserOutlined />,
                                    label: (
                                        <Link to="/admin/users" style={{ color: '#fff' }}>
                                            Quản lý người dùng
                                        </Link>
                                    ),
                                },
                                {
                                    key: '2',
                                    icon: <AppstoreOutlined />,
                                    label: (
                                        <Link to="/admin/phongban" style={{ color: '#fff' }}>
                                            Quản lý phòng ban
                                        </Link>
                                    ),
                                },
                                {
                                    key: '3',
                                    icon: <SettingOutlined />,
                                    label: (
                                        <Link to="/admin/settings" style={{ color: '#fff' }}>
                                            Cài đặt hệ thống
                                        </Link>
                                    ),
                                },
                            ]}
                        />
                    </Sider>
                </Col>

                <Col span={20}>
                    <Content
                        style={{
                            padding: '24px',
                            height: '100vh',
                            overflowY: 'auto',
                            backgroundColor: '#f0f2f5',
                        }}
                    >
                        {children}
                    </Content>
                </Col>
            </Row>
        </Layout>
    );
}

export default ManageLayout;
