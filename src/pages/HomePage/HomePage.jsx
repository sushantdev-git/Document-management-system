import { useEffect, useState, useTransition } from "react";
import DatabaseFolder from "../../components/DatabaseFolder/DatabaseFolder";
import Drawer from "../../components/Drawer/Drawer";
import OneFile from "../../components/OneFile/OneFile";
import OneFolder from "../../components/OneFolder/OneFolder";
import styles from "./HomePage.module.css";
import axios from "../../axiosBase";

import { UserAuth } from "../../context/AuthContext";

const HomePage = () => {
  const { user } = UserAuth();

  const [isFolder, setIsFolder] = useState(true);
  const [viewData, setViewData] = useState({});

  const [profileData, setProfileData] = useState();

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    if (!user) return;
    const token = user.accessToken;
    console.log(token)

    axios
      .post(
        "/user/profile",
        {
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setProfileData(res.data)
      })
      .catch((err) => {
        console.log(err)
      });
  };

  console.log("Home page loaded");

  console.log("viewData", viewData)

  return (
    <>
        <div className={styles.HomePage}>
            <Drawer />
            <DatabaseFolder data={profileData} fetchProfile={getUserData} setViewData={setViewData}/>
            {isFolder ? <OneFolder data={viewData}/> : <OneFile data={viewData}/> }
        </div>
    </>
  );
};

export default HomePage;
