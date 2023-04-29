// PACKAGES
import { Layout } from 'antd';
import { useRouter } from 'next/router';
import { Button, Collapse } from 'antd';
import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Components
import DictionaryTable from '../components/dictTable';
import SideBar from '../components/SideBar';
import '../app/globals.css';

// Constants
const { Header, Footer, Sider, Content } = Layout;
const Panel = Collapse.Panel;


export default function Home() {
    const [languages, setLanguages] = useState();
    const [viewDict, changeDashboardView] = useState(true);

    const [queryParam, setQueryParam] = useState('');
    const [queryName, setQueryName] = useState('');
    const [searchParams, setSearchParams] = useState('');

    const router = useRouter()

    // router.reload(router.pathname);
    let query=router.query['lid']
    console.log("Query Param: ", query);
    console.log("TEST ", router.asPath)
    // router.push({ pathname: router.asPath });

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);


        setSearchParams(searchParams);
        if (searchParams !== undefined) {
            // const queryParam = searchParams.get('lid');
            // const queryName = searchParams.get('lname');

          setQueryParam(searchParams.get('lid').replace(/\s+/g, ''));
          setQueryName(searchParams.get('lname'));
          console.log("QUERY ", queryParam.replace(/\s+/g, ''));
          return
        }
        // setQueryParam(null);
        //   setQueryName(null);
        return
      }, []);

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

    return (
        <div >
            <Layout style={{
                        minHeight: '100vh',
                    }}>
                {/* <div id="side-bar-div"> */}
                    <SideBar queryParam={queryParam} setQueryParam={setQueryParam} queryName={queryName} setQueryName= {setQueryName}/>
                {/* </div> */}
                <Layout className="site-layout">
                    {/* <Header
                        className="site-layout-background"
                        style={{
                            padding: 0,
                        }}
                        /> */}

                    <Content style={{
                                margin: '0 16px',
                            }}>
                        <div id="dict-table" className='site-layout-background' style={{
                                                                                        padding: 24,
                                                                                        minHeight: '100%'
                                                                                        }}>
                            <DictionaryTable queryParam={queryParam} setQueryParam={setQueryParam} queryName={queryName} setQueryName= {setQueryName}/>
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
    )
}
