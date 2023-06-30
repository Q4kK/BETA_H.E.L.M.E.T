import fs = require('fs');
import fetch, { Headers } from 'node-fetch'

type postInfo = {Title: string, Link: string};

const BUNGIE_URL = "https://Bungie.net";

async function get_json(headers) {
  const response = await fetch(BUNGIE_URL + "/Platform/Content/Rss/NewsArticles/0", {
    headers,
    method: 'GET',
    redirect: 'follow'
  });
  const result = await response.text();
  return JSON.parse(result);
}

function latest_twab(News: postInfo[]): string {
  let twab = News.filter(item => item.Title.startsWith("This Week"));
  return BUNGIE_URL + twab[0].Link;
}

async function main() {
  let headers = new Headers();
  headers.append("x-api-key", fs.readFileSync('../Bungie_Key.txt').toString().trim());
  const bungie_response = await get_json(headers);
  console.log(latest_twab(bungie_response["Response"]["NewsArticles"]));
}

main();