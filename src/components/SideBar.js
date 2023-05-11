// // PACKAGES
import { Layout, Modal } from "antd";
// import Image from 'next/image'
// import Link from 'next/link';
// import React, { useState, useEffect } from 'react'
// import { Button, Collapse } from 'antd';

// // FILES
// import logo from '../../public/langtimelogo.png';
// import logout from '../../public/logout.png';
// import help from '../../public/help.png';

// import getUserLanguages from '../app/getLanguages';

// CONSTANTS
// import { Layout } from 'antd';
// const { Header, Footer, Sider, Panel } = Layout;
const { Header, Footer, Sider, Content, Panel } = Layout;

// PACKAGES
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import Router from "next/router";
import signOut, { logoutUser as logoutFunction } from "../app/user"
// import { useSearchParams } from "react-router-dom";

// FILES
import logo from "../../public/langtimelogo.png";
import logout from "../../public/logout.png";
import help from "../../public/help.png";
import deleteLang from "../pages/api/language/deleteLang";
import getUserLang from "../pages/api/user/getUserLang";

function getItem(label, key, icon, children, type, langID, func) {
  return {
    key,
    icon,
    children,
    label,
    type,
    langID,
    func,
  };
}

function getLanguageOptions(langName, num, langID, handleDeleteLang) {
  const langOptions = [
    getItem("View Language", langName, null, null, null, langID, null),
    // getItem('Phonology', (num * 4) + 1, null, null, null,langID, null),
    // getItem('Orthography', (num * 4) + 2, null, null, null,langID, null),
    // getItem('Language Specific', (num * 4) + 3, null, null, null,langID, null),
    getItem("Language Stats", langName, null, null, null, langID, null),
    getItem("Delete", num * 4 + 4, null, null, null, langID, null),
    getItem("Settings", langName, null, null, null, langID, null),
  ];
  return langOptions;
}

export default function SideBar() {
  const [data, setData] = useState(null);

  // Get all user languages into the sidebar on load
  useEffect(() => {
    let uid = sessionStorage.getItem("uid");
    console.log("SIDEBAR UID", uid)
    const fetchData = async () => {
      let getLangData = await getUserLang({
        uid: uid,
      });
      setData(getLangData);
    };

    fetchData();
  }, []);

  // Route to specific table, given language id and language name
  const handleRoute = (e) => {
    window.open(
      `/langTable?lid=` +
        e.item.props.langID +
        `&lname=` +
        encodeURIComponent(e.key),
      `_self`
    );
  };

  const handleStats = (e) => {
    window.open(
      `/stats?lid=` + e.item.props.langID + `&lname=` + e.key,
      `_self`
    );
  };

  // Route to settings for a specific table, given language id and language name
  const handleSettings = (e) => {
    window.open(
      `/dictSettings?lid=` +
        e.item.props.langID +
        `&lname=` +
        encodeURIComponent(e.key),
      `_self`
    );
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDelete, setCurrentDelete] = useState(null);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    setIsModalOpen(false);
    console.log("DELETE THIS LANGUAGE CONFIRM")
     let deleteLangData = await deleteLang({
      lid: currentDelete,
    });

    if (deleteLangData === "Success") {
      console.log("deleted language called :>> ", deleteLangData);
      let uid = sessionStorage.getItem("uid");
      let getLangData = await getUserLang({
        uid: uid,
      });
      setData(getLangData);
    } else {
      console.log("delete language failed ", deleteLangData);
    }
    setCurrentDelete(null)
    window.open(`/dashboard`, `_self`);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setCurrentDelete(null)
  };

  // Delete a language on the sidebar
  const handleDeleteLang = async (e) => {
    console.log("Delete language: ", e.item.props.langID);
    setIsModalOpen(true);
    setCurrentDelete(e.item.props.langID)

    // handleOk(e)

    // let deleteLangData = await deleteLang({
    //   lid: e.item.props.langID,
    // });

    // if (deleteLangData === "Success") {
    //   console.log("deleted language called :>> ", deleteLangData);
    //   let uid = sessionStorage.getItem("uid");
    //   let getLangData = await getUserLang({
    //     uid: uid,
    //   });
    //   setData(getLangData);
    // } else {
    //   console.log("delete language failed ", deleteLangData);
    // }
    // window.open(`/dashboard`, `_self`);
  };

  if (data) {

    console.log("data.languageNames :>> ", data.languageNames);
    if (data.languageNames === undefined || data.languageIDs === '') {
      return (
        <div>
          <Sider
            theme="light"
            style={{
              minHeight: "100%",
            }}
          >
            <Link class="test" href="/dashboard">
              <Image src={logo} alt="Logo placeholder" width={150} />
            </Link>
            {/* <Link href="/help">
              <Image src={help} alt="Help placeholder" width={200} />
            </Link> */}
            <Link href="/">
              <Image src={logout} alt="Logout placeholder" width={200} onClick={() => {sessionStorage.clear(); logoutFunction}}/>
            </Link>
          </Sider>
        </div>
      );
    } else {
    let langIDS = data.languageIDs.split(",");
    let langNames = data.languageNames;
    console.log("Lang IDs: ", data.languageIDs.split(","));
    console.log("Lang Names: ", data.languageNames);
    console.log("data.languageCovers :>> ", data.languageCovers);

    const items = [getItem("Dashboard", "dash")];
    items[0].onClick = () => {
      window.open(`/dashboard`, `_self`);
    };
    for (let i = 0; i < langIDS.length; i++) {
      const langName = langNames[i];
      const langID = langIDS[i];
      const menuButton = getItem(
        langName,
        i,
        null,
        getLanguageOptions(langName, i, langID, handleDeleteLang),
        null,
        langID,
        null
      );

      for (let sideLabels of Object.values(menuButton.children)) {
        if (sideLabels["label"] === "View Language") {
          sideLabels.onClick = handleRoute;
        }
        if (sideLabels["label"] === "Language Stats") {
          sideLabels.onClick = handleStats;
        }
        if (sideLabels["label"] === "Delete") {
          sideLabels.onClick = handleDeleteLang;
        }

        if (sideLabels["label"] === "Settings") {
          sideLabels.onClick = handleSettings;
        }
      }
      items.push(menuButton);
    }

    return (
      <div>
        <Sider
          theme="light"
          style={{
            minHeight: "100%",
          }}
        >
          <Link class="test" href="/dashboard">
            <Image src={logo} alt="Logo placeholder" width={150} />
          </Link>
          <Menu
            // onClick={onClick}
            style={{
              width: "auto",
            }}
            // defaultSelectedKeys={['1']}
            // defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}
          />
          <Modal title="Confirm Delete" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <p>Confirm delete this language?</p>
          </Modal>
          {/* <Link href="/help">
            <Image src={help} alt="Help placeholder" width={200} />
          </Link> */}
          <Link href="/">
            <Image src={logout} alt="Logout placeholder" width={200} onClick={() => {sessionStorage.clear();
                                                                                      logoutFunction}}/>
          </Link>
        </Sider>
      </div>
    );
  }
}

}
