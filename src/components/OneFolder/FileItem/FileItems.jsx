import styles from './FileItem.module.css'

const FileItem = ({data, onClick}) => {
    console.log(data)
    return (
        <div className={styles.FileItem} onClick={onClick}>
            <p>{data.filename}</p>
        </div>
    )
}

export default FileItem;