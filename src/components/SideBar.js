// // PACKAGES
import { Layout } from 'antd';
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
// import { useSearchParams } from "react-router-dom";

// FILES
import logo from '../../public/langtimelogo.png';
import logout from '../../public/logout.png';
import help from '../../public/help.png';
import deleteLang from '../pages/api/language/deleteLang';
import getUserLang from '../pages/api/getUserLang';
import { logoutUser } from '../app/user';

function getItem(label, key, icon, children, type, langID, func) {
  return {
    key,
    icon,
    children,
    label,
    type,
    langID,
    func
  };
}

function getLanguageOptions(langName, num, langID, handleDeleteLang) {
  const langOptions = [
    getItem('View Language', langName, null, null, null, langID, null),
    // getItem('Phonology', (num * 4) + 1, null, null, null,langID, null),
    // getItem('Orthography', (num * 4) + 2, null, null, null,langID, null),
    // getItem('Language Specific', (num * 4) + 3, null, null, null,langID, null),
    getItem('Delete', (num * 4) + 4, null, null, null,langID, null)
  ];
  return langOptions;
}


export default function SideBar({queryParam, setQueryParam, queryName, setQueryName}) {
  const [data, setData] = useState(null);
  // const [queryParam, setQueryParam] = useState('');
  // const [queryName, setQueryName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
        let getLandData = await getUserLang({'uid' : "OUnW07Np3VNFduMOCX1V1bvvsd22"});
        setData(getLandData)
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   if (queryParam) {
  //   // WIP: Can only load one table at a time, clicking another button returns same data for some reason
  //   Router.push({ pathname: '/langTable', query: { lid: queryParam, lname: queryName } });
  //   // var newUrl = window.location.origin + '/langTable' + "?lid=" + query;
  //   // window.location.href = newUrl;
  //   setQueryParam(null)
  //   setQueryName(null);
  //   // let params = serializeFormQuery(e.target);
  //   // setSearchParams(params);
  //   // console.log("PARAMS ", params)
  //     return;
  //   }
  // })

  // useEffect(() => {
  //   const handleRouteChange = (url) => {
  //     console.log(
  //       `App is changing to ${url} `
  //     )
  //   }

  //   Router.events.on('routeChangeStart', handleRouteChange)

  //   // If the component is unmounted, unsubscribe
  //   // from the event with the `off` method:
  //   return () => {
  //     Router.events.off('routeChangeStart', handleRouteChange)
  //   }
  // }, [Router])

  const handleRoute = (e) => {
    console.log(e)
    // useEffect(() => {
      // if (queryParam) {
      // WIP: Can only load one table at a time, clicking another button returns same data for some reason

      // Router.push({ pathname: window.location.origin + '/langTable', query: { lid: e.item.props.langID, lname: e.key } });
      Router.push({pathname: '/langTable', query: { lid: e.item.props.langID, lname: e.key }})

      // if (searchParams.lid !== undefined) {
      //   let checkLID = searchParams.get('lid').replace(/\s+/g, '')
      //   console.log("AAAAAAAAAA",checkLID, e.item.props.langID)
      //   if ( e.item.props.langID !== checkLID) {
      //     Router.reload()
      //   }
      // }
      // Router.reload()
      // var newUrl = window.location.origin + '/langTable' + "?lid=" + query;
      // window.location.href = newUrl;
      // setQueryParam(null)
      // setQueryName(null);
      // let params = serializeFormQuery(e.target);
      // setSearchParams(params);
      // console.log("PARAMS ", params)
        return;
      // }
    // }



  };

  // Delete a language on the sidebar
  const handleDeleteLang = async (e) => {
    console.log("Delete language: ", e.item.props.langID)
    console.log("TEST", data)

    let deleteLangData = await deleteLang({
      "lid": e.item.props.langID
      })

      if (deleteLangData === "Success") {
        console.log('deleted language called :>> ', deleteLangData);
        let getLandData = await getUserLang({'uid' : "OUnW07Np3VNFduMOCX1V1bvvsd22"});
        setData(getLandData)
      } else {
        console.log("delete language failed ", deleteLangData)
      }

  };


  if (data) {
      let langIDS = data.languageIDs.split(',')
      let langNames = data.languageNames.split(',')
      console.log("Lang IDs: ", data.languageIDs.split(','))
      console.log("Lang Names: ", data.languageNames.split(','))

      const items = [getItem('Dashboard', 'dash')];
      for (let i = 0; i < langIDS.length; i++) {
        const langName = langNames[i];
        const langID = langIDS[i]
        const menuButton = getItem(langName, i, null, getLanguageOptions(langName, i, langID, handleDeleteLang), null, langID, null);
        console.log(menuButton)
        for (let sideLabels of Object.values(menuButton.children)) {
          if (sideLabels["label"] === "View Language") {
            sideLabels.onClick = handleRoute
          }

          if (sideLabels["label"] === "Delete") {
            sideLabels.onClick = handleDeleteLang
          }
        }
        // console.log(menuButton)
        // console.log("ITEM: ", menuButton)
        items.push(menuButton);
      }

      // Route to the language's table
      const onClick = (e) => {
        // console.log("LangID to push: ", e.item.props.langID)
        // console.log(Router.pathname)
        let query = e.item.props.langID.replace(/\s+/g, '')
        setQueryParam(query)
        setQueryName(e.key);
        console.log("QERRRY ", query)


      };



      return (
        <div>
          <Sider theme='light' style={{
                  minHeight: '100%',
                }}>
            <Link class="test" href="/dashboard">
              <Image src={ logo } alt='Logo placeholder' width={150}/>
            </Link>
            <Menu
            // onClick={onClick}
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
            <a onClick={() => logoutUser()}>
              <Image src={ logout } alt='Logout placeholder' width={200}/>
            </a>
          </Sider>
        </div>
      );
  } else {
    return null;
  }
}


