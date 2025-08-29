import classNames from 'classnames/bind';
import { Layout, Row, Col, Typography, Space } from 'antd';
import { MailOutlined, PhoneOutlined, FacebookFilled, LinkedinFilled, CopyrightOutlined } from '@ant-design/icons';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);
const { Text, Link } = Typography;
const { Footer: AntFooter } = Layout;

function Footer() {
    return (
        <AntFooter className={cx('footer')}>
            <Row gutter={[16, 16]}>
                {/* Cột 1: Giới thiệu công ty */}
                <Col xs={24} sm={12} md={8}>
                    <Space direction="vertical" size="small">
                        <Text strong className={cx('title')}>
                            Công ty cổ phần FINT
                        </Text>
                        <Text className={cx('description')}>
                            FINT cung cấp các giải pháp công nghệ tài chính tiên tiến, giúp doanh nghiệp và cá nhân quản
                            lý tài chính hiệu quả.
                        </Text>
                        <Text className={cx('copyright-text')}>Thiết kế và phát triển bởi Nguyễn Thế Quang.</Text>
                    </Space>
                </Col>

                {/* Cột 2: Liên kết nhanh */}
                <Col xs={24} sm={12} md={8}>
                    <Space direction="vertical" size="small" className={cx('links-section')}>
                        <Text strong className={cx('title')}>
                            Liên kết nhanh
                        </Text>
                        <Link href="#">Về chúng tôi</Link>
                        <Link href="#">Dịch vụ</Link>
                        <Link href="#">Tin tức</Link>
                        <Link href="#">Hỗ trợ</Link>
                    </Space>
                </Col>

                {/* Cột 3: Thông tin liên hệ và mạng xã hội */}
                <Col xs={24} sm={24} md={8}>
                    <Space direction="vertical" size="small">
                        <Text strong className={cx('title')}>
                            Liên hệ
                        </Text>
                        <Space className={cx('contact-item')}>
                            <MailOutlined />
                            <Link href="mailto:info@fint.vn">info@fint.vn</Link>
                        </Space>
                        <Space className={cx('contact-item')}>
                            <PhoneOutlined />
                            <Link href="tel:+84123456789">+84 123 456 789</Link>
                        </Space>

                        <Space size="middle" className={cx('social-icons')}>
                            <Link href="https://www.facebook.com" target="_blank">
                                <FacebookFilled className={cx('icon')} />
                            </Link>
                            <Link href="https://www.linkedin.com" target="_blank">
                                <LinkedinFilled className={cx('icon')} />
                            </Link>
                        </Space>
                    </Space>
                </Col>
            </Row>

            {/* Dòng Copyright */}
            <div className={cx('copyright')}>
                <CopyrightOutlined />
                <Text>2024 Công ty cổ phần FINT. Tất cả quyền được bảo lưu.</Text>
            </div>
        </AntFooter>
    );
}

export default Footer;
