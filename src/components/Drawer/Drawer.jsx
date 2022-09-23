import styles from './Drawer.module.css'
import DrawerItem from './DrawerItem/DrawerItem';

import { faHome, faSignOut } from '@fortawesome/free-solid-svg-icons'
import { UserAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Drawer = () => {
    const {user, logOut} = UserAuth();
    const navigate = useNavigate();
    return (
        <div className={styles.Drawer}>
            <div className={styles.Title}>
                <h1>HexClan</h1>
            </div>
            <div className={styles.DrawerItems}>
                <DrawerItem name="Home" icon={faHome}/>
                <DrawerItem name="Logout" icon={faSignOut} onClick={() => {
                    logOut();
                    navigate('/');
                }}/>
            </div>
            <div className={styles.Account}>
                <div className={styles.UserImage}></div>
                <div className={styles.UserAddress}>
                    <p>{user.displayName}</p>
                    <p>{user.email}</p>
                </div>
            </div>
        </div>
    )
}

export default Drawer;