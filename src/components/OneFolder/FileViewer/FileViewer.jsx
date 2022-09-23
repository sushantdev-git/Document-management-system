import { faFile, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import customAxios from "../../../axiosBase";
import { UserAuth } from "../../../context/AuthContext";
import styles from "./FileViewer.module.css";

const FileViewer = ({ data, visible, close }) => {
  const { user } = UserAuth();
  console.log(data);

  const downloadData = () => {
    const token = user.accessToken;

    console.log(data)

    customAxios
      .post(
        "file/fetchFile",
        {
          fileId: data.fileId,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        const blob = new Blob([res.data], { encoding: 'UTF-8' })
        const href = URL.createObjectURL(blob);

        // create "a" HTLM element with href to file & click
        const link = document.createElement('a');
        link.href = href;
        link.setAttribute('download', data.filename); //or any other extension
        document.body.appendChild(link);
        link.click();

        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        // URL.revokeObjectURL(url);
      });
  };

  return (
    <div
      className={[styles.FileViewer, visible ? styles.Visible : null].join(" ")}
    >
      <div className={styles.TitleAndActions}>
        <div className={styles.Title}>
          <FontAwesomeIcon
            icon={faClose}
            style={{ fontSize: "30px", marginRight: "40px", cursor: "pointer" }}
            onClick={close}
          />
          <FontAwesomeIcon
            icon={faFile}
            style={{ fontSize: "30px", marginRight: "20px" }}
          />
          <h1>{data.filename}</h1>
        </div>
        <div className={styles.Manage}>
          <p>Manage</p>
        </div>
      </div>
      <div className={styles.ActionButtons}>
        <div className={styles.Manage} onClick={downloadData}>
          <p>Download</p>
        </div>

        {data.delete ? (
          <div className={styles.Manage}>
            <p>Delete</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default FileViewer;
