import { Button, Collapse } from 'antd';

import saveLangInfo from '../app/dictionary'

const Panel = Collapse.Panel;

// returns all languages in the form of collapsible buttons
export default async function getUserLanguages() {
    // *** CHANGE UID TO NOT BE HARD CODED ***
    try {
        let responseJson = await fetch(`api/getUserLang`, {
             method: "GET"
        });
        var response = await responseJson.json();
        console.log("RESPONSE", response);
        return response;
        // console.log("BIG TEST: ", response[0].uid);
        // let langIDS = response.languageIDs.split(',')
        // let langNames = response.languageNames.split(',')
        // console.log("Lang IDs: ", response.languageIDs.split(','))
        // console.log("Lang Names: ", response.languageNames.split(','))

        // const numLanguages = langIDS.length;
        // // *** CREATE ONCLICK METHODS FOR BUTTONS
        // let buttonList = [];
        // for (let i = 0; i < langIDS.length; i++) {
        //     buttonList.push(
        //     <Collapse>
        //         <Panel id={langIDS[i]} header={langNames[i]} key={i}>
        //             <Button>Phonology</Button>
        //             <Button>Orthography</Button>
        //             <Button>Language Specific</Button>
        //             <Button>Settings</Button>
        //         </Panel>
        //     </Collapse>
        //     );
        // }
        // console.log("BUTTON LIST:", buttonList);
        // return buttonList;

        // *** OLD CODE ***
        // let html = ""
        // for (let i = 0; i < langIDS.length; i++) {
        //     html = html +
        //     `<button id=${langIDS[i]} type="button" class="collapsible">${langNames[i]}</button>
        //     <divclass="content">
        //     <button>phonology</button>
        //     <button>Orthography</button>
        //     <button>Language Specific</button>
        //     <button>Settings</button><br>`
        // }
        // console.log('HTML: ', html);
        // (document.getElementById('buttons') as HTMLElement).innerHTML = html;

        // add onclick to buttons to select which dictionary to view by language name
        // for (let i = 0; i < langIDS.length; i++) {
        //     console.log("here:",langIDS[i].replace(/\s/g, '')) // for some reason theres a space in the language id, regex to remove
        //     let currentButton = (document.getElementById(langIDS[i].replace(/\s/g, '')) as HTMLElement);

        //     currentButton.addEventListener("click", function(){ saveLangInfo(langIDS[i].replace(/\s/g, '')) });
        // }
    } catch(err) {
        // *** ADD PROPER ERROR HANDLING ***
        console.error(err);
    }
}