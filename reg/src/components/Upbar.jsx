import { useLinks } from './LinksContext';
import styles from './styles/upbar.module.css';
import { Link } from 'react-router-dom';

const Upbar  = () => {
    const {links} = useLinks()
    const {pathname} = window.location


    const visibleLinks = links.find(link => pathname.includes(link.url))

    return (
        <div className={styles.header}>
            <ul>
                {visibleLinks?.sublinks?.map(link => (
                    <Link to={link.url} style={{display: "flex", flex: "1", justifyContent: "center", textDecoration: "none", color: "white"}}>
                        <li>
                            {link.name}
                        </li>
                    </Link>
                    ))}         
                </ul>
        </div>
    )
}

export default Upbar;