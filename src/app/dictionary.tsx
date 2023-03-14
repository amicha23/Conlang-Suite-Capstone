// Send dictionary setup page 1 to the server: language info, uploads etc.
// Components
import ReactDOM from 'react-dom';
import DictionaryTable from '../components/dictTable';


export default async function saveLangInfo(langID :any) {
  console.log("Get fields for: ", langID);
  // console.log(langDesc);

  //Do an ajax call to save dictionary pop up info from user into the database
  try {
    let responseJson = await fetch(`api/word/getWords`, {
      method: "POST",
      body: JSON.stringify(
        {"lid": langID
        })
//Do an ajax call )
    });
    console.log("response dictionary: ", await responseJson.json());
    console.log(document.getElementById("dict-table"))
    // ReactDOM.render(<DictionaryTable/>, document.getElementById("dict-table"))

    // let test = <p></p>
    //     (document.getElementById("dict-table") as HTMLElement).appendChild(test)
    // ReactDOM.render(<DictionaryTable /> , document.getElementById('dict-table'));
    return
  } catch(err) {
    // add proper error handling later
    console.error(err);
  }
}
