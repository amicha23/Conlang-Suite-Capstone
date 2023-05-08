// PACKAGES
import { Layout, Image } from 'antd';
import { useRouter } from 'next/router';
import { Button, Collapse, Card, Col, Row } from 'antd';
import React, { useEffect, useState } from "react";
import Router from 'next/router';


// Components
import DictionaryTable from '../components/dictTable';
import SideBar from '../components/SideBar';

// FILES
import getUserLang from "./api/user/getUserLang";

// Constants
const { Header, Footer, Sider, Content } = Layout;
const Panel = Collapse.Panel;
const { Meta } = Card;


export default function Home() {
    const [langData, setLangData] = useState();
    const [viewDict, changeDashboardView] = useState(true);

    const createDict = () => {
        window.open(`/setupFields`, `_self`);
    };
    const recoverLang = () => {
        window.open(`/recoverDelLang`, `_self`);
    };

    // Get all user languages into the sidebar on load
    useEffect(() => {
        let uid = sessionStorage.getItem("uid");
        console.log("USE THIS UID: ", uid)
        const fetchData = async () => {
            let getLangData = await getUserLang({
            uid: uid,
        });
        setLangData(getLangData);
    };

    fetchData();
    }, []);

    console.log('LANGDATA1: ');
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
                                <Button type='primary' style={{ marginRight: "10px"}} onClick={ createDict }>Create New Dictionary</Button>
                                <Button type='primary' onClick={ recoverLang }>Recover Deleted Languages</Button>
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
    } else {
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
                                <Button type='primary' style={{ marginRight: "10px"}} onClick={ createDict }>Create New Dictionary</Button>
                                <Button type='primary' onClick={ recoverLang }>Recover Deleted Languages</Button>
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
}

function LangCard(props) {
    const handleClick = () => {
      // Navigate to the cards language
      window.open(
        `/langTable?lid=` +
          props.langID +
          `&lname=` +
          encodeURIComponent(props.langName),
        `_self`
      );
    }

    return (
        <Card onClick={handleClick} hoverable style={{ width: 240,}}
            cover={<img alt="Picture for given dictionary" src={props.langImg} />}>
            <Meta title={props.langName} description="LANGUAGE URL"/>
        </Card>
    )
  }

  function LangCards({langData}) {
    console.log('LANGDATA2: ' + langData);
    if (langData === "No data available") {
        console.log("ASHKD", langData)
        return null
    }
        const langIDS = langData.languageIDs.split(",");
        const langNames = langData.languageNames;
        const langImgs = langData.languageCovers;


        let langCards = [];
        for (let i = 0; i < langNames.length; i++) {
            langCards.push(
                <Col span={6}>
                    <LangCard langName={langNames[i]} langImg={langImgs[i]} langID={langIDS[i]} key={langIDS[i]}/>
                </Col>
            )
        }
        return (
            <div id="langCards">
                <Row>
                    {langCards}
                </Row>
            </div>
          );
  }