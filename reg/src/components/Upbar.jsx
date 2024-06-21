import { useLinks } from './LinksContext';
import styles from './styles/upbar.module.css';
import { Link } from 'react-router-dom';

const Upbar  = () => {
    const {links, currentLink} = useLinks()

    const visibleLinks = links.find(link => link.url === currentLink)

    console.log(links, currentLink, visibleLinks)
    return (
        <div className={styles.header}>
            <ul>
                {visibleLinks?.sublinks?.map(link => (
                         <li>
                            <Link to={link.url} style={{textDecoration: "none", color: "white", display: "flex", gap: "1em"}}>
                               {link.icon}
                               {link.name}
                            </Link>
                        </li>
                    ))}         
                </ul>

        </div>
    )
}

export default Upbar;