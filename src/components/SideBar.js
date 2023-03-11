// PACKAGES
import { Layout } from 'antd';
import Image from 'next/image'
import Link from 'next/link';
import React, { useState } from 'react'

// FILES
import logo from '../../public/langtimelogo.png';
import logout from '../../public/logout.png';
import help from '../../public/help.png';

import getUserLanguages from '../app/getLanguages';

// CONSTANTS
const { Header, Footer, Sider, Button, Collapse, Panel } = Layout;

function LangButton({langID, langName, key}) {
    const handleClick = () => {

    }

    return (
        <Collapse>
            <Panel id={langID} header={langName} key={key}>
                <Button>Phonology</Button>
                <Button>Orthography</Button>
                <Button>Language Specific</Button>
                <Button>Settings</Button>
            </Panel>
        </Collapse>
    )
}

export function SideBar() {
    const [languages, setLanguages] = useState({});
    setLanguages()
    let responseJson = await getUserLanguages();

    let langIDS = responseJson.languageIDs.split(',')
    let langNames = responseJson.languageNames.split(',')
    console.log("Lang IDs: ", responseJson.languageIDs.split(','))
    console.log("Lang Names: ", responseJson.languageNames.split(','))

    const numLanguages = langIDS.length;
    let buttonList = [];
    for (let i = 0; i < numLanguages; i++) {
        buttonList.push(<LangButton langID={langIDS[i]} langName={langNames[i]} key={key}></LangButton>)
    }
    console.log("BUTTON LIST:", buttonList);
    return (
        <div id='buttonList'>
            {buttonList}
        </div>
    );
}