import { Button, Collapse } from 'antd';

const Panel = Collapse.Panel;

// returns all languages in the form of collapsible buttons
export default async function getUserLanguages() {
    // *** CHANGE UID TO NOT BE HARD CODED ***
    try {
        let responseJson = await fetch(`api/getUserLanguages`, {
             method: "GET"
        });
        var response = await responseJson.json();
        console.log("RESPONSE", response);
        // console.log("BIG TEST: ", response[0].uid);

        const numLanguages = response.length;
        // *** ALL OF THIS ANTD STUFF CANNOT BE FOUND WHEN INJECTED. MUST MAKE COLLAPSIBLE MANUALLY ***
        let html = ""
        for (let i = 0; i < numLanguages; i++) {
            html = html + `<Collapse>` + 
            `<Panel header=\"` + response[i].name + `\" key=\"` + i + `\">` +
            `<Button>Phonology</Button>` +
            `<Button>Orthography</Button>` +
            `<Button>Language Specific</Button>` +
            `<Button>Settings</Button>` +
            `</Panel>` +
            `</Collapse>\n`;
        }

        console.log('HTML: ', html);
        (document.getElementById('buttons') as HTMLElement).innerHTML = html; 
    } catch(err) {
        // *** ADD PROPER ERROR HANDLING ***
        console.error(err);
    }
}