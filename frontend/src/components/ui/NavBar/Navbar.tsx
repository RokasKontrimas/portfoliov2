import { NavLink} from 'react-router-dom';
import useAuthContext from '../../../hooks/useAuthContext.tsx';
import styles from './NavBar.module.scss';

const navigation = [
    {name: 'Home', path: '/', current: true},
    {name: 'QuickStart', path: '/quickstart', current: false},
];


export default function Navbar() {
    const {logout} = useAuthContext();

    return (
        <header>
            <nav className={styles.navWrapper}>
                <div className={styles.navItems}>
                    {navigation.map((item) => (
                        <NavLink className={({isActive}) => `${styles.navItem} ${isActive ? styles.active : ''}`}
                                 to={item.path}
                                 key={item.name}>
                            {item.name}
                        </NavLink>
                    ))}
                    <button type='button' onClick={logout}>
                        Sign out
                    </button>
                </div>
            </nav>
        </header>
    );
}
