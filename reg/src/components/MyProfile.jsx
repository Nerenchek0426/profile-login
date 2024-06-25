import Upbar from './Upbar'
import Sidebar from './Sidebar'
import styles from './styles/layout.module.css'
import style from './styles/downbar.module.css'
import img from './styles/images/Photo.png'
import UserContext from './UserContext'
import React, { useContext } from 'react';


const MyProfile = () => {
    const {user} = useContext(UserContext);

    return (
        <div className={styles.main_page}>
            <Sidebar />
            
            <div className={styles.Profile_main}>
                <Upbar />    
                <div className={style.downbar}>
                    <div className={style.main_form}>
                        <img src={img} alt="User Icon" />
                        <div className={style.info}>
                            {user ? (
                                <p> {user.Username} {user.Usersurname}!</p>
                            ) : (
                                <p>Загрузка информации пользователя...</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyProfile