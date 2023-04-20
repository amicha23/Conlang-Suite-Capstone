// PACKAGES
import { Layout } from 'antd';
import { useRouter } from 'next/router';
import { Button, Collapse } from 'antd';
import React, { useEffect, useState } from "react";
import Router from 'next/router';


// Components
import DictionaryTable from '../components/dictTable';
import SideBar from '../components/SideBar';

// Constants
const { Header, Footer, Sider, Content } = Layout;
const Panel = Collapse.Panel;


export default function Home() {
    const [languages, setLanguages] = useState();
    const [viewDict, changeDashboardView] = useState(true);

    const createDict = () => {
        Router.push('/setupFields');
    };

    return (
        <div>
            <Layout>
                <div id="side-bar-div">
                    <SideBar/>
                </div>
                <Content>
                    <div id="view-create-dashboard" style={{display: viewDict ? "block" : "none"}} >
                        <h1>Dashboard</h1>
                        <Button type='primary' onClick={ createDict }>Create New Dictionary</Button>
                    </div>
                    {/* <div id="dict-table" style={{display: viewDict ? "none" : "block"}}>
                        <DictionaryTable />
                    </div> */}
                </Content>
            </Layout>
        </div>
    );
}

function addClick() {
    // console.log(document.getElementById('-NQ9AuH-xaR_k-NxzwcA'));
    // add onclick to buttons to select which dictionary to view by language name
    // for (let i = 0; i < langIDS.length; i++) {
    //   console.log("here:",langIDS[i].replace(/\s/g, '')) // for some reason theres a space in the language id, regex to remove
    //   let currentButton = (document.getElementById(langIDS[i].replace(/\s/g, '')));
    //   currentButton.addEventListener("click", function(){ saveLangInfo(langIDS[i].replace(/\s/g, '')) });
    // }
}

