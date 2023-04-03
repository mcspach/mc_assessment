const RSS_URL = `https://skills-assessment.oudemo.com/_resources/rss/news.xml`;

const timeoutError = new Promise((resolve, reject) => {
  setTimeout(() => {
    throw new Error('Fetch request timed out before 5 seconds.');
  }, 5000);
});

async function getFeed() {
  try {
    const response = await Promise.race([fetch(RSS_URL), timeoutError]);
    const data = await response.text();
    const parsedData = new window.DOMParser().parseFromString(data, "text/xml");
    const items = [...parsedData.querySelectorAll("item")];

    // set variables for extracting from data
    let noArticlesMessage = `<article><h3>The news feed is empty.</h3></article>`;
    let articlesContent = ``;

    //set variables for populating html document
    const articlesFeed = document.getElementById('articles-feed');

    // if (items !== ``)
    items.forEach(art => {

    // create a new image element
    const img = new Image;
    // set the src of the image element to the photoUrl
    let photoUrl = art.querySelector('content').attributes[0].textContent;
    img.src = photoUrl.startsWith(`https://skills-assessment.oudemo.com/_resources/`) ? photoUrl : `./images/gopher.png`;
    // img.src = art.querySelector('content').attributes[0].textContent;
    img.alt = art.querySelector('title').innerHTML;

    //create entire item as html code
    articlesContent += `
    <article>
      <h2>
        <a href="${art.querySelector("link").innerHTML}" target="_blank" rel="noopener">
            ${art.querySelector("title").innerHTML}
        </a>
      </h2>
      <div class="photo">
        ${img.outerHTML} 
      </div>
      <h3>${art.querySelector("pubDate").innerHTML.substring(4, 16)}</h3>
      <p>${art.querySelector("description").innerHTML}</p>
    </article>
  `;
  });
  //insert new item into the DOM, or if no items exist, display empty state
  articlesContent !== `` ? articlesFeed.insertAdjacentHTML("beforeend", articlesContent) : articlesFeed.insertAdjacentHTML("beforeend", noArticlesMessage);
  } catch (error) {
    if (error.message === 'Fetch request timed out before 5 seconds.') { // handle the custom error object
      window.alert('Fetch request timed out before 5 seconds.'); // display a window alert
    } else {
    console.error(error);
    window.alert(error);
    }
  }
}

getFeed();
