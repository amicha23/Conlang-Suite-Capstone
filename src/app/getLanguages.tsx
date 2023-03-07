// Send all languages created by a specific user to server
export default async function getUserLanguages() {
    // *** CHANGE UID TO NOT BE HARD CODED ***
    try {
        let responseJson = await fetch(`api/getUserLanguages`, {
             method: "GET"
        });
        const response = await responseJson.json();
        console.log("response: ", response)

        // Iterate through all returned dictionaries for the given user id
        // for(const key in response) {
        //     if (response.hasOwnProperty(key)) {
        //         console.log(response[key])
        //     }
        // }

        // Show repsonse as a string
        // console.log("LANGUAGES RESPONSE: " + JSON.stringify(response));
        // return response;
    } catch(err) {
        // *** ADD PROPER ERROR HANDLING ***
        console.error(err);
    }
}