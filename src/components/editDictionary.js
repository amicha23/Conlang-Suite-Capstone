// Hold the Dictionary Setup Page 1 for naming the languge and uploads

import { Input } from 'antd';
import { UploadOutlined, SettingTwoTone, EditOutlined } from '@ant-design/icons';
import { Button, message, Upload, Modal } from 'antd';
import React, { useEffect, useState } from "react";
import { Layout } from 'antd';
import getLangData from '../pages/api/language/getLangData';
const { Header, Footer, Sider, Content } = Layout;

// Router
import { useRouter } from 'next/navigation';

// icons
import { CheckCircleOutlined, CheckCircleTwoTone, InfoCircleOutlined, InfoCircleTwoTone } from '@ant-design/icons';

// images
import Image from 'next/image';
import logo from '../../public/langtimelogo.png';
import uploadCoverImg from '../pages/api/language/uploadLangImg'


//firebase

import { update, ref, get, remove, child, push, onValue, off, on, query } from "firebase/database";
import { db } from "../../firebaseConfig/firebaseAdmin.js";
import firebase from 'firebase/app';

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





export function EditDictionary({data, setData, queryParam, queryName, setUpView, changeSetUpView, file, setFile, blob, setBlob}) {
  const [langName, setValue] = useState(queryName);
  const [langDesc, setDesc] = useState(data['lang']['description']);
  // const [data, setData] = useState(null);


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
          console.log("CHECK FOR FILE ", info.file)
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

          // Discard changes, return to dashboard
          const cancelConfirm = (e) => {
            console.log("Do not remove image")
          };


    const [visible, setVisible] = useState(false);
    const toggle = () => setVisible(prev => !prev);
    return (
      <div>
        <Modal okText="Yes" cancelText="No" open={visible} onCancel={toggle}>
          Are you sure delete this task?
        </Modal>
        <Upload id="uploadImg" onChange={handleUpload} onRemove={toggle}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </div>
    );
  }



  // useEffect(() => {

  //   if (queryParam) {
  //     fetchData();
  //   }
  // }, [queryParam]);


  // async function fetchData() {
  //   let getLandData = await getLangData({'lid' : queryParam});

  //   if (typeof(getLandData) !== String ) {
  //     console.log('fetched data', getLandData);
  //     setData(getLandData)
  //     setValue(queryName)
  //     setDesc(getLandData['lang'].description)
  //     // document.getElementById("langNameID").value = "gi"
  //   } else {
  //     console.log("failed to fetch data ", getLandData)
  //   }
  //   // setValue('hi')

  // }
  if (data) {
    // setValue(data.lang.name)
    console.log("DATA ", data)
    // setDesc(data.lang.description)

    return (
        <div>
            <Layout>
              <Sider style={{ padding: '0 20px', background: 'white'}}>
                {/* Will need to add in the css */}
                <div id='progress-sidebar'>
                  {/* <Image src={ logo } alt='Logo placeholder' width={150} style={{'margin-bottom': '10px'}}/> */}
                  <p><b>{queryName}</b></p>
                  <div style={{marginBottom:'1.5rem'}}>
                    <SettingTwoTone style={{display: 'inline', marginRight:'0.5rem'}} />
                    <p style={{display: 'inline'}}>Settings</p>
                  </div>
                  <div>
                    <EditOutlined style={{display: 'inline', marginRight:'0.5rem'}} />
                    <p style={{display: 'inline'}}>Edit Dictionary</p>
                  </div>

                </div>
              </Sider>
              <Content style={{ padding: '0 20px', background: 'white'}}>
                <h1>Dictionary Settings</h1>
                <div id="first-page-setup">
                  <p>Name Your Language</p>
                  <Input id="langNameID" placeholder="Name Your Language" defaultValue={queryName} onChange={e => { setValue(e.currentTarget.value); }}/>
                  <p>Description of Language</p>
                  <>
                    <TextArea id="langDescID" rows={10} placeholder="Description of Language" defaultValue={langDesc} onChange={e => { setDesc(e.currentTarget.value); }} maxLength={600} />
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