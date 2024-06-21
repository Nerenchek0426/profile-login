import React, { useContext } from 'react';
import UserContext from './UserContext';
import styles from './styles/profile.module.css'
import Sidebar from './Sidebar';
import Upbar from './Upbar';

const Profile = () => {
    const { user } = useContext(UserContext);

    return (
        <div className={styles['main-page']}>
            <Sidebar />
            <div className={styles["Profile_main"]}>
            <Upbar />    
            </div>
        </div>
    );
};

export default Profile;