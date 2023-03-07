// Send all languages created by a specific user to server
export default async function getUserLanguages() {
    // *** CHANGE UID TO NOT BE HARD CODED ***
    try {
        let responseJson = await fetch('api/getUserLanguages', { method: "GET" });
        const response = await responseJson.json();
        console.log("LANGUAGES RESPONSE: " + response);
        return response;
    } catch(err) {
        // *** ADD PROPER ERROR HANDLING ***
        console.error(err);
    }
}