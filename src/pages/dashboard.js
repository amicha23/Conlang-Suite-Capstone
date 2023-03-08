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

// Constants
const { Header, Footer, Sider, Content } = Layout;
const Panel = Collapse.Panel;


export default function Home() {
    const [languages, setLanguages] = useState();

    const createDict = () => {
        router.push('/setupFields');
    };

    getUserLanguages();
    
    return (
        <div>
            <Layout>
                <Sider style={{ padding: '0 20px', background: 'white'}}>
                    <Link href="/dashboard">
                        <Image src={ logo } alt='Logo placeholder' width={150}/>
                    </Link>

                    <div id='buttons'>
                    </div>

                    <Link href="/help">
                        <Image src={ help } alt='Help placeholder' width={200}/>
                    </Link>
                    <Link href="/logout">
                        <Image src={ logout } alt='Logout placeholder' width={200}/>
                    </Link>
                </Sider>
                <Content>
                    <h1>Dashboard</h1>
                    <Button type='primary' onClick={ createDict }>Create New Dictionary</Button>
                </Content>
            </Layout>
        </div>
    );
}