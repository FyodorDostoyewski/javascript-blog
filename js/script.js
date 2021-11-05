'use strict';

function titleClickHandler(event) {
  console.log('Link was clicked!');
  console.log(event);
  event.preventDefault();
  const clickedElement = this;

  /*remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* add class 'active' to the clicked link */

  console.log('clickedElement (with plus): ' + clickedElement);
  clickedElement.classList.add('active');

  /* remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.post.active');
  const href = clickedElement.getAttribute("href");
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */


  console.log(clickedElement);

  /* find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(href);
  console.log(targetArticle);

  /* add class 'active' to the correct article */

  console.log('clickedElement (with plus): ' + targetArticle);
  targetArticle.classList.add('active');

}


const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks() {

  /* remove contents of titleList */

  const titleList = document.querySelector('.titles');
  titleList.innerHTML = '';
  console.log(titleList);

  /* for each article */

  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);

  let html = '';

  for (let article of articles) {
    /* get the article id */

    const articleID = article.getAttribute('id');

    /* find the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* get the title from the title element */

    const linkHTML = '<li><a href="#' + articleID + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML)

    /* create HTML of the link */

    titleList.innerHTML = titleList.innerHTML + linkHTML;

    /* insert link into titleList */

    html = html + linkHTML;

  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  console.log(links);

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }

}

generateTitleLinks();
