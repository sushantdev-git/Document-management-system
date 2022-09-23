import styles from './DrawerItem.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const DrawerItem = (props) => {
    return (
        <div className={styles.DrawerItem} onClick={props.onClick}>
            <FontAwesomeIcon icon={props.icon}/>
            <p>{props.name}</p>
        </div>
    )
}

export default DrawerItem;