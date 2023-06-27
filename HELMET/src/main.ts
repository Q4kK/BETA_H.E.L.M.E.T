import * as fs from 'fs'
const fetch = await import('node-fetch')

const headers = new Headers();

headers.append('x-api-key', fs.readFileSync('../Bungie_Key.txt').toString());

var myHeaders = {
     method: 'GET',
     headers: headers,
     redirect: 'follow'
   };
fetch('https://www.bungie.net/Platform/Content/Rss/NewsArticles/0')
   .then(response => response.text())
   .then(result => console.log(result))
   .catch(error => console.log('error', error));