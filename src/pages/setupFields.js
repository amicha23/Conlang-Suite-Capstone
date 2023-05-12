// Hold the Dictionary Setup Page 2 for pre-filled and custom fields

import { Input } from 'antd';
import { UploadOutlined, LeftOutlined } from '@ant-design/icons';
import { Button, message, Upload, Popconfirm } from 'antd';
import React, { useRef, useEffect, useState } from "react";
import { Layout } from 'antd';
import Router from 'next/router';
const { Header, Footer, Sider, Content } = Layout;

// Router
import { useRouter } from 'next/navigation';

// icons
import { CheckCircleOutlined, CheckCircleTwoTone, InfoCircleOutlined, InfoCircleTwoTone } from '@ant-design/icons';

// Components
import { DictionaryPrefilledForms } from '../components/dictionaryPrefilled';
import { DictionaryCustomForms } from '../components/dictionaryCustomFields';
import { SetUp } from '../components/setup';

// Functions
// import saveLangInfo from "../app/dictionary"
import saveDictionaryFields from "../app/sendTableInfo"

//css
// import '../app/page.module.css';
import styles from '../app/page.module.css'

// images
import Image from 'next/image';
import logo from '../../public/langtimelogo.png';


const { TextArea } = Input;



export default function setup() {
  const [langName, setValue] = useState('');
  const [langDesc, setDesc] = useState('');
  const [fieldView, setFieldView] = useState(true);
  const [setUpView, changeSetUpView] = useState(true);
  const router = useRouter();

  const [fields, setFields] = React.useState([
    "Orthographic forms",
    "Pronunciation",
    "English definition",
    "Keystrokes for orthography",
    "Head word",
    "Inflected forms",
    "Proto-form",
    "Politeness-register scale"
  ]);

  const [file, setFile] = useState(null);
  const [blob, setBlob] = useState(null);

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

  const cancelConfirm = (e) => {
    window.open('/dashboard', `_self`);
  };


  return (
      <div>
          <div id="LangInfo-Setup" style={{display: setUpView ? "block" : "none"}}>
            <SetUp setUpView={setUpView} changeSetUpView={changeSetUpView} />
          </div>
          <div id="Fields-Setup"  style={{display: setUpView ? "none" : "block"}}>
            <Layout>
              <Sider style={{ padding: '0 20px', background: 'white'}}>
                {/* Will need to add in the css */}
                <div id='progress-sidebar'>
                  <Image src={ logo } alt='Logo placeholder' width={150} style={{'margin-bottom': '10px'}} />
                  <CheckCircleTwoTone />
                  <p>Your Details</p>
                  <CheckCircleTwoTone />
                  <p>Dictionary Setup</p>
                  <InfoCircleTwoTone />
                  <p>Dictionary Setup</p>
                </div>
              </Sider>
              <Content style={{ padding: '0 20px', background: 'white'}}>
                <h1>Dictionary Setup</h1>
                <p className='fields'>
                  To get started, you'll need to set up the header fields.
                  These fields will be used to organize your dictionary.
                  Some common header fields are: English Definition, Orthographic forms, Pronunciation.
                  You can also create your own header fields that make sense for your language.
                  Once your header fields are set up, you'll be ready to start adding words and their definitions.
                </p>
                <p><b>
                  You can always update these at anytime throughout your language creation process.
                </b></p>
                <div id="field-option">
                  <Button
                      id='prefilled-btn'
                      type={fieldView ? "primary" : "outline"}
                      onClick={() => setFieldView(true)}
                        >
                        Pre-filled Fields
                  </Button>
                </div>

                <div id="form-fields-setup">
                  <br></br>
                  <div id="prefill" style={{display: fieldView ? "block" : "none"}}>
                    <DictionaryPrefilledForms fields={fields} setFields={setFields}/>
                  </div>

                </div>
                <div id="buttons" style={{display: 'flex', alignItems: 'center'}}>
                  <div id="back-btn" style={{display: setUpView ? "none" : "block", flex: '0.6'}}>
                    <LeftOutlined onClick={() => {
                      changeSetUpView(true);
                    }}/>
                  </div>

                  <div id="create-dict-button">
                    <br></br>
                    <Popconfirm
                      title="Are you sure you want to cancel these changes?"
                      description="Discard edits and return to the dashboard"
                      onConfirm={cancelConfirm}
                      okText="Yes"
                    >
                      <Button
                        style={{ marginRight: '0.5rem' }}
                      >
                        Cancel
                      </Button>
                    </Popconfirm>
                    {/* <Button type="primary" htmlType="submit" onClick={onFinish}> */}
                    <Button
                      type="primary"
                      htmlType="submit"
                      onClick={async () => {
                        // console.log("FILE: ", file)
                        // console.log("Blob: ", blob)
                        await saveDictionaryFields(fieldView);
                        // Router.push({pathname: '/dashboard'})
                        // window.open('/dashboard', `_self`);
                      }}
                      >
                      Create Dictionary
                    </Button>

                  </div>
                </div>
              </Content>
            </Layout>
          </div>
      </div>
  );
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

