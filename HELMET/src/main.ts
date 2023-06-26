

var myHeaders = new Headers();
myHeaders.append("x-api-key", FileSystemVar.readFile ("../KEY.txt") );

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

fetch("https://www.bungie.net/Platform/Content/Rss/NewsArticles/0", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}