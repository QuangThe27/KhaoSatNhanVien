import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { Button } from 'antd';
import homeImage from '../../../assets/image/home.jpg';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Home() {
    const navigate = useNavigate();

    return (
        <div className={cx('home')}>
            <div className={cx('image-container')}>
                <img
                    src={homeImage} // bạn có thể thay bằng ảnh của bạn
                    alt="Background"
                    className={cx('background-image')}
                />
                <div className={cx('overlay')}>
                    <Button
                        type="primary"
                        size="large"
                        className={cx('cta-button')}
                        onClick={() => navigate('/exams-list')}
                    >
                        Tham gia kiểm tra
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Home;
