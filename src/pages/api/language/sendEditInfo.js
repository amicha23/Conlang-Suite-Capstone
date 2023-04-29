// Send all dictionary setup form fields to the server
// import createSetup from '../pages/api/language/createSetup'
import updateLangNameAndDesc from './updateLangInfo';

function init() {
  (document.getElementById('uploadImg')).addEventListener('change', handleFileSelect, false);
}

function handleFileSelect(event) {
  const reader = new FileReader()
  reader.onload = handleFileLoad;
  reader.readAsText(event.target.files[0])
}

function handleFileLoad(event) {
  console.log(event);
  (document.getElementById('fileContent')).textContent = event.target.result;
}

export default async function saveEditDictionaryInfo(fieldView, file, blob, lid) {
  // init();
  console.log("FILE IN SEND ", file)
  // Come back to this later -> is there a way to do this with no document elements?
  // let allInputs = document.querySelectorAll('input')
  let filter_data = []
  if (fieldView == true) {
    // Send Prefill + Custom fields
    let prefill = (document.getElementById("prefill")).getElementsByTagName('input')
    Array.from(prefill).forEach(element => {
      if (element.value.trim().length) {
        filter_data.push(element.value)
      }
    });
    console.log("Prefill: ", filter_data)
  } else {
    // Send only Custom fields
    let customfill = (document.getElementById("custom")).getElementsByTagName('input')
    Array.from(customfill).forEach(element => {
      if (element.value.trim().length) {
        filter_data.push(element.value)
      }
    });
    console.log("Customfill: ", filter_data)
  }

  let langName = (document.getElementById('langNameID')).value
  let desc = (document.querySelectorAll('TextArea')[0]).value
  let img = (document.getElementById('uploadImg')).textContent
  let consonantList = (document.getElementById('langConsonantsID')).value
  let vowelList = (document.getElementById('langVowelsID')).value
  console.log("IMG ", img)
  console.log('consonantList :>> ', consonantList.split(""));
  console.log('vowelList :>> ', vowelList.split(""));


  // let filter_data: any[] = []
  // allInputs.forEach(element => {
  //   filter_data.push(element.value)
  // });

  // let langName = filter_data[0];
  // let dict_data = filter_data.slice(3, filter_data.length);


  let data = {
    lid : lid,
    newLangName: langName,
    newLangDesc: desc,
    newDictFields: filter_data,
    uid : "OUnW07Np3VNFduMOCX1V1bvvsd22",
    coverFile : file,
    coverBlob : blob,
    vowels: vowelList,
    consonants: consonantList
  }

  console.log("Final Request Data: ", data);

  let editDictionaryData = await updateLangNameAndDesc(data)

  if (editDictionaryData === "Success") {
    console.log('sent dictionary edits :>> ', editDictionaryData);
  } else {
    console.log("failed to edit dictionary ", editDictionaryData)
  }
}