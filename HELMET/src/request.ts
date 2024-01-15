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

function destiny_update(News: postInfo[]): string {
  let update = News.filter(item => item.Title.startsWith("Destiny"));
  return BUNGIE_URL + update[0].Link;
}

function latest_twab(News: postInfo[]): string {
  let twab = News.filter(item => item.Title.startsWith("This Week"));
  return BUNGIE_URL + twab[0].Link;
}

async function main() {
  let headers = new Headers();
  headers.append("x-api-key", fs.readFileSync('./Bungie_Key.txt').toString().trim());
  const bungie_response = await get_json(headers);
  document.body.innerHTML = "<h1>" + (latest_twab(bungie_response["Response"]["NewsArticles"])) + "</h1>";
  document.body.innerHTML = "<h1>" + (destiny_update(bungie_response["Response"]["NewsArticles"])) + "</h1>";
}

main();