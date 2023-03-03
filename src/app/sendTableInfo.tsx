// Send all dictionary setup form fields to the server

export default async function saveDictionaryFields() {

  // Come back to this later -> is there a way to do this with no document elements?
  let test = document.querySelectorAll('input')
  let data: any[] = []
  test.forEach(element => {
    data.push(element.value)
  });
  console.log("Final Request Data: ", data);

  try {
    let responseJson = await fetch(`api/createSetup`, {
      method: "POST",
      body: JSON.stringify({data})
    })
    console.log(await responseJson.json());
  } catch(err) {
      // add proper error handling later
      console.error(err);
  }

}