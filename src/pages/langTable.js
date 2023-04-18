// PACKAGES
import { Layout } from 'antd';
import { useRouter } from 'next/router';
import { Button, Collapse } from 'antd';
import React, { useEffect, useState } from "react";

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
        if (searchParams) {
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

    return (
        <div>
            <Layout>
                <div id="side-bar-div">
                    <SideBar/>
                </div>
                <Content>
                    <div id="dict-table">
                        <DictionaryTable queryParam={queryParam} setQueryParam={setQueryParam} queryName={queryName} setQueryName= {setQueryName}/>
                    </div>
                </Content>
            </Layout>
        </div>
    );
}
