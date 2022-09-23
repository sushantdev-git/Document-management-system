import styles from "./DatabaseFolder.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faAdd, faUsersRectangle } from "@fortawesome/free-solid-svg-icons";
import FolderItem from "./FolderItem/FolderItem";
import { useState } from "react";
import Modal from "../modal/Modal";
import customAxios from "../../axiosBase";
import Loading from "../Loading/Loading";
import { UserAuth } from "../../context/AuthContext";

const DatabaseFolder = ({data, fetchProfile, setViewData}) => {
  const [showMyFolder, setShowMyFolder] = useState(false);
  const [showSharedFolder, setShowSharedFolder] = useState(false);
  const [showSharedFiles, setShowSharedFiles] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [callingApi, setCallApi] = useState(false);
  const [folderName, setFolderName] = useState("");

  const { user } = UserAuth();

  const setShowSomething = (indexShow) => {
    setShowMyFolder(false);
    setShowSharedFolder(false);
    setShowSharedFiles(false);
    if (indexShow == 0) setShowMyFolder(true);
    if (indexShow == 1) setShowSharedFolder(true);
    if (indexShow == 2) setShowSharedFiles(true);
  };

  const createNewFolder = () => {

    setCallApi(true);

    const token = user.accessToken;

    customAxios
      .post(
        "/folder/create",
        {
          folderName: folderName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res)
        setCallApi(false);
        setShowModal(false);
        fetchProfile();
      })
      .catch((err) => {
        console.log(err)
        setCallApi(false);
      });
  };

  console.log(data)


  return (
    <div className={styles.DatabaseFolder}>
      <div className={styles.TitleAndActions}>
        <h1>Docs</h1>
        <div className={styles.Actions}>
          <FontAwesomeIcon
            icon={faAdd}
            className={styles.ActionIcons}
            onClick={() => setShowModal(true)}
          />
        </div>
      </div>
      <div
        className={[
          styles.FolderTitle,
          showMyFolder ? styles.Selected : null,
        ].join(" ")}
        onClick={() => setShowSomething(0)}
      >
        <p>My Folders</p>
      </div>
      {showMyFolder && data? (
        <div className={styles.Folders}>
          {data.myFolders && data.myFolders.map((ele) => {
            return <FolderItem name={ele.folderName} onClick={() => setViewData(ele)}/>
          })}
        </div>
      ) : null}
      <div
        className={[
          styles.FolderTitle,
          showSharedFolder ? styles.Selected : null,
        ].join(" ")}
        onClick={() => setShowSomething(1)}
      >
        <p>Shared Folders</p>
      </div>
      {showSharedFolder && data ? (
        <div className={styles.Folders}>
            {data.sharedFolders && data.sharedFolders.map((ele) => {
                return <FolderItem name={ele.folderName} onClick={() => setViewData(ele)}/>
          })}
        </div>
      ) : null}
      <div
        className={[
          styles.FolderTitle,
          showSharedFiles ? styles.Selected : null,
        ].join(" ")}
        onClick={() => setShowSomething(2)}
      >
        <p>Shared Files</p>
      </div>
      {showSharedFiles && data ? (
        <div className={styles.Folders}>
            {data.sharedFiles && data.sharedFiles.map((ele) => {
                return <FolderItem name={ele.folderName} onClick={() => setViewData(ele)}/>
          })}
        </div>
      ) : null}

      {showModal ? (
        <Modal close={() => !callingApi ? setShowModal(false) : null}>
          <div className={styles.AddFolder}>
            <h1>Create New Folder</h1>
            <div className={styles.Inputs}>
              <input onChange={(e) => setFolderName(e.target.value)}/>
              {callingApi ? <Loading /> : <button onClick={createNewFolder}>Save</button>}
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

export default DatabaseFolder;
