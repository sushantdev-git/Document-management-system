import styles from './FolderItem.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder } from '@fortawesome/free-solid-svg-icons'

const FolderItem = (props) => {
    return (
        <div className={styles.FolderItem} onClick={props.onClick}>
            <div className={styles.Title}>
                <FontAwesomeIcon icon={faFolder}/>
                {props.name ? <p>{props.name}</p> : <p>Random</p>}
            </div>
            <div className={styles.Shared}>
                <p>Shared With</p>
                <div className={styles.Count}>
                    10
                </div>
            </div>
        </div>
    )
}

export default FolderItem;