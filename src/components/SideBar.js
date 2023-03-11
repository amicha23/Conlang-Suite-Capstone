// PACKAGES
import { Layout } from 'antd';
import Image from 'next/image'
import Link from 'next/link';
import React, { useState, useEffect } from 'react'
import { Button, Collapse } from 'antd';

// FILES
import logo from '../../public/langtimelogo.png';
import logout from '../../public/logout.png';
import help from '../../public/help.png';

import getUserLanguages from '../app/getLanguages';

// CONSTANTS
// import { Layout } from 'antd';
// const { Header, Footer, Sider, Panel } = Layout;
const { Header, Footer, Sider, Content, Panel } = Layout;


// function LangButton({langID, langName, key}) {
//     const handleClick = () => {

//     }

//     return (
//         <Collapse>
//             <Panel id={langID} header={langName} key={key}>
//                 <Button>Phonology</Button>
//                 <Button>Orthography</Button>
//                 <Button>Language Specific</Button>
//                 <Button>Settings</Button>
//             </Panel>
//         </Collapse>
//     )
// }


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


        const numLanguages = langIDS.length;


        console.log(data)
        langIDS.forEach((num1, index) => {
            const num2 = langNames[index];
            console.log(num1, num2);
          });

        const users=langIDS.map((num1,id)=>{
            const num2 = langNames[id];
            console.log(num1, num2); // num1: langID, num2: langName
            return <Collapse>
                {/* <Panel id={num1} header={num2} key={num1}> */}
                    <Button id={num1}>{num2}</Button>
                    <Button>Phonology</Button>
                    <Button>Orthography</Button>
                    <Button>Language Specific</Button>
                    <Button>Settings</Button>
                {/* </Panel> */}
            </Collapse>
          })

        return <Sider><div>{users}</div></Sider>;
    } else {
      return null;
    }
  }
