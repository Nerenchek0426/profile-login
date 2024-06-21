import React, { useContext } from 'react';
import UserContext from './UserContext';
import styles from './styles/sidebar_dark.module.css';
import logo from "./styles/images/logotip.png";
import icon from "./styles/images/icon.png";
import { User, GraduationCap, LogOut, Moon, ScrollText, TableProperties, FileX } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useLinks } from './LinksContext';

const Sidebar = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const {links, setCurrentLink} = useLinks()

   

    return (
        <div className={styles.Sidebar}>
            <div className={styles.Sidebar_header}>
                <img src={logo} alt="Logo" />
            </div>
            <div className={styles.Sidebar_info}>
                <div className={styles.Sidebar_info_icon}>
                    <img src={icon} alt="User Icon" />
                </div>
                <div className={styles.Sidebar_info_nickname}>
                    {user ? (
                        <p>{user.Username} {user.Usersurname}!</p>
                    ) : (
                        <p>Загрузка информации пользователя...</p>
                    )}
                </div>
            </div>
            
            <div className={styles.Sidebar_nav}>
                <div className={styles.Nav_list}>
                    <ul>
                        {links.map(link => (
                             <li>
                                <Link to={link.url} onClick={() => setCurrentLink(link.url)}  style={{textDecoration: "none", color: "white", display: "flex", gap: "1em"}}>
                                   {link.icon}
                                   {link.name}
                                </Link>
                            </li>
                        ))}         
                    </ul>
                </div>
            </div>

            <div className={styles.Sidebar_footer}>
                <div className={styles.Nav_list}>
                    <ul>
                        <li style={{display: "flex", alignItems: "center", gap: "1em"}}><Moon color="white" size={28} />darkmode <button className='SwitchMode'></button></li>
                        <li style={{display: "flex", alignItems: "center", gap: "1em"}}onClick={() => navigate('/Login')}><LogOut color="white" size={28} />log out</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
