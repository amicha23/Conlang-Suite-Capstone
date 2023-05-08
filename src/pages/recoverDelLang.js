import React, { useState, useEffect } from "react";
import { Button, Table, message, Modal } from "antd";

import getUserDelLang from "./api/user/getUserDelLang";
import recoverLang from "./api/language/recoverLang.js";

const RecoverDelLang = () => {
  const [deletedLanguages, setDeletedLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchDeletedLanguages();
  }, []);

  const fetchDeletedLanguages = async () => {
    try {
      const data = await getUserDelLang();
      if (data !== "No data available") {
        const languages = Object.keys(data).map((key) => {
          let langData = data[key].langData;
          langData["id"] = key;
          return langData;
        });
        setDeletedLanguages(languages);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRecoverLanguage = async (languageId) => {
    console.log("languageId :>> ", languageId);
    const recoverRes = await recoverLang(languageId);

    if (recoverRes === "Success") {
      message.success("Language recovered successfully");
      fetchDeletedLanguages();
    } else {
      console.log("recoverRes :>> ", recoverRes);
      message.error("Failed to recover language.");
    }
  };

  const columns = [
    {
      title: "Language Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <a
          href="#"
          onClick={() => {
            setSelectedLanguage(record);
            setIsModalVisible(true);
          }}
        >
          {text}
        </a>
      ),
    },
    {
      title: "Create Time",
      dataIndex: "createTime",
      key: "createTime",
    },
    {
      title: "Delete Time",
      dataIndex: "deleteTime",
      key: "deleteTime",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button type="primary" onClick={() => handleRecoverLanguage(record.id)}>
          Recover Language
        </Button>
      ),
    },
  ];

  const backToDashboard = () => {
    window.open(`/dashboard`, `_self`);
  };

  return (
    <div style={{ margin: "20px" }}>
      <h2 style={{ textAlign: "center" }}>Deleted Languages</h2>
      <p style={{ textAlign: "center" }}>Languages deleted in 30 days</p>
      {deletedLanguages.length > 0 ? (
        <Table dataSource={deletedLanguages} columns={columns} />
      ) : (
        <p style={{ textAlign: "center" }}>No deleted languages found.</p>
      )}

      <Modal
        title="Language Details"
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
      >
        {selectedLanguage && (
          <>
            <p>
              <strong>Name:</strong> {selectedLanguage.name}
            </p>
            <p>
              <strong>Description:</strong> {selectedLanguage.description}
            </p>
            <p>
              <strong>Consonants:</strong> {selectedLanguage.consonants}
            </p>
            <p>
              <strong>Vowels:</strong> {selectedLanguage.vowels}
            </p>
            <p>
              <strong>Numbers of word:</strong>{" "}
              {Object.keys(Object.values(selectedLanguage.dict)[0]).length - 1}
            </p>
          </>
        )}
      </Modal>
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
    </div>
  );

  //   return (
  //     <div>
  //       <h2>Deleted Languages</h2>
  //       <p>Languages deleted in 30 days</p>
  //       {deletedLanguages.length > 0 ? (
  //         <Table dataSource={deletedLanguages} columns={columns} />
  //       ) : (
  //         <p>No deleted languages found.</p>
  //       )}

  //       <Modal
  //         title="Language Details"
  //         visible={isModalVisible}
  //         footer={null}
  //         onCancel={() => setIsModalVisible(false)}
  //       >
  //         {selectedLanguage && (
  //           <>
  //             <p>
  //               <strong>Name:</strong> {selectedLanguage.name}
  //             </p>
  //             <p>
  //               <strong>Description:</strong> {selectedLanguage.description}
  //             </p>
  //             <p>
  //               <strong>Consonants:</strong> {selectedLanguage.consonants}
  //             </p>
  //             <p>
  //               <strong>Vowels:</strong> {selectedLanguage.vowels}
  //             </p>
  //             <p>
  //               <strong>Numbers of word:</strong>{" "}
  //               {Object.keys(Object.values(selectedLanguage.dict)[0]).length - 1}
  //             </p>
  //           </>
  //         )}
  //       </Modal>
  //       <Button onClick={backToDashboard}> Back to dashboard </Button>
  //     </div>
  //   );
};

export default RecoverDelLang;
