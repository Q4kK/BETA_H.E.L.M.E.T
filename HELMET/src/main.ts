import fs = require('fs');
import fetch, { Headers } from 'node-fetch'

// fetch('https://www.bungie.net/Platform/Content/Rss/NewsArticles/0', {
//   method: 'GET',
//   headers: myheaders,
//   redirect: 'follow'
// })
//   .then(response => response.text())
//   .then(result => JSON.parse(result))
//   .catch(error => console.log('error', error));

async function get_json(headers) {
  const response = await fetch('https://www.bungie.net/Platform/Content/Rss/NewsArticles/0', {
    headers,
    method: 'GET',
    redirect: 'follow'
  });
  const result = await response.text();
  return JSON.parse(result);
}

function newsloop(News) {
  return News.filter(item => item["Title"].startsWith("This Week"));
  // for (var i = 0; i < twab_news.length; i++) {
  //   return twab_news.filter(item => item["Link"])
  //   }
  }

async function main() {
  let headers = new Headers();
  headers.append("x-api-key", fs.readFileSync('../Bungie_Key.txt').toString().trim());
  const bungie_response = await get_json(headers);
  console.log(newsloop(bungie_response["Response"]["NewsArticles"]))
}

main();