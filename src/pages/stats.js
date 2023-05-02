// PACKAGES
import { Layout } from 'antd';
import { Button, Collapse, Tabs } from 'antd';
import React, { useEffect, useState, createElement } from "react";
import { Chart } from "react-google-charts";


// Components
import computeStat from '../pages/api/language/computeWordStats';
import SideBar from '../components/SideBar';
import '../app/globals.css';
// import '../app/css/piechart.css';

// Constants
const { Footer, Content } = Layout;







export default function Home() {
  const [data, setData] = useState([]);
  const [fieldName, setFieldName] = useState([]);
  const [queryParam, setQueryParam] = useState('');
  const [queryName, setQueryName] = useState('');
  const [searchParams, setSearchParams] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    setSearchParams(searchParams);
    if (searchParams !== undefined) {
      setQueryParam(searchParams.get('lid').replace(/\s+/g, ''));
      setQueryName(searchParams.get('lname'));
      console.log("QUERY ", queryParam.replace(/\s+/g, ''));
      return
    }
    return
  }, [queryParam]);

  // Load in stats data on render
  async function fetchData() {
    let getStatsData = await computeStat({'lid' : queryParam});

    if (typeof(getStatsData) !== String ) {
      console.log('FETCH', getStatsData);
      setData(getStatsData[1])
      setFieldName(getStatsData[0])
    } else {
      console.log("failed to fetch data ", getStatsData[0])
      console.log("failed to fetch data ", getStatsData[1])

    }

  }

  useEffect(() => {

    if (queryParam) {
      fetchData();
    }
  }, [queryParam]);

  const options = {
    // title: "Language Statistics",
    pieHole: 0.5,
    is3D: false,
  };
  


  var items = [];
  for (let i = 0; i < fieldName.length; i++) {
    items.push(
      {
        key: i+1, 
        label:fieldName[i], 
        children: childContent({name: fieldName[i], chartData: data[i]})
      }
    );
  }
  
  function childContent({ name, chartData }) {
      return (
          <div>
              the content of tab pane goes here {name}
            <Chart
              chartType="PieChart"
              data={chartData}
              width="100%"
              height="400px"
              options={options}
              legendToggle
            />
          </div>
      );
  }

  if (data) {
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
                        <Tabs defaultActiveKey='1' type="card" items={items} style={{borderLeft: 20, paddingTop:20}}/>

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
}

