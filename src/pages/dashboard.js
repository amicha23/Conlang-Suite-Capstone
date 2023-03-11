// PACKAGES
import { Layout } from 'antd';
import { useRouter } from 'next/router';
import { Button, Collapse } from 'antd';
import React, { useEffect, useState } from "react";
import Image from 'next/image'
import Link from 'next/link';

// IMAGES
import logo from '../../public/langtimelogo.png';
import logout from '../../public/logout.png';
import help from '../../public/help.png';

// FUNCTIONS
import getUserLanguages from '../app/getLanguages';

// Components
import DictionaryTable from '../components/dictTable';
import { SideBar } from '../components/sidebar';

// Constants
const { Header, Footer, Sider, Content } = Layout;
const Panel = Collapse.Panel;


export default function Home() {
    const [languages, setLanguages] = useState();
    const [viewDict, changeDashboardView] = useState(true);

    const createDict = () => {
        router.push('/setupFields');
    };

    const buttonList = getUserLanguages();
    // console.log("BUTTON LIST2:", buttonList);
    // addClick();

    return (
        <div>
            <SideBar buttonList={ buttonList }/>
            <Layout>
                <Content>
                    <div id="view-create-dashboard" style={{display: viewDict ? "block" : "none"}} >
                        <h1>Dashboard</h1>
                        <Button type='primary' onClick={ createDict }>Create New Dictionary</Button>
                    </div>
                    <div id="dict-table" style={{display: viewDict ? "none" : "block"}}>
                        <DictionaryTable />
                    </div>
                </Content>
            </Layout>
        </div>
    );
}


/* 
                <Sider style={{ padding: '0 20px', background: 'white'}}>
                    <Link href="/dashboard">
                        <Image src={ logo } alt='Logo placeholder' width={150}/>
                    </Link>
                    <div>
                        <Button
                            id="dashbord-btn"
                            onClick={() => changeDashboardView(true)}>Dashboard
                        </Button>
                    </div>

                    {buttonList}

                    <Link href="/help">
                        <Image src={ help } alt='Help placeholder' width={200}/>
                    </Link>
                    <Link href="/logout">
                        <Image src={ logout } alt='Logout placeholder' width={200}/>
                    </Link>
                </Sider>
*/


function addClick() {
    // console.log(document.getElementById('-NQ9AuH-xaR_k-NxzwcA'));
    // add onclick to buttons to select which dictionary to view by language name
    // for (let i = 0; i < langIDS.length; i++) {
    //   console.log("here:",langIDS[i].replace(/\s/g, '')) // for some reason theres a space in the language id, regex to remove
    //   let currentButton = (document.getElementById(langIDS[i].replace(/\s/g, '')));
    //   currentButton.addEventListener("click", function(){ saveLangInfo(langIDS[i].replace(/\s/g, '')) });
    // }
}