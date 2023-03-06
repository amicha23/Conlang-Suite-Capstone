// Send all dictionary setup form fields to the server

export default async function saveDictionaryFields() {

  // Come back to this later -> is there a way to do this with no document elements?
  let allInputs = document.querySelectorAll('input')
  let desc = (document.querySelectorAll('TextArea')[0] as HTMLInputElement).value


  let filter_data: any[] = []
  allInputs.forEach(element => {
    filter_data.push(element.value)
  });

  let langName = filter_data[0];
  let dict_data = filter_data.slice(3, allInputs.length);


  let data = {
    lanugage_name: langName,
    language_desc: desc,
    dictFields: dict_data
  }

  console.log("Final Request Data: ", data);

  try {
    let responseJson = await fetch(`api/createSetup`, {
      method: "POST",
      body: JSON.stringify({
        language_name: langName,
        language_desc: desc,
        dictFields: dict_data
      })
    })
    console.log(await responseJson.json());
    console.log("Sent dictionary data to the database")
  } catch(err) {
      // add proper error handling later
      console.error(err);
  }

}