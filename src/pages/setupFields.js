// Hold the Dictionary Setup Page 2 for pre-filled and custom fields

import { Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import React, { useRef, useEffect, useState } from "react";
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

// Router
import { useRouter } from 'next/navigation';

// icons
import { CheckCircleOutlined, CheckCircleTwoTone, InfoCircleOutlined, InfoCircleTwoTone } from '@ant-design/icons';

// Components
import { DictionaryPrefilledForms } from '../components/dictionaryPrefilled';
import { DictionaryCustomForms } from '../components/dictionaryCustomFields';

// Functions
// import saveLangInfo from "../app/dictionary"
import saveDictionaryFields from "../app/sendTableInfo"


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


export default function setup() {
  const [langName, setValue] = useState('');
  const [langDesc, setDesc] = useState('');
  const [fieldView, setFieldView] = useState(true);
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


  return (
      <div>
          <Layout>
            <Sider style={{ padding: '0 20px', background: 'white'}}>
              {/* Will need to add in the css */}
              <div id='progress-sidebar'>
                <CheckCircleTwoTone />
                <p>Your Details</p>
                <InfoCircleTwoTone />
                <p>Dictionary Setup</p>
                <InfoCircleOutlined />
                <p>Dictionary Setup</p>
              </div>
            </Sider>
            <Content style={{ padding: '0 20px', background: 'white'}}>
              <h1>Dictionary Setup</h1>
              <p className='fields'>
                To get started, you'll need to set up the header fields.
                These fields will be used to organize your dictionary.
                Some common header fields are: [X, X, X].
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
                <Button
                  type={fieldView ? "outline" : "primary"}
                  onClick={() => setFieldView(false)}

                      >
                      Custom Fields
                </Button>
              </div>

              <div id="form-fields-setup">
                <br></br>
                <div style={{display: fieldView ? "block" : "none"}}>
                  <DictionaryPrefilledForms fields={fields} setFields={setFields}/>
                </div>

                <div style={{display: fieldView ? "none" : "block"}}>
                  <DictionaryCustomForms />
                </div>

                {/* <ShowField fieldView={fieldView} /> */}
                {/* { fieldView ? <DictionaryPrefilledForms /> : null } */}


              </div>
              <div id="create-dict-button">
                <br></br>
                {/* <Button type="primary" htmlType="submit" onClick={onFinish}> */}
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={() => {
                    saveDictionaryFields();
                  }}
                   >
                  Create Dictionary
                </Button>

              </div>
            </Content>
          </Layout>
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

