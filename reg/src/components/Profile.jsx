import styles from './styles/layout.module.css'
import Sidebar from './Sidebar';
import Upbar from './Upbar';

const Profile = () => {
    return (
        <div className={styles.main_page}>
            <Sidebar />
            <div className={styles.Profile_main}>
            <Upbar />    
            </div>
        </div>
    );
};

export default Profile;