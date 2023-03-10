// Send all dictionary setup form fields to the server

export default async function saveDictionaryFields(fieldView :any) {

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


  // let filter_data: any[] = []
  // allInputs.forEach(element => {
  //   filter_data.push(element.value)
  // });

  // let langName = filter_data[0];
  // let dict_data = filter_data.slice(3, filter_data.length);


  let data = {
    lanugage_name: langName,
    language_desc: desc,
    dictFields: filter_data
  }

  console.log("Final Request Data: ", data);

  try {
    let responseJson = await fetch(`api/getUserLang`, {
      method: "POST",
      body: JSON.stringify({
        language_name: langName,
        language_desc: desc,
        dictFields: filter_data
      })
    })
    console.log(await responseJson.json());
    console.log("Sent dictionary data to the database")
  } catch(err) {
      // add proper error handling later
      console.error(err);
  }

}