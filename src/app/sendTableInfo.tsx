// Send all dictionary setup form fields to the server
import createSetup from '../pages/api/language/createSetup'

function init() {
  (document.getElementById('uploadImg') as HTMLInputElement).addEventListener('change', handleFileSelect, false);
}

function handleFileSelect(event : any) {
  const reader = new FileReader()
  reader.onload = handleFileLoad;
  reader.readAsText(event.target.files[0])
}

function handleFileLoad(event : any) {
  console.log(event);
  (document.getElementById('fileContent') as HTMLInputElement).textContent = event.target.result;
}

export default async function saveDictionaryFields(fieldView :any, file :any, blob :any) {
  // init();
  console.log("FILE IN SEND ", file)
  // Come back to this later -> is there a way to do this with no document elements?
  // let allInputs = document.querySelectorAll('input')
  let filter_data: any[] = []
  if (fieldView == true) {
    // Send Prefill + Custom fields
    let prefill = (document.getElementById("prefill") as HTMLInputElement).getElementsByTagName('input')
    Array.from(prefill).forEach(element => {
      if (element.value.trim().length) {
        filter_data.push(element.value)
      }
    });
    console.log("Prefill: ", filter_data)
  } else {
    // Send only Custom fields
    let customfill = (document.getElementById("custom") as HTMLInputElement).getElementsByTagName('input')
    Array.from(customfill).forEach(element => {
      if (element.value.trim().length) {
        filter_data.push(element.value)
      }
    });
    console.log("Customfill: ", filter_data)
  }

  let langName = (document.getElementById('langNameID') as HTMLInputElement).value
  let desc = (document.querySelectorAll('TextArea')[0] as HTMLInputElement).value
  let img = (document.getElementById('uploadImg') as HTMLInputElement).textContent
  console.log("IMG ", img)


  // let filter_data: any[] = []
  // allInputs.forEach(element => {
  //   filter_data.push(element.value)
  // });

  // let langName = filter_data[0];
  // let dict_data = filter_data.slice(3, filter_data.length);


  let data = {
    lanugage_name: langName,
    language_desc: desc,
    dictFields: filter_data,
    coverFile : file,
    coverBlob : blob
  }

  console.log("Final Request Data: ", data);

  let createSetupData = await createSetup({
    language_name: langName,
    language_desc: desc,
    dictFields: filter_data,
    uid : "OUnW07Np3VNFduMOCX1V1bvvsd22",
    coverFile : file,
    coverBlob : blob
  })

  if (createSetupData === "Success") {
    console.log('sent dictionary fields :>> ', createSetupData);
  } else {
    console.log("failed to create dictionary ", createSetupData)
  }

  // try {
  //   let responseJson = await fetch(`api/language/createSetup`, {
  //     method: "POST",
  //     body: JSON.stringify({
  //       language_name: langName,
  //       language_desc: desc,
  //       dictFields: filter_data
  //     })
  //   })
  //   console.log(await responseJson.json());
  //   console.log("Sent dictionary data to the database")
  // } catch(err) {
  //     // add proper error handling later
  //     console.error(err);
  // }

}