// // PACKAGES
import { Layout } from "antd";
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
<<<<<<< HEAD
import Image from 'next/image'
import Link from 'next/link';
import React, { useState, useEffect } from 'react'
import { Menu } from 'antd';
import { getAuth } from "firebase/auth";
import Router from 'next/router';
=======
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import Router from "next/router";
>>>>>>> cdc4def15418760d9457d4a75eed4aff3ee0ecca
// import { useSearchParams } from "react-router-dom";

// FILES
import logo from "../../public/langtimelogo.png";
import logout from "../../public/logout.png";
import help from "../../public/help.png";
import deleteLang from "../pages/api/language/deleteLang";
import getUserLang from "../pages/api/getUserLang";

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

<<<<<<< HEAD

export default function SideBar() {
  const [data, setData] = useState(null);

  // Get userid dynamically
  // const auth = getAuth();
  // const user = auth.currentUser;
  // const uid = user.uid;

  // Get all user languages into the sidebar on load
  // HARD CODED USERID: {'uid' : "OUnW07Np3VNFduMOCX1V1bvvsd22"}
  useEffect(() => {
    const fetchData = async () => {
        let getLangData = await getUserLang({'uid' : "OUnW07Np3VNFduMOCX1V1bvvsd22"});
        setData(getLangData)
=======
export default function SideBar() {
  const [data, setData] = useState(null);

  // Get all user languages into the sidebar on load
  useEffect(() => {
    const fetchData = async () => {
      let getLangData = await getUserLang({
        uid: "OUnW07Np3VNFduMOCX1V1bvvsd22",
      });
      setData(getLangData);
>>>>>>> cdc4def15418760d9457d4a75eed4aff3ee0ecca
    };

    fetchData();
  }, []);

  // Route to specific table, given language id and language name
  const handleRoute = (e) => {
<<<<<<< HEAD
      window.open(`/langTable?lid=`+ e.item.props.langID + `&lname=` + e.key, `_self`);
=======
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
>>>>>>> cdc4def15418760d9457d4a75eed4aff3ee0ecca
  };

  // Delete a language on the sidebar
  const handleDeleteLang = async (e) => {
<<<<<<< HEAD
    console.log("Delete language: ", e.item.props.langID)

    let deleteLangData = await deleteLang({
      "lid": e.item.props.langID
      })

      if (deleteLangData === "Success") {
        console.log('deleted language called :>> ', deleteLangData);
        let getLangData = await getUserLang({'uid' : "OUnW07Np3VNFduMOCX1V1bvvsd22"});
        setData(getLangData)
      } else {
        console.log("delete language failed ", deleteLangData)
      }
=======
    console.log("Delete language: ", e.item.props.langID);

    let deleteLangData = await deleteLang({
      lid: e.item.props.langID,
    });
>>>>>>> cdc4def15418760d9457d4a75eed4aff3ee0ecca

    if (deleteLangData === "Success") {
      console.log("deleted language called :>> ", deleteLangData);
      let getLangData = await getUserLang({
        uid: "OUnW07Np3VNFduMOCX1V1bvvsd22",
      });
      setData(getLangData);
    } else {
      console.log("delete language failed ", deleteLangData);
    }
    window.open(`/dashboard`, `_self`);
  };

  if (data) {
<<<<<<< HEAD
      let langIDS = data.languageIDs.split(',');
      let langNames = data.languageNames.split(',');
      console.log("Lang IDs: ", data.languageIDs.split(','));
      console.log("Lang Names: ", data.languageNames.split(','));

      const items = [getItem('Dashboard', 'dash')];
      items[0].onClick = () => { window.open(`/dashboard`, `_self`); }
      for (let i = 0; i < langIDS.length; i++) {
        const langName = langNames[i];
        const langID = langIDS[i]
        const menuButton = getItem(langName, i, null, getLanguageOptions(langName, i, langID, handleDeleteLang), null, langID, null);
        for (let sideLabels of Object.values(menuButton.children)) {
          if (sideLabels["label"] === "View Language") {
            sideLabels.onClick = handleRoute
          }
=======

>>>>>>> cdc4def15418760d9457d4a75eed4aff3ee0ecca

    console.log("data.languageNames :>> ", data.languageNames);
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
<<<<<<< HEAD
        items.push(menuButton);
=======
>>>>>>> cdc4def15418760d9457d4a75eed4aff3ee0ecca
      }
      items.push(menuButton);
    }

<<<<<<< HEAD
      return (
        <div>
          <Sider theme='light' style={{
                  minHeight: '100%',
                }}>
            <Link class="test" href="/dashboard">
              <Image src={ logo } alt='Logo placeholder' width={150}/>
            </Link>
            <Menu
=======
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
>>>>>>> cdc4def15418760d9457d4a75eed4aff3ee0ecca
            // onClick={onClick}
            style={{
              width: "auto",
            }}
            // defaultSelectedKeys={['1']}
            // defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}
<<<<<<< HEAD
            />
            <Link href="/help" >
              <Image src={ help } alt='Help placeholder' width={200}/>
            </Link>
            <Link href="/">
              <Image src={ logout } alt='Logout placeholder' width={200}/>
            </Link>
          </Sider>
        </div>
      );
=======
          />
          <Link href="/help">
            <Image src={help} alt="Help placeholder" width={200} />
          </Link>
          <Link href="/logout">
            <Image src={logout} alt="Logout placeholder" width={200} />
          </Link>
        </Sider>
      </div>
    );
>>>>>>> cdc4def15418760d9457d4a75eed4aff3ee0ecca
  } else {
    return null;
  }
}
