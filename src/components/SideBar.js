// // PACKAGES
import { Layout } from 'antd';
// import { signOut } from "firebase/auth";
import { logoutUser } from "src/app/user"
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
import Image from 'next/image'
import Link from 'next/link';
import React, { useState, useEffect } from 'react'
import { Menu } from 'antd';
import Router from 'next/router';

// FILES
import logo from '../../public/langtimelogo.png';
import logout from '../../public/logout.png';
import help from '../../public/help.png';


function getItem(label, key, icon, children, type, langID) {
  return {
    key,
    icon,
    children,
    label,
    type,
    langID
  };
}

function getLanguageOptions(langName, num, langID) {
  const langOptions = [
    getItem('View Language', langName, null, null, null, langID),
    getItem('Phonology', (num * 4) + 1, null, null, null,langID),
    getItem('Orthography', (num * 4) + 2, null, null, null,langID),
    getItem('Language Specific', (num * 4) + 3, null, null, null,langID),
    getItem('Settings', (num * 4) + 4, null, null, null,langID)
  ];
  return langOptions;
}

export default function SideBar() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`api/getUserLang`);
      const newData = await response.json();
      setData(newData);
    };

    fetchData();
  }, []);

  if (data) {
      let langIDS = data.languageIDs.split(',')
      let langNames = data.languageNames.split(',')
      console.log("Lang IDs: ", data.languageIDs.split(','))
      console.log("Lang Names: ", data.languageNames.split(','))

      const items = [getItem('Dashboard', 'dash')];
      for (let i = 0; i < langIDS.length; i++) {
        const langName = langNames[i];
        const langID = langIDS[i]
        const menuButton = getItem(langName, i, null, getLanguageOptions(langName, i, langID), null, langID);
        // console.log("ITEM: ", menuButton)
        items.push(menuButton);
      }

      // Route to the language's table
      const onClick = (e) => {
        // console.log("LangID to push: ", e.item.props.langID)
        console.log(Router.pathname)
        let query = e.item.props.langID.replace(/\s+/g, '')

        // WIP: Can only load one table at a time, clicking another button returns same data for some reason
        Router.push({ pathname: '/langTable', query: { lid: e.item.props.langID, lname: e.key } });
        // var newUrl = window.location.origin + '/langTable' + "?lid=" + query;
        // window.location.href = newUrl;

      };

      return (
        <div>
        <Sider theme='light'>
          <Link class="test" href="/dashboard">
            <Image src={ logo } alt='Logo placeholder' width={150}/>
          </Link>
          <Menu
          onClick={onClick}
          style={{
            width: 'auto',
          }}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          items={items}
          />
          <Link href="/help" >
            <Image src={ help } alt='Help placeholder' width={200}/>
          </Link>
          <Link href="/" onClick={() => logoutUser()}>
            <Image src={ logout } alt='Logout placeholder' width={200}/>
          </Link>
        </Sider>
        </div>
      );
  } else {
    return null;
  }
}


