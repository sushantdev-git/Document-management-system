import styles from './OneFile.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile } from '@fortawesome/free-solid-svg-icons'

const OneFile = () => {
    return (
        <div className={styles.DatabaseFiles}>
            <div className={styles.TitleAndActions}>
                <div className={styles.Title}>
                    <FontAwesomeIcon icon={faFile} style={{fontSize:"30px", marginRight:"20px"}}/>
                    <h1>Secret Files</h1>
                </div>
                <div className={styles.Manage}>
                    <p>Manage</p>
                </div>
            </div>
        
        </div>
    )
}

export default OneFile;