import styles from "./OneFolder.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faHeartPulse } from "@fortawesome/free-solid-svg-icons";
import FileItem from "./FileItem/FileItems";
import Modal from "../modal/Modal";
import { useEffect, useState } from "react";
import customAxios from "../../axiosBase";
import { UserAuth } from "../../context/AuthContext";
import Loading from "../Loading/Loading";
import FileViewer from "./FileViewer/FileViewer";

const OneFolder = ({ data }) => {
  const [showModal, setShowModal] = useState(false);

  const [folderData, setfolderData] = useState({});

  const [selectedFile, setSelectedFile] = useState(null);

  const [callingApi, setCallingApi] = useState(false);

  const [showFileViewer, setShowFileViewer] = useState(false);

  const [showFileData, setShowFileData] = useState({});

  const [uploadModal, setUploadModal] = useState(true);

  const [viewP, setViewP] = useState(false)
  const [deleteP, setDeleteP] = useState(false)
  const [email, setEmail] = useState("");

  const { user } = UserAuth();

  useEffect(() => {
    fetchFiles();
  }, [data._id]);

  const fetchFiles = () => {
    const token = user.accessToken;
    if(!data._id) return;

    customAxios
      .post(
        "folder/fetch",
        {
          folderId: data._id,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setfolderData(res.data);
        console.log(res.data)
      });
  };

  const uploadFile = () => {

    if(!data._id) return;
    setCallingApi(true);

    const token = user.accessToken;

    const formData = new FormData();

    formData.append("file", selectedFile, selectedFile.name);

    formData.append("folderId", data._id);

    customAxios
      .post("file/uploadFile", formData, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data)
        setCallingApi(false);
        setShowModal(false)
        fetchFiles();
      })
      .catch(err => {
        console.log(err)
        setCallingApi(false)
      })
  };


  const shareFolder = () => {
    setCallingApi(true);

    const token = user.accessToken;

    customAxios
      .post("folder/shareFolder", {
        email:email,
        folderId: data._id,
        view: viewP,
        del: deleteP,
      }, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data)
        setCallingApi(false);
        setShowModal(false)
      })
      .catch(err => {
        console.log(err)
        setCallingApi(false)
      })

  }

  return (
    <>
      <div className={styles.DatabaseFiles}>
        <div className={styles.TitleAndActions}>
          <div className={styles.Title} >
            <FontAwesomeIcon
              icon={faFolder}
              style={{ fontSize: "30px", marginRight: "20px" }}
            />
            <h1>{data ? data.folderName : "No Name"}</h1>
          </div>
          <div className={styles.Actions}>
            <div className={styles.Button} onClick={() => {
                setShowModal(true);
                setUploadModal(true);
            }}>
              <p>Upload</p>
            </div>
            <div className={styles.Button} onClick={() => {
                setShowModal(true);
                setUploadModal(false);
            }}>
              <p>Share</p>
            </div>
          </div>
        </div>
        <div className={styles.Files}>
          <h1>Files</h1>
          <div className={styles.FileItems}>
            {folderData.files &&
              folderData.files.map((ele) => {
                return <FileItem data={ele} onClick={() =>{
                    setShowFileViewer(true)
                    setShowFileData(ele);
                }}/>;
              })}
          </div>
        </div>
        <FileViewer visible={showFileViewer} close={() => setShowFileViewer(false)} data={showFileData}/>
      </div>
      {showModal && uploadModal ? (
        <Modal close={() => setShowModal(false)}>
          <div className={styles.FileUpload}>
            <h1>Upload A file</h1>
            <div
              className={styles.Inputs}
            >
              <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
              {callingApi ? <Loading /> :<button onClick={uploadFile}>Save</button>}
            </div>
          </div>
        </Modal>
      ) : null}

      {showModal && !uploadModal ? (
        <Modal close={() => setShowModal(false)}>
          <div className={styles.ShareFolder}>
            <h1>Share Folder with other</h1>
            <div
              className={styles.Inputs}
            >
              <input type="text" placeholder="enter his/her email" onChange={(e) => setEmail(e.target.value)}/>
              <div className={styles.Checkboxes}>
                <input type="checkbox" value={viewP} onChange={() => setViewP(!viewP)}/>
                <label>View Permission</label>
                <input type="checkbox" value={deleteP} onChange={() => setDeleteP(!deleteP)}/>
                <label>Delete Permission</label>
              </div>
              {callingApi ? <Loading /> : <button onClick={shareFolder}>Share</button>}
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export default OneFolder;
