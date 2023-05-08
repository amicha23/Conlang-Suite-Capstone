// PACKAGES
import { Layout, Card, Image } from 'antd';
import { useRouter } from 'next/router';
import { Button, Collapse } from 'antd';
import React, { useEffect, useState } from "react";
import Router from 'next/router';
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Components
import DictionaryTable from '../components/dictTable';
import SideBar from '../components/SideBar';

// FILES
import getUserLang from "../pages/api/getUserLang";

// Constants
const { Header, Footer, Sider, Content } = Layout;
const Panel = Collapse.Panel;
const { Meta } = Card;

// Get the currently singed-in user (FOR TESTING PURPOSES, FEEL FREE TO DELETE FOR RELEASE)
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    alert(uid);
  } else {
    // User is signed out
    alert("User is signed out");
  }
});

export default function Home() {
    const [langData, setLangData] = useState();
    const [viewDict, changeDashboardView] = useState(true);

    const createDict = () => {
        window.open(`/setupFields`, `_self`);
    };

    // Get all user languages into the sidebar on load
    useEffect(() => {
        const fetchData = async () => {
            let getLangData = await getUserLang({
            uid: "OUnW07Np3VNFduMOCX1V1bvvsd22",
        });
        setLangData(getLangData);
    };

    fetchData();
    }, []);

    console.log('LANGDATA1: ' + langData);
    // Create dashboard cards for each language
    if (langData) {
        return (
            <div>
                <Layout style={{
                    minHeight: '100vh',
                }}>
                    <SideBar/>
                    <Layout className="site-layout">
                        <Content style={{
                            padding: 24,
                            minHeight: '100%'
                        }}>
                            <div id="view-create-dashboard" style={{display: viewDict ? "block" : "none"}} >
                                <h1>Dashboard</h1>
                                <Button type='primary' onClick={ createDict }>Create New Dictionary</Button>
                            </div>
                            <LangCards langData={langData}/>
                        </Content>
                        <Footer
                            style={{
                                textAlign: 'center',
                            }}
                            >
                            Langtime ©2023 Created by Pentalingo & Conlangers
                        </Footer>
                    </Layout>
                </Layout>
            </div>
        );
    }
    return (
        <div>
            <Layout style={{
                minHeight: '100vh',
            }}>
                <SideBar/>
                <Layout className="site-layout">
                    <Content style={{
                        padding: 24,
                        minHeight: '100%'
                    }}>
                        <div id="view-create-dashboard" style={{display: viewDict ? "block" : "none"}} >
                            <h1>Dashboard</h1>
                            <Button type='primary' onClick={ createDict }>Create New Dictionary</Button>
                        </div>
                    </Content>
                    <Footer
                        style={{
                            textAlign: 'center',
                        }}
                        >
                        Langtime ©2023 Created by Pentalingo & Conlangers
                    </Footer>
                </Layout>
            </Layout>
        </div>
    );
}

function LangCard(props) {
    const handleClick = () => {
      // Navigate to the cards language
    }

    return (
        <Card hoverable style={{ width: 240,}}
            cover={<img alt="Picture for given dictionary" src={props.langImg} />}>
            <Meta title={props.langName} description="www.instagram.com"/>
        </Card>
    )
  }

  function LangCards({langData}) {
    console.log('LANGDATA2: ' + langData);
    const langIDS = langData.languageIDs.split(",");
    const langNames = langData.languageNames;
    const langImgs = langData.languageCovers;


    let langCards = [];
    for (let i = 0; i < langNames.length; i++) {
        langCards.push(
            <LangCard langName={langNames[i]} langImg={langImgs[i]} key={langIDS[i]}/>
        )
    }
    return (
        <div id="langCards">
          {langCards}
        </div>
      );
  }
