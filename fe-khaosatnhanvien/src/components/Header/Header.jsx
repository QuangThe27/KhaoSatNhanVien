import { Button, Layout, Menu, Dropdown, Avatar, Space } from 'antd';
import { UserOutlined, SettingOutlined, LogoutOutlined, FileTextOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);
const { Header: AntHeader } = Layout;

function Header() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    };

    const userMenu = (
        <Menu
            items={[
                {
                    key: 'exam',
                    icon: <FileTextOutlined />,
                    label: 'Bài thi',
                },
                {
                    key: 'settings',
                    icon: <SettingOutlined />,
                    label: 'Cài đặt',
                },
                {
                    key: 'logout',
                    icon: <LogoutOutlined />,
                    label: 'Đăng xuất',
                    onClick: handleLogout,
                },
            ]}
        />
    );

    return (
        <AntHeader
            className={cx('container')}
            style={{
                height: 80,
                backgroundColor: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 24px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
        >
            {/* Logo bên trái */}
            <div
                style={{ fontSize: 24, fontWeight: 'bold', color: '#1890ff', cursor: 'pointer' }}
                onClick={() => navigate('/')}
            >
                FintLogo
            </div>

            {/* Giao diện bên phải */}
            <div>
                {user ? (
                    <Dropdown overlay={userMenu} placement="bottomRight" arrow>
                        <Space style={{ cursor: 'pointer' }}>
                            <Avatar icon={<UserOutlined />} />
                            <span style={{ fontWeight: 500 }}>{user?.fullName}</span>
                        </Space>
                    </Dropdown>
                ) : (
                    <Space>
                        <Button type="default" onClick={() => navigate('/login')}>
                            Đăng nhập
                        </Button>
                    </Space>
                )}
            </div>
        </AntHeader>
    );
}

export default Header;
