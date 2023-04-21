// Hold the Dictionary Setup Page 1 for naming the languge and uploads

import { Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import React, { useEffect, useState } from "react";
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

// Router
import { useRouter } from 'next/navigation';

// icons
import { CheckCircleOutlined, CheckCircleTwoTone, InfoCircleOutlined, InfoCircleTwoTone } from '@ant-design/icons';

// images
import Image from 'next/image';
import logo from '../../public/langtimelogo.png';
import uploadCoverImg from '../pages/api/language/uploadLangImg'

// Components
// import { DictionaryPrefilledForms } from './dictionaryPrefilled';
// import { DictionaryCustomForms } from './dictionaryCustomFields';

// Functions
// import saveUserInfo from "../app/dictionary"


const { TextArea } = Input;



// Implement file upload later
// const props = {
//   name: 'file',
//   action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
//   headers: {
//     authorization: 'authorization-text',
//   },
//   onChange(info) {
//     console.log(props.name, props.action)
//     if (info.file.status !== 'uploading') {
//       console.log(info.file, info.fileList);
//     }
//     if (info.file.status === 'done') {
//       message.success(`${info.file.name} file uploaded successfully`);
//     } else if (info.file.status === 'error') {
//       message.error(`${info.file.name} file upload failed.`);
//     }
//   },
// };





export function SetUp({setUpView, changeSetUpView, file, setFile, blob, setBlob}) {
  const [langName, setValue] = useState('');
  const [langDesc, setDesc] = useState('');


  const router = useRouter();
  // const [setUpView, changeSetUpView] = useState(true);

  function UploadFile() {


    function handleUpload(info) {
      if (info.file.status === "done") {
        setFile(info.file)
        message.success(`${info.file.name} file uploaded successfully`);
        const reader = new FileReader();
        reader.readAsDataURL(info.file.originFileObj);
        reader.onload = () => {
          const blob = new Blob([reader.result], { type: info.file.type });
          sendBlobToServer(blob);
          console.log("CHECK FOR FILE ", file)
          console.log("CHECK FOR BLOB ", blob)
          setBlob(blob)
        };
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    }

    async function sendBlobToServer(blob) {
      const formData = new FormData();
      formData.append("file", blob);
      // await uploadCoverImg(formData);
      // try {
      //   const response = await fetch("/upload", {
      //     method: "POST",
      //     body: formData,
      //   });
      //   const data = await response.json();
      //   console.log(data);
      // } catch (error) {
      //   console.error(error);
      // }
    }

    return (
      <Upload id="uploadImg" onChange={handleUpload}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    );
  }

  return (
      <div>
          <Layout>
            <Sider style={{ padding: '0 20px', background: 'white'}}>
              {/* Will need to add in the css */}
              <div id='progress-sidebar'>
                <Image src={ logo } alt='Logo placeholder' width={150} style={{'margin-bottom': '10px'}}/>
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
              <div id="first-page-setup">
                <p>Name Your Language</p>
                <Input id="langNameID" placeholder="Name Your Language" onChange={e => { setValue(e.currentTarget.value); }}/>
                <p>Description of Language</p>
                <>
                  <TextArea id="langDescID" rows={10} placeholder="Description of Language" onChange={e => { setDesc(e.currentTarget.value); }} maxLength={600} />
                </>

                {/* <p>Upload Custom Font</p> */}
                {/* Removed file props for now */}
                {/* <Upload > */}
                  {/* <Button icon={<UploadOutlined />}>Click to Upload</Button> */}
                {/* </Upload> */}

                <p>Upload Cover Image</p>
                {/* <Upload {...props}>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload> */}
                <UploadFile />
              </div>

              <div id="continue-button">
                <br></br>
                <Button
                  type="primary"
                  id="cont-button"
                  onClick={
                    () => {
                      if (!langName.trim().length) {
                        console.log("no name")
                        checkLangNameExists(langName)
                      } else {
                        checkLangNameExists(langName)
                        changeSetUpView(false);
                      }
                      // Response.Cache.SetCacheability(HttpCacheability.NoCache);
                      // Response.Cache.SetExpires(DateTime.Now);
                      // saveUserInfo({langName, langDesc})

                      // sessionStorage.langName = langName;
                      // sessionStorage.langDesc = langDesc;

                      // router.push('/setupFields')
                      // console.log("Language Name: ", sessionStorage.langName);
                      // console.log("Language Desc: ", sessionStorage.langName);
                    }}>
                    Continue
                 </Button>
              </div>
              <div id="name-error" style={{display: "none"}}>
                <p>Language Name must be filled!</p>
              </div>
            </Content>
          </Layout>
      </div>
  );
}

// Do not allow continue button to be clicked if no language name
function checkLangNameExists(langName) {
  if (!langName.trim().length) {
    let errormsg = document.getElementById("name-error")
    errormsg.style.display="block"
  } else {
    let errormsg = document.getElementById("name-error")
    errormsg.style.display="none"
  }
}