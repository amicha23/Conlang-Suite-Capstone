// Send user info to the server: email, password, or signin with google

export async function saveUserInfo(userEmail :any, userPassword :any) {
    console.log("email",userEmail);
    console.log(userPassword);
    
    //Do an ajax call to save user info into the database and authentication
    try {
      let responseJson = await fetch(`api/getAuth`, {
        method: "POST",
        body: JSON.stringify(
          {"user_email": userEmail,
            "user_password": userPassword
          })
  //Do an ajax call )
      });
      console.log(await responseJson.json());
    } catch(err) {
      // add proper error handling later
      console.error(err);
    }
  }
  
  