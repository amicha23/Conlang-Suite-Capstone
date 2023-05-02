// Hold the Dictionary Setup Page 1 for naming the languge and uploads

import { Input } from 'antd';
import { UploadOutlined, SettingTwoTone, EditOutlined, LeftOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, message, Upload, Modal, Popconfirm, Image } from 'antd';
import React, { useEffect, useState } from "react";
import { Layout } from 'antd';
import getLangData from '../pages/api/language/getLangData';
import IPAKeyboard from "./IPAKeyboard";
import vowels from "../data/vowels.json";
import consonants from "../data/consonants.json";
import Router from 'next/router';
const { Header, Footer, Sider, Content } = Layout;

// import '../app/page.module.css';
import styles from '../app/page.module.css'

import saveEditDictionaryInfo from '../pages/api/language/sendEditInfo';

// Router
import { useRouter } from 'next/navigation';

// icons
import { CheckCircleOutlined, CheckCircleTwoTone, InfoCircleOutlined, InfoCircleTwoTone } from '@ant-design/icons';

// images
// import Image from 'next/image';
import logo from '../../public/langtimelogo.png';
import uploadCoverImg from '../pages/api/language/uploadLangImg'
import updateCoverImg from '../pages/api/language/updateCoverImg'

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









export function EditDictionary({ data, setData, queryParam, queryName, setUpView, changeSetUpView, file, setFile, blob, setBlob }) {
  const [langName, setValue] = useState(data['lang']['name']);
  const [langDesc, setDesc] = useState(data['lang']['description']);
  // const [data, setData] = useState(null);
  const [consonantList, setConsonantList] = useState([data['lang']['consonants']]);
  const [vowelList, setVowelList] = useState([data['lang']['vowels']]);
  const [coverImg, setCoverImg] = useState(data['lang']['coverURL']);


  const router = useRouter();
  // const [setUpView, changeSetUpView] = useState(true);

  // Implement file upload later
  const props = {
    name: 'file',
    onChange(info) {
      console.log(props.name, props.action)
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

  function UploadFile() {
    function handleUpload(info) {
      if (info.file.status === "done") {
        setFile(info.file)
        message.success(`${info.file.name} file uploaded successfully`);
        const reader = new FileReader();
        reader.readAsDataURL(info.file.originFileObj);
        reader.onload = async () => {
          const blob = new Blob([reader.result], { type: info.file.type });
          sendBlobToServer(blob);
          console.log("CHECK FOR FILE ", info.file)
          console.log("CHECK FOR BLOB ", blob)
          setBlob(blob)
          let newCoverURL = await updateCoverImg({ "lid": queryParam, "coverImg": info.file.originFileObj })
          console.log("Set new coverURL: ", newCoverURL)
          setCoverImg(newCoverURL);
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


    // const [visible, setVisible] = useState(false);
    // const toggle = () => setVisible(prev => !prev);
    return (
      <div style={{display: 'inline-block', marginRight: '0.5em'}}>
        {/* <Modal okText="Yes" cancelText="No" open={visible} onCancel={toggle}>
          Are you sure delete this task?
        </Modal> */}
        <Upload {...props} id="uploadImg" onChange={handleUpload} >
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
  // Discard changes, return to dashboard
  const saveConfirm = (e) => {
    console.log("Save these edits:")
    if (!langName.trim().length) {
      console.log("no name")
      checkLangNameExists(langName)
    } else {
      checkLangNameExists(langName)
      saveEditDictionaryInfo({'lid': queryParam, 'coverURL': coverImg, 'newLangName': langName, 'newLangDesc': langDesc, 'consonants': [consonantList].join(""), 'vowels': [vowelList].join("")})
      // Router.push({pathname: '/dashboard'})
    }

  };

  // Discard changes, return to dashboard
  const cancelConfirm = (e) => {
    Router.push({ pathname: '/dashboard' })
  };

  const handleDelImg = async (e) => {
    setCoverImg('')
    let newCoverURL = await updateCoverImg({'lid': queryParam, 'coverImg': null})
    setCoverImg(newCoverURL)
  }

  if (data) {
    // setValue(data.lang.name)
    console.log("DATA ", data)
    console.log(data.lang.consonants)
    // setDesc(data.lang.description)

    return (
      <div>
        <Layout>
          <Sider style={{ padding: '0 20px', background: 'white' }}>
            {/* Will need to add in the css */}
            <div id='progress-sidebar'>
              {/* <Image src={ logo } alt='Logo placeholder' width={150} style={{'margin-bottom': '10px'}}/> */}
              <p><b>{data.lang.name}</b></p>
              <div style={{ marginBottom: '1.5rem' }}>
                <EditOutlined style={{ display: 'inline', marginRight: '0.5rem' }} />
                <p style={{ display: 'inline' }}>Edit Dictionary</p>
              </div>
              <div>
                <SettingTwoTone style={{ display: 'inline', marginRight: '0.5rem' }} />
                <p style={{ display: 'inline' }}>Settings</p>
              </div>

            </div>
          </Sider>
          <Content style={{ padding: '0 20px', background: 'white' }}>
            <h1>Dictionary Settings</h1>
            <div id="first-page-setup">
              <p>Name Your Language</p>
              <Input id="langNameID" placeholder="Name Your Language" defaultValue={data.lang.name} onChange={e => { setValue(e.currentTarget.value); }} />
              <p>Description of Language</p>
              <>
                <TextArea id="langDescID" rows={10} placeholder="Description of Language" defaultValue={langDesc} onChange={e => { setDesc(e.currentTarget.value); }} maxLength={600} />
              </>

              <p>Consonants of Language</p>
              <Input
                id="langConsonantsID"
                placeholder="Consonants of Language"
                value={[consonantList].join("")}
                onChange={(e) => setConsonantList(e.target.value)}
              />

              {/* {showConsonantKeyboard && ( */}
              <IPAKeyboard
                list={consonants}
                soundList={consonantList}
                setSoundList={setConsonantList}
                curList={consonantList}
                noDup={true}
              />
              {/* )} */}
              <p>Vowels of Language</p>
              <Input
                id="langVowelsID"
                placeholder="Vowels of Language"
                value={vowelList}
                onChange={(e) => setVowelList(e.target.value)}
              />

              {/* {showVowelKeyboard && ( */}
              <IPAKeyboard
                list={vowels}
                soundList={vowelList}
                setSoundList={setVowelList}
                curList={vowelList}
                noDup={true}
              />

              {/* <p>Upload Custom Font</p> */}
              {/* Removed file props for now */}
              {/* <Upload > */}
              {/* <Button icon={<UploadOutlined />}>Click to Upload</Button> */}
              {/* </Upload> */}
              <br></br>
              <Image
                width={200}
                height={200}
                src={coverImg}
                fallback="data:image/png;base64,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"
              />


              <p id='uploadCover'>Upload Cover Image</p>
              {/* <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload> */}
              <div>
                <UploadFile style={{display: 'inline-block', marginRight: '20px'}}/>
                <Button icon={<DeleteOutlined/>} style={{display: 'inline-block', marginRight: '20px'}} onClick={handleDelImg}>Delete</Button>
              </div>
            </div>

            <div id="buttons" className={styles.buttons}>

              <br></br>
              <div id="back-btn" className={styles.buttonsChild} style={{ display: setUpView ? "none" : "block" }}>
                <LeftOutlined onClick={() => {
                  changeSetUpView(true);
                }} />
              </div>
              <div id="create-dict-button">
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
                <Popconfirm
                  title="Are you sure you want to save these changes?"
                  description="This action cannot be undone"
                  onConfirm={saveConfirm}
                  okText="Yes"
                >
                  <Button
                    type="primary"
                    id="cont-button"
                    onClick={
                      () => {
                        console.log("FILE: ", file)
                        console.log("Blob: ", blob)

                        // saveDictionaryFields(fieldView, file, blob);
                      }}>
                    Save
                  </Button>
                </Popconfirm>
              </div>
            </div>
            <div id="name-error" style={{ display: "none" }}>
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
    errormsg.style.display = "block"
  } else {
    let errormsg = document.getElementById("name-error")
    errormsg.style.display = "none"
  }
}