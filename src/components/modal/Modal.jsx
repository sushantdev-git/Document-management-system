import styles from './Modal.module.css'

const Modal = (props) => {
    return (
        <div className={styles.Modal}>
            <div style={{zIndex:"2000"}}>
                {props.children}
            </div>
            <div className={styles.Backdrop} onClick={props.close}>
                
            </div>
        </div>
    )
}

export default Modal;