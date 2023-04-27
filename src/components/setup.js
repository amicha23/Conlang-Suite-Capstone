// Hold the Dictionary Setup Page 1 for naming the languge and uploads

import { Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import IPAKeyboard from "./IPAKeyboard";
import vowels from "../data/vowels.json";
import consonants from "../data/consonants.json";
const { Header, Footer, Sider, Content } = Layout;

// Router
import { useRouter } from "next/navigation";

// icons
import {
  CheckCircleOutlined,
  CheckCircleTwoTone,
  InfoCircleOutlined,
  InfoCircleTwoTone,
} from "@ant-design/icons";

// images
import Image from "next/image";
import logo from "../../public/langtimelogo.png";

const { TextArea } = Input;

export function SetUp({
  setUpView,
  changeSetUpView,
  file,
  setFile,
  blob,
  setBlob,
}) {
  const [langName, setValue] = useState("");
  const [langDesc, setDesc] = useState("");

  // const [showConsonantKeyboard, setShowConsonantKeyboard] = useState(false);
  // const [showVowelKeyboard, setShowVowelKeyboard] = useState(false);
  const [consonantList, setConsonantList] = useState([]);
  const [vowelList, setVowelList] = useState([]);

  function UploadFile() {
    function handleUpload(info) {
      if (info.file.status === "done") {
        setFile(info.file);
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
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
        <Sider style={{ padding: "0 20px", background: "white" }}>
          {/* Will need to add in the css */}
          <div id="progress-sidebar">
            <Image
              src={logo}
              alt="Logo placeholder"
              width={150}
              style={{ "margin-bottom": "10px" }}
            />
            <CheckCircleTwoTone />
            <p>Your Details</p>
            <InfoCircleTwoTone />
            <p>Dictionary Setup</p>
            <InfoCircleOutlined />
            <p>Dictionary Setup</p>
          </div>
        </Sider>
        <Content style={{ padding: "0 20px", background: "white" }}>
          <h1>Dictionary Setup</h1>
          <div id="first-page-setup">
            <p>Name Your Language</p>
            <Input
              id="langNameID"
              placeholder="Name Your Language"
              onChange={(e) => {
                setValue(e.currentTarget.value);
              }}
            />
            <p>Description of Language</p>
            <>
              <TextArea
                id="langDescID"
                rows={10}
                placeholder="Description of Language"
                onChange={(e) => {
                  setDesc(e.currentTarget.value);
                }}
                maxLength={600}
              />
            </>
            <p>Consonants of Language</p>
            <Input
              id="langConsonantsID"
              placeholder="Consonants of Language"
              value={consonantList.join("")}
              onChange={(e) => setConsonantList(e.target.value.split(""))}
            />

            {/* {showConsonantKeyboard && ( */}
            <IPAKeyboard
              list={consonants}
              soundList={consonantList}
              setSoundList={setConsonantList}
            />
            {/* )} */}
            <p>Vowels of Language</p>
            <Input
              id="langVowelsID"
              placeholder="Vowels of Language"
              value={vowelList.join("")}
              onChange={(e) => setVowelList(e.target.value.split(""))}
            />

            {/* {showVowelKeyboard && ( */}
            <IPAKeyboard
              list={vowels}
              soundList={vowelList}
              setSoundList={setVowelList}
            />
            {/* )} */}

            <p>Upload Cover Image</p>
            <UploadFile />
          </div>

          <div id="continue-button">
            <br></br>
            <Button
              type="primary"
              id="cont-button"
              onClick={() => {
                if (!langName.trim().length) {
                  console.log("no name");
                  checkLangNameExists(langName);
                } else {
                  checkLangNameExists(langName);
                  changeSetUpView(false);
                }
              }}
            >
              Continue
            </Button>
          </div>
          <div id="name-error" style={{ display: "none" }}>
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
    let errormsg = document.getElementById("name-error");
    errormsg.style.display = "block";
  } else {
    let errormsg = document.getElementById("name-error");
    errormsg.style.display = "none";
  }
}
