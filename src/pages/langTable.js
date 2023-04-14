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

    const router = useRouter()
    let query=router.query['lid']
    console.log("Query Param: ", query);

    return (
        <div>
            <Layout>
                <div id="side-bar-div">
                    <SideBar/>
                </div>
                <Content>
                    <div id="dict-table">
                        <DictionaryTable lid={query}/>
                    </div>
                </Content>
            </Layout>
        </div>
    );
}
