import React, { useEffect, useState } from 'react';
import styles from './Notification.module.scss';

function Notification({ type = 'info', message = '', description = '', duration = 3500 }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(false), duration);
        return () => clearTimeout(timer);
    }, [duration]);

    if (!visible) return null;

    return (
        <div className={`${styles.notification} ${styles[type]}`}>
            <strong>{message}</strong>
            <p>{description}</p>
        </div>
    );
}

export default Notification;
