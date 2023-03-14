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
        // console.log("BIG TEST: ", response[0].uid);
        let langIDS = response.languageIDs.split(',')
        let langNames = response.languageNames.split(',')
        console.log("Lang IDs: ", response.languageIDs.split(','))
        console.log("Lang Names: ", response.languageNames.split(','))

        const numLanguages = langIDS.length;
        // *** ALL OF THIS ANTD STUFF CANNOT BE FOUND WHEN INJECTED. MUST MAKE COLLAPSIBLE MANUALLY ***
        let html = ""
        for (let i = 0; i < langIDS.length; i++) {
            html = html +
            `<Collapse>` +
            `<Panel header=\"` + langNames[i] + `\" key=\"` + i + `\">` +
            `<Button id=` + langIDS[i] + `>` +langNames[i]+ `</Button>` + `<br>` +
            `<Button>Phonology</Button>` +
            `<Button>Orthography</Button>` +
            `<Button>Language Specific</Button>` +
            `<Button>Settings</Button>` +
            `</Panel>` + `<br>`+
            `</Collapse>\n` + `<br>`;


        }
        console.log('HTML: ', html);
        (document.getElementById('buttons') as HTMLElement).innerHTML = html;

        // add onclick to buttons to select which dictionary to view by language name
        for (let i = 0; i < langIDS.length; i++) {
            console.log("here:",langIDS[i].replace(/\s/g, '')) // for some reason theres a space in the language id, regex to remove
            let currentButton = (document.getElementById(langIDS[i].replace(/\s/g, '')) as HTMLElement);

            currentButton.addEventListener("click", function(){ saveLangInfo(langIDS[i].replace(/\s/g, '')) });
        }
        return
    } catch(err) {
        // *** ADD PROPER ERROR HANDLING ***
        console.error(err);
    }
}