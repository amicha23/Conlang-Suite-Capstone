// Send dictionary setup page 1 to the server: language info, uploads etc.

export default async function saveLangInfo({langName, langDesc} :any) {
  console.log(langName);
  console.log(langDesc);

  //Do an ajax call to save dictionary pop up info from user into the database
  try {
    let responseJson = await fetch(`api/createSetup`, {
      method: "POST",
      body: JSON.stringify(
        {"language_name": langName,
          "language_desc": langDesc
        })
//Do an ajax call )
    });
    console.log(await responseJson.json());
  } catch(err) {
    // add proper error handling later
    console.error(err);
  }
}

