// PACKAGES
import { Layout } from 'antd';
import { Button, Collapse, Tabs } from 'antd';
import React, { useEffect, useState, createElement } from "react";
import { Pie } from '@ant-design/plots';

// Components
import langChart from '../components/langChart';
import SideBar from '../components/SideBar';
import '../app/globals.css';

// Constants
const { Header, Footer, Sider, Content } = Layout;
const Panel = Collapse.Panel;

const onChange = (key) => {
    console.log(key);
  };

// TODO: chang items into field names of designated lid, change children into rendered charts
const items = [
    {
      key: '1',
      label: `First Letter`,
      children: childContent({name: 'First Letter', data: data}),
    },
    {
      key: '2',
      label: `fieldName1`,
      children: childContent({name: 'Field Name number 2'}),
    },
    {
      key: '3',
      label: `fieldName2`,
      children: `Content of Tab Pane 3`,
    },
  ];

function childContent({ name, data }) {
    return (
        <div>
            the content of tab pane goes here {name}
            <DemoPie/>
        </div>
    );
}

const DemoPie = () => {
    const data = [
      {
        type: '分类一',
        value: 27,
      },
      {
        type: '分类二',
        value: 25,
      },
      {
        type: '分类三',
        value: 18,
      },
      {
        type: '分类四',
        value: 15,
      },
      {
        type: '分类五',
        value: 10,
      },
      {
        type: '其他',
        value: 5,
      },
    ];
    const config = {
      appendPadding: 10,
      data,
      angleField: 'value',
      colorField: 'type',
      radius: 1,
      innerRadius: 0.6,
      label: {
        type: 'inner',
        offset: '-50%',
        content: '{value}',
        style: {
          textAlign: 'center',
          fontSize: 14,
        },
      },
      interactions: [
        {
          type: 'element-selected',
        },
        {
          type: 'element-active',
        },
      ],
      statistic: {
        title: false,
        content: {
          style: {
            whiteSpace: 'pre-wrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          },
          content: 'AntV\nG2Plot',
        },
      },
    };
    return <Pie {...config} />;
  };

export default function Home() {
      return (
        <div >
            <Layout style={{
                        minHeight: '100vh',
                    }}>
                    <SideBar />
                <Layout className="site-layout">
                    <Content style={{
                                margin: '0 16px',
                            }}>
                        <div id="stats-chart-heading" className='site-layout-background' 
                             style={{ padding: 24, minHeight: '100%'}}>
                            <div>
                                <h2>Language Statistics Chart</h2>
                                <Tabs defaultActiveKey='1' type="card" items={items} onChange={onChange} style={{borderLeft: 20, paddingTop:20}}/>

                            </div>
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
