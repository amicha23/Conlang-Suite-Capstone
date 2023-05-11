// Hold the Dictionary Setup Page 2 for pre-filled and custom fields

import { Input, Popconfirm } from 'antd';
import { UploadOutlined, LeftOutlined, SettingOutlined, EditTwoTone } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import React, { useRef, useEffect, useState } from "react";
import { Layout } from 'antd';
import Router from 'next/router';
const { Header, Footer, Sider, Content } = Layout;

// Router
import { useRouter } from 'next/navigation';

// icons
import { CheckCircleOutlined, CheckCircleTwoTone, InfoCircleOutlined, InfoCircleTwoTone } from '@ant-design/icons';

// Components
import { EditPrefilledForms } from '../components/editPrefilled';
import { DictionaryCustomForms } from '../components/dictionaryCustomFields';
import { EditDictionary } from '../components/editDictionary';
import getLangData from '../pages/api/language/getLangData';

// Functions
// import saveLangInfo from "../app/dictionary"
import saveEditDictionaryInfo from '../pages/api/language/sendEditInfo';

//css
// import '../app/page.module.css';
import styles from '../app/page.module.css'

// images
import Image from 'next/image';
import logo from '../../public/langtimelogo.png';




const { TextArea } = Input;



// Implement file upload later
const props = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};


export default function dictSettings() {
  const [langName, setValue] = useState('');
  const [langDesc, setDesc] = useState('');
  const [fieldView, setFieldView] = useState(true);
  const [setUpView, changeSetUpView] = useState(true);
  const router = useRouter();

  const [fields, setFields] = React.useState([
    "Orthographic forms",
    "Keystrokes for orthography",
    "Head word",
    "Inflected forms",
    "Pronunciation",
    "Proto-form",
    "Politeness-register scale",
    "English definition"
  ]);

  const [file, setFile] = useState(null);
  const [blob, setBlob] = useState(null);
  const [data, setData] = useState(null);
  const [queryParam, setQueryParam] = useState('');
  const [queryName, setQueryName] = useState('');
  const [searchParams, setSearchParams] = useState('');

  useEffect(() => {
    let uid = sessionStorage.getItem("uid");
    console.log("USE THIS UID: ", uid)
    if (uid) {
      console.log("Logged in");
    } else {
      console.log("Not logged in");
      window.open(`https://langtimeengine.framer.website/`, `_self`);
    }
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    console.log("SSS", searchParams)

    setSearchParams(searchParams);
    if (searchParams !== undefined) {
        // const queryParam = searchParams.get('lid');
        // const queryName = searchParams.get('lname');

      setQueryParam(searchParams.get('lid').replace(/\s+/g, ''));
      setQueryName(searchParams.get('lname'));
      console.log("QUERY ", queryParam.replace(/\s+/g, ''));
      return
    }
    return
  }, [queryParam]);

  useEffect(() => {

    if (queryParam) {
      fetchData();
    }
  }, [queryParam]);


  // Load in language data on render
  async function fetchData() {
    let getLandData = await getLangData({'lid' : queryParam});

    if (typeof(getLandData) !== String ) {
      console.log('FETCH', getLandData);
      setData(getLandData)

      setFields(getLandData['dictHeaders'])
      setValue(getLandData['lang']['name'])
    } else {
      console.log("failed to fetch data ", getLandData)
    }

  }

    // Discard changes, return to dashboard
    const saveConfirm = (e) => {
      console.log("Save these edits:")
      saveEditDictionaryInfo(fieldView, file, blob, queryParam)
      // Router.push({pathname: '/dashboard'})
    };

  // Discard changes, return to dashboard
  const cancelConfirm = (e) => {
    Router.push({pathname: '/dashboard'})
  };

  const backToDashboard = () => {
    window.open(`/dashboard`, `_self`);
  };

  if (data) {
    return (
        <div>
            <div id="LangInfo-Setup" style={{display: setUpView ? "none" : "block"}}>
              <EditDictionary data={data} setData={setData} queryParam={queryParam} queryName={queryName} setUpView={setUpView} changeSetUpView={changeSetUpView} file={file} setFile={setFile} blob={blob} setBlob={setBlob}/>

            </div>
            <div id="Fields-Setup"  style={{display: setUpView ? "block" : "none"}}>
              <Layout>
                <Sider style={{ padding: '0 20px', background: 'white'}}>
                  {/* Will need to add in the css */}
                  <div id='progress-sidebar'>
                    {/* <Image src={ logo } alt='Logo placeholder' width={150} style={{'margin-bottom': '10px'}} /> */}
                    <p><b>{langName}</b></p>
                    <div style={{marginBottom:'1.5rem'}}>
                      <EditTwoTone style={{display: 'inline', marginRight:'0.5rem'}} />
                      <p style={{display: 'inline'}}>Edit Dictionary</p>
                    </div>
                    <div>
                      <SettingOutlined style={{display: 'inline', marginRight:'0.5rem'}} />
                      <p style={{display: 'inline'}}>Settings</p>
                    </div>
                  </div>
                </Sider>
                <Content style={{ padding: '0 20px', background: 'white'}}>
                  <h1>Edit Dictionary Fields </h1>
                  <p className='fields'>
                    Add, edit, or remove dictionary fields.
                  </p>
                  <p><b>
                    You can always update these at anytime throughout your language creation process.
                  </b></p>


                  <div id="form-fields-setup">
                    <br></br>
                    <div id="prefill" style={{display: fieldView ? "block" : "none"}}>
                      <EditPrefilledForms fields={fields} setFields={setFields} data={data} setData={setData} queryParam={queryParam}/>
                    </div>

                  </div>
                  <div id="buttons" className={styles.buttons}>

                    <div id="create-dict-button">
                      <br></br>
                      {/* <Button type="primary" htmlType="submit" onClick={onFinish}> */}
                      {/* <Popconfirm
                        title="Are you sure you want to cancel these changes?"
                        description="Discard edits and return to the dashboard"
                        onConfirm={cancelConfirm}
                        okText="Yes"
                      >
                        <Button
                        style={{marginRight: '0.5rem'}}
                        >
                          {/* Cancel
                        </Button>
                      </Popconfirm> */}
                      {/* <Popconfirm
                        title="Are you sure you want to save these changes?"
                        description="This action cannot be undone"
                        onConfirm={saveConfirm}
                        okText="Yes"
                      > */}
                        <Button
                          type="primary"
                          htmlType="submit"
                          onClick={() => {
                            // console.log("FILE: ", file)
                            // console.log("Blob: ", blob)
                            changeSetUpView(false);
                            // saveDictionaryFields(fieldView, file, blob);
                            // Router.push({pathname: '/dashboard'})
                          }}
                          >
                          Continue
                        </Button>
                        <Button
                          onClick={backToDashboard}
                          style={{
                            margin: "20px",
                            display: "block",
                            marginLeft: "auto",
                            marginRight: "auto",
                            }}
                          >
                          {" "}
                          Back to dashboard{" "}
                        </Button>
                      {/* </Popconfirm> */}
                    </div>
                  </div>
                </Content>
              </Layout>
            </div>
        </div>
    );
  }
}

function ShowField({fieldView}) {

  // const AppContext = React.createContext(null);

  // <AppContext.Provider value={<DictionaryPrefilledForms></DictionaryPrefilledForms>}>
  // </AppContext.Provider>

  // const ChildComponent = () => {
  //   const Component = useContext(AppContext);
  //   return(<DictionaryPrefilledForms></DictionaryPrefilledForms>)
  // }


  if (fieldView === true) {
    return(<DictionaryPrefilledForms></DictionaryPrefilledForms>)
  } else {
    return (
      <DictionaryCustomForms></DictionaryCustomForms>
    );
  }
}

