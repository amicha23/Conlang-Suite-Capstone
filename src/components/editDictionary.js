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

import { update, ref, get, remove, child, push, onValue, off, on, query, set } from "firebase/database";
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
  // const [coverImg, setCoverImg] = useState(data['lang']['coverURL']);


  const router = useRouter();
  // const [setUpView, changeSetUpView] = useState(true);


  // Discard changes, return to dashboard
  const saveConfirm = (e) => {
    console.log("Save these edits:")
    if (!langName.trim().length) {
      console.log("no name")
      checkLangNameExists(langName)
    } else {
      checkLangNameExists(langName)
      saveEditDictionaryInfo({'lid': queryParam, 'newLangName': langName, 'newLangDesc': langDesc, 'consonants': [consonantList].join(""), 'vowels': [vowelList].join("")})
      window.open('/dashboard', `_self`);
    }

  };

  // Discard changes, return to dashboard
  const cancelConfirm = (e) => {
    window.open('/dashboard', `_self`);
  };


  if (data) {

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

              {/* commented out upload for deploy */}

              {/* <Image
                width={200}
                height={200}
                src={coverImg}
              />
              <p id='uploadCover'>Upload Cover Image</p>
              <div>
                <UploadFile style={{display: 'inline-block', marginRight: '20px'}}/>
                <Button id="del-image" icon={<DeleteOutlined/>} style={{display: 'inline-block', marginRight: '20px'}} onClick={(e) => handleDelImg(e)}>Delete</Button>
              </div>
              <div id="img-error" style={{display: "none"}}>
                <p>Upload File must be jpg or png!</p>
              </div> */}
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
                    id="cont-button">
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

// Disable cancel upload image on default image
function checkDefaultImage(e) {
  if (coverImg.includes("default.jpg") || coverImg === undefined) {
    e.disabled = true;
  } else {
    e.disabled = false;
  }
}