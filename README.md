# Conlang-Suite-Capstone

## Goal

We want to create a software to organize the language creation process. Ideally, the software will allow a conlanger to build dictionaries, create sound changes, and store information all in one cloud-scalable application.

Some of the main functions our application will include to address disorganization in the conlanging process:

-A desktop program (ideally Mac-compatible) that allows for the storing and creation of a language.

-A “database” storage system, where all material is stored in some recognizable format (be it csv or a MySQL-style database). Something that can be used by some other software down the line, unlike FileMakerPro (an early conlang-style suite was built in FMP, and it produces files that only FMP can use, which rendered all of it ultimately useless).

-Ability to print reports in various formats (.pdf, .doc, .txt, etc.) from the database, and to modify those reports. (For example: We sometimes put together lists of common phrases for actors and production. It’d be nice to call up that list with the press of a button and have it print to a .pdf in a way that looks nice.)

-Ability to create custom dictionary entries.

## Contact Information
Pentalingo:

Alyssa Vo (avo4@uw.edu)

Jessie Zeng (lingrz2@uw.edu)

Sang-Won Yu (sangyu01@uw.edu)

Andrew Michaels (amicha@uw.edu) 

Jo Jo Gong (ugong@uw.edu)

Conlangers:

Bryan T. Ahaneku Chucha (btac3ix3@uw.edu)

Gavin Hyppa (ghyppa@uw.edu)

Lance Haugenm (lance.haugenm@gmail.com)

Wintana Eyob (weyob@uw.edu)

Samuel Dwayne Lucia (slucia2@uw.edu)


## Table of Contents:
- [Firebase Database](#Firebase-Database)
- [Registration](#Registration)
- [Forgot Password](#Forgot-Password)
- [Create Dictionary](#Create-Dictionary)
- [Sidebar](#Sidebar)
- [Dashboard](#Dashboard)
- [Dictionary Table](#Dictionary-Table)
- [Save To CSV](#Save-to-CSV)
- [Dictionary Settings](#Dictionary-Settings)
- [Language Statistics](#Language-Statistics)
- [Recover Deleted Languages](#Recover-Deleted-Languages)
- [Redirecting](#Redirecting)
- [Ant Design](#Ant-Design)
- [Code Environment](#Code-Environment)
- [Localhost](#Localhost)
- [Deploy](#Deploy)
- [Localhost](#Localhost)
- [Extra Features & Final Notes](#Extra)

<!-- headings -->
<a id="Firebase-Database"></a>
### Firebase Database
*The Firebase Database is the core storage and user authorization system of LangTime engine. The project utilizes a realtime database and storage.*

- Realtime Database
  - deleteRecords
    - Stores all deleted languages for 30 days referenced by language ID.
  - languages
      - Stores all languages that are referenced by language ID. Each language includes a name, description, user ID, consonants, vowels, create time, cover URL, and dictionary. The dictionary comprises header names followed by entries referenced by row IDs.
  - users
    - Stores username and all user created language IDs
- Storage
  - Stores all language cover images referenced by language ID in ‘coverImg/’ folder


  **NOTE**:
  - reference the firebaseConfig/firebaseAdmin.js file to reference database, authorization, and storage.
  - cover image usage was removed in the final iteration of the project (see Extra Features & Final Notes)

<a id="Registration"></a>
### Registration
*The registration page allows a user to sign up for an account through our platform or with a Google account. The registration page is routed through the /register page.*

#### Files Involved:
../pages/register: the main page of registration that renders all sign up input fields, retrieving name, email, and password.

###### Makes API Calls to:
- *registerUser* from ‘src/app/user.tsx’: clicking ‘sign up’ saves user registration to Firebase database without a Google account, check if email and password fits the requirement.
- *googleLogin* from ‘src/app/user.tsx’: clicking ‘sign in with Google’ saves user registration to the Firebase database using a Google account.


<a id="Login"></a>
### Login
*The login page allows a user to log in to an account through our platform or with a Google account. Upon login, the user ID will be stored in session storage until the page is closed or the user logs out. The login page is routed through the /login page.*

#### Files Involved:
../pages/login: the main page of login that renders all login input fields, retrieving email and password.

###### Makes API Calls to:
- *loginUser* from ‘src/app/user.tsx’: clicking ‘sign in’ accepts user login information to Firebase database without a Google account, using firebase api call.
- *googleLogin* from ‘src/app/user.tsx’: clicking ‘sign in with Google’ accepts user login information to Firebase database using a Google account, using firebase api call.


<a id="Forgot-Password"></a>
### Forgot Password
*The forgot password page allows a user to reset their password to an account through our platform or with a Google account. The forgot password page is routed through the /forgotPassword page.*

#### Files Involved:
../pages/forgotPassword: the main page of forgot password that renders input field to retrieve email for contact of lost password.

###### Makes API Calls to:
- *resetPassword* from ‘src/app/user.tsx’: clicking ‘reset password’ sends an email with instructions to reset password to the given email, using firebase built in api.

<a id="Create-Dictionary"></a>
### Create Dictionary
*The dictionary setup page allows the user to create a new dictionary and consists of two setup pages all routed from the /setupFields page. On page 1, the user is required to enter a language name and language description. The user then can optionally click the IPA keyboard keys to add consonants and vowels to their language. By clicking ‘Continue’, the user is sent to the dictionary setup page 2 view which is all about creating dictionary fields. By default, the English Definition, Orthography, and Pronunciation fields are required to be included in the dictionary. The user can then choose to delete other pre-filled fields by clicking the ‘garbage can icon’ or adding fields by clicking ‘+ Add custom field’ and typing in the name of the field. Lastly, clicking ‘Create Dictionary’ will save the entire dictionary as a new language in the Firebase database.*

#### Files Involved:
../pages/setupFields: the main page of the dictionary setup that renders both setup page views as mentioned above.

###### Makes API calls to:
- *saveDictionaryFields* from "../app/sendTableInfo": sends user entered dictionary information to the database comprising of language name, language description, dictionary fields, user ID, vowels, and consonants
###### Components rendered:
- *SetUp* from '../components/setup': Dictionary setup page 1. Renders input fields for language name, language description, consonants, vowels.
- *IPAKeyboard* from ‘./IPAKeyboard’: Renders all IPA key buttons.
- *DictionaryPrefilledForms* from '../components/dictionaryPrefilled': renders Page 2 of the dictionary setup page with all pre-filled dictionary fields and functionality to remove.
- *DictionaryCustomForms* from '../components/dictionaryCustomFields': This file is the ‘+ Add custom fields’ button and offers the functionality to add new custom dictionary fields to the page 2 dictionary setup page.
###### Data called:
- ../data/consonants.json: holds all default consonants.
- ../data/vowels.json: holds all default vowels.

<a id="Sidebar"></a>
### Sidebar
*The sidebar allows the user to navigate between created languages. Each language that appears in the sidebar is a dropdown menu offering the user the options to open the dictionary table, dictionary settings or language statistics pages. The user can also delete a language by clicking the ‘delete’ button in the dropdown menu. Clicking ‘Logout’ will delete the current user ID from session storage.*

#### Files involved:

*Sidebar* from ‘../components/Sidebar.js’: fetches all user language names on page load and displays them in the sidebar menu. Allows users to route between the dictionary table, dictionary settings, and language statistics on the dropdown of a language name menu. Allows users to delete a language in the language dropdown menu as well.

###### Makes api calls to:
- *deleteLang* from ‘../pages/api/language/deleteLang’: deletes all language information from Firebase database given the language ID and stores it in the deleteRecord section of the database.
- *getUserLang* from ‘../pages/api/getUserLang’: gets all user languages that they have created, given the user ID number.

<a id="Dashboard"></a>
### Dashboard
*The dashboard acts as a profile page for each user where all languages created will be displayed in the sidebar that appears. A panel of language cover images will appear for each language in the center of the page. By clicking the ‘Create New Dictionary’ button, the user can create a new dictionary. The dashboard page is routed through the /dashboard page.*

#### Files involved:
../pages/dashboard.js: renders all language cover images, sidebar component, and button to create a new dictionary.

<a id="Dictionary-Table"></a>
### Dictionary Table
*The dictionary table is the entire dictionary for a user created language in a table format. The dictionary fields from the dictionary setup appear as column headers. The user can add a new entry into the dictionary, by clicking the ‘+ Add a row’. An ‘Edit’ icon appears at the end of each row to fill in empty entries per row. On click of the ‘Edit button’, the user must fill in each input value under each column header and click save to save all changes or cancel to discard changes. The exclusive ‘Pronunciation’ column allows the user to click the input field to open the IPA keyboard which holds all the IPA keys selected in the dictionary setup.  Within the exclusive ‘Pronunciation’ input field, clicking save will save the input to the specific table entry and cancel will discard changes. A ‘garbage can icon’ also appears next to each row which allows the user to delete a dictionary entry. Each row in the table can optionally be ordered in ascending or descending order by first letter/number by click of a column header. The dashboard page is routed through the /langTable?lid&lname page.*

#### Files involved:
../pages/langTables.js: given query parameters of language ID and language name, the specific dictionary will be rendered.

#### Components involved:
- *Sidebar* from ../components/Sidebar.js: fetches all user language names on page load and displays them in the sidebar menu. Allows users to route between the dictionary table, dictionary settings, and language statistics on the dropdown of a language name menu. Allows users to delete a language in the language dropdown menu as well.
- *DictionaryTable* from '../components/dictTable': Renders table component as well as functionality to add, edit and delete rows.
  - ###### *DictionaryTable* Component API Calls:
    - *addWord* from ‘../pages/api/word/addWord’: On click of ‘+ Add a row’, a new entry for each column will be added to the Firebase database under each column header in the dictionary. The API call sends the language ID and a blank row of data in the request.
    - *deleteWord* from ‘../pages/api/word/deleteWord’: On click of the ‘garbage can icon’, an entry for each column will be deleted from the Firebase database under each column header in the dictionary. The API call sends the language ID and the row to delete in the request.
    - *updateWord* from ‘../pages/api/word/updateWord’: On click of ‘Edit’, an entry for each column will be edited in the Firebase database. The API call sends the language ID and the row to be updated in the request.
    - *getLangData* from ‘../pages/api/language/getLangData’: Called on page render to fetch user selected consonants and vowels to be used in the exclusive ‘Pronunciation’ column.
  - IPA Keyboard:
    - *IPAKeyboard* from ‘./IPAKeyboard’: Renders all user-selected IPA key buttons in the exclusive ‘Pronunciation’ column.


<a id="Export"></a>
### Export
*The export feature is a part of the dictionary table page that allows a user to export their dictionary into html and print to PDF format. The HTML table can be viewed in a new tab on click of the ‘+ Export’ button. The export page is routed through the /exportLangHtml?lid page.*

#### Files Involved:
‘../pages/exportLangHtml.js’: the main page for exporting a dictionary. Given a query parameter language ID, render in the dictionary in HTML on a new tab.

###### Makes API call to:
- *getLangData* from ‘./api/language/getLangData’: Given a language ID, retrieve language name, language description, dictionary headers and all entries, and the dictionary creation time from the Firebase database.

<a id="Save-to-CSV"></a>
### Save To CSV
*The save to csv feature is a part of the dictionary table page that allows a user to save their dictionary into csv format. The feature can be accessed by clicking “+ save as CSV”.*

###### Makes API call to:
- *saveAsCsv* from ‘./api/language/saveAsCsv’: given dictionary rows, language name and dictionary headers, download a csv file of the dictionary table.

**NOTE**: some special IPA characters may not translate correctly in the csv format.

<a id="Dictionary-Settings"></a>
### Dictionary Settings
*The dictionary settings can be accessed through the Sidebar on click of the ‘Settings’ button in each language dropdown. From the settings the user can view two pages. The first settings page ‘Edit Dictionary Fields’ allows the user to add, delete, and edit dictionary fields. Clicking the ‘+ Add custom field’ button will open a popup to enter the name of a new dictionary field. Clicking the ‘garbage can icon’ next to each field (exclusive of English Definition, Orthography, and Pronunciation) will delete the dictionary field. Clicking the ‘Edit’ Button next to each field (exclusive of English Definition, Orthography, and Pronunciation) will open a popup to type a new name for the field. Clicking ‘Continue’ enters settings page 2; ‘Dictionary Settings’. The user can change the language name, language description, consonants, and vowels. The user can also change or delete cover images. The settings page is routed through the /dictSettings?lid&lname page.*

**NOTE**: *all changes on page 1, ‘Edit Dictionary Fields’ will be saved to the Firebase database on each submission of popup or deletion. All changes on page 2 will only be saved to the Firebase database on click of the ‘Save’ button.*

#### Files Involved:
‘../pages/dictSettings.js’: the main page for settings of a dictionary. Given a query parameter language ID and language name, render the settings for the specific dictionary.

#### Components rendered:
- *EditPrefilledForms* from '../components/editPrefilled': renders settings page 1 with all pre-filled dictionary fields and functionality to add, remove, and edit.
  - ###### *EditPrefilledForms* Makes API calls to:
    - *addField* from ‘../pages/api/dictField/addField’: clicking the ‘+ Add custom field’ button adds a dictionary field to the Firebase Database given a language ID and field name.
    - *deleteField* from ‘../pages/api/dictField/deleteField’: clicking the ‘garbage can icon’ button deletes a dictionary field from the Firebase Database given language ID and field name.
    - *updateField* from ‘../pages/api/dictField/updateFieldName’: clicking the ‘Edit’ updates a dictionary field in the Firebase Database given language ID, new field name, and current field name.
    - *getLangData* from '../pages/api/language/getLangData': given a language ID, retrieve language name, language description, dictionary headers and all entries, and the dictionary creation time from the Firebase database.


- *EditDictionary* from '../components/editDictionary': renders page 2 of settings page. Renders input fields for language name, language description, consonants, vowels, and uploading a cover image.
  - ###### *EditDictionary* Makes API calls to:
    - *saveEditDictionaryInfo* from ‘../pages/api/language/sendEditInfo’: renders page 2, ‘Dictionary Settings’. On click of ‘Save’ sends user entered dictionary information to the Firebase database comprising of language ID, language name, language description, user id, cover image, vowels, and consonants
  - Data called:
    - ../data/consonants.json: holds all default consonants.
    - ../data/vowels.json: holds all default vowels.
  - IPA Keyboard:
    - IPAKeyboard from ‘./IPAKeyboard’: Renders all user-selected IPA key buttons in the exclusive ‘Pronunciation’ column.


<a id="Language-Statistics"></a>
### Language Statistics
*The dictionary statistics can be accessed through the Sidebar on click of the ‘Language Stats’ button in each language dropdown. The statistics page is routed through the /stats?lid&lname page.*

#### Files Involved:
‘../pages/stats.js’: the main page for language statistics of a dictionary. Given query parameters language ID and language name, render the statistics for the specific dictionary. For each dictionary header/column, a user can choose to either display the statistics as a type or as first letter.

###### Makes API call to:
- *computeStat* from '../pages/api/language/computeWordStats': given a language ID, compute and return all viewable statistics.

<a id="Recover-Deleted-Languages"></a>
### Recover Deleted Languages
*The recover deleted languages feature allows users to recover languages that they may have deleted on accident. It can be accessed by clicking the “Recover Deleted Languages” button on the dashboard. Deleted languages can only be restored within 30 days of deletion. The recover deleted languages page is routed through /recoverDelLang.*

#### Files involved:
‘../pages/recoverDelLang.js’: the main page for recovering deleted languages. On the opening of the page, all deleted languages will be displayed, or no languages will be shown if there are no deleted languages.

###### Makes API call to:
- *getUserDelLang* from ‘./api/user/getUserDelLang’: given the user ID, retrieve all the languages with that specified user ID from the deleteRecord section of the Firebase database.
- *recoverLang* from ‘./api/language/recoverLang.js’: given the user ID and language ID, retrieve the selected language to recover from deleteRecord and place the language back into the languages section of firebase and into the user’s personal “lid” section in the users section of the firebase database.

##### Scheduler
- ‘../pages/api/scheduler’: the automated script to permanently delete languages from deleteRecords after 30 days.
- ‘package.json’: line six in “dev” triggers the scheduler script.
`“dev”: "node -r dotenv/config -r esm ./src/pages/api/scheduler.js & next dev"`



<a id="Redirecting"></a>
### Redirecting
*The website makes one route redirection which is for route ‘/’. Whenever the ‘/’ route is searched, the user will be redirected to the landing page (https://langtimeengine.framer.website/). The same applies to whenever the user tries to access pages in the website without having logged in (no user ID). The user will be redirected to the landing page if no user ID can be identified.*

#### Files involved:
/next.config.js: the *redirects* function within this file achieves the redirection on the ‘/’ route.

<a id="Ant-Design"></a>
### Ant Design
*LangTime Engine uses most of its styling components from ant design.*
https://ant.design/

<a id="Code-Environment"></a>
### Code Environment
*The project is created and deployed in a Next.js environment.*

<a id="Localhost"></a>
### Localhost
*The repository can be run on localhost after cloning the repository. Run the following commands in the terminal after navigating to the root folder:*

Ensure all dependencies are installed:

`npm install`

Start the server:

`npm run dev`


<a id="Deploy"></a>
### Deploy (https://conlang-suite-capstone.vercel.app/)
*The application is deployed through Vercel (https://vercel.com/). Vercel allows users to easily deploy their application using a github account and linking a selected github repository to deployment. In our case, we have linked the conlang-suite-capstone repository to Vercel deployment.*
- Linking Vercel with Firebase: ensure that the top domain name is in the authorized domains section of the authorization settings of Firebase to ensure Google authentication is enabled.


<a id="Extra"></a>
### Extra Features & Final Notes

**Uploading Images** <br>
*The feature to upload images into the dashboard cards was successfully implemented, but failed to run on the Vercel deployment. In the ‘final-image-upload’ github branch, this branch holds the code to upload images during dictionary creation, change cover images by uploading images in the settings, and viewing uploaded images on cards in the dashboard. There is reason to believe the feature could work had the website been deployed to Firebase instead of Vercel, but this would require upgrading from the spark plan to the blaze plan (pay as you go plan).*
