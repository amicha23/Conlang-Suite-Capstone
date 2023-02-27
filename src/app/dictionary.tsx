export async function init(){
  // await loadIdentity();
  // loadUserInfo();
  // saveUserInfo();
}

export default async function saveUserInfo({langName, langDesc} :any){
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


  //***                  IGNORE BELOW FOR NOW               *****/

  //Name
  // if (document.getElementById("langNameID") !== null) {
  //   let lang_name = document.getElementById("langNameID").value;
  //   console.log(lang_name)
  // }

  // Description
  // let lang_desc = document.getElementById(langDescID).value;

  // Pre-filled Forms
  // let o_form = document.getElementById(oFormID).value;
  // let c_form = document.getElementById(cFormID).value;
  // let definition = document.getElementById(defID).value;
  // let pos = document.getElementById(partofspeechID).value;
  // let phoen_form = document.getElementById(phoenID).value;

  // Additional custom fields -> will need to check for these fields

  // Options
  // let quick_view = document.getElementById(quickViewID).value;
  // let IPA_Chart = document.getElementById(ipaID).value;
  // let table_view = document.getElementById(tableViewID).value;
  // let find_replace = document.getElementById(findReplaceID).value;
  // let other = document.getElementById(otherID).value;

  // let responseJson = await fetch(`api/hello`, {
  //     method: "POST",
  //     body: {language_name: lang_name,
  //            language_desc: lang_desc,
  //            orthographic_form: o_form,
  //            citation_form: c_form,
  //            definition: definition,
  //            part_of_speech: pos,
  //            phonetic_form: phoen_form,

  //           }
  // })

  return {
    props: {}, // will be passed to the page component as props
  }
  // loadUserInfo()
}