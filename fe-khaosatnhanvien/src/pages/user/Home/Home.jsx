import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { Button } from 'antd';
import homeImage from '../../../assets/image/home.jpg';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('home')}>
            <div className={cx('image-container')}>
                <img
                    src={homeImage} // bạn có thể thay bằng ảnh của bạn
                    alt="Background"
                    className={cx('background-image')}
                />
                <div className={cx('overlay')}>
                    <Button type="primary" size="large" className={cx('cta-button')}>
                        Tham gia kiểm tra
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Home;
