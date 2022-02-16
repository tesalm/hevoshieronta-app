# Hevoshieronta-web

Freelance projektina toteutettu hevoshieronta palveluiden hallintaan tarkoitettu web-sovellus.

Projektin asiakas on Horseflea Oy. Horseflea yritys on perustettu vuonna 2014, jonka kotipaikka on Kangasala, ja pääasiallinen toimiala Eläintarvike- ja eläinkauppa. Projektin yhteyshenkilö on Eeva Pernitz.

### Demo
Projektin demo-versiota voi tarkastella osoitteessa https://hevoshieronta-demo.web.app

Uusien hoitojen vienti tietokantaan ja demo datan muokkaus on estetty.

- Hoitajan kirjautumistiedot:  
`Tunnus: hoitaja@hh.fi`  
`Salasana: 123456`
- Asiakkaan kirjautumistiedot:  
`Tunnus: kayttaja@hh.fi`  
`Salasana: 123456`

## Toiminnallisuuden kuvaus
Asiakas kirjautuu/rekisteröityy hoitopalveluun ja luo hoitopyynnön täyttämällä hoitokortin. Hoitokortin lähetettyä, palvelu ilmoittaa hoitajalle uuden hoitopyynnön saapumisesta sähköpostitse.

Hoitajan käytyä läpi asiakkaan täyttämän hoitokortin, hoitaja voi kirjoittaa alustavan hoitosuunnitelman, joka tulee palvelussa asiakkaalle nähtäville.

Hoitajan suoritettua asiakkaan tilaaman hoidon, hoitaja kirjaa palveluun hevoselle suoritetut hieronnat/hoidot, sekä muut mahdolliset havainnot.

## Backend
Projektin tietokantaratkaisu on toteutettu Googlen NoSQL Firestore-palvelulla ja backend -sovellusta suoritetaan Google Cloud App Engine -sovelluksen palveluna.

</br>

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)