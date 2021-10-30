
'use strict';

function titleClickHandler(event){
  console.log('Link was clicked!');
  console.log(event);
  event.preventDefault();
  const clickedElement = this;

  /*[DONE]remove class 'active' from all article links  */

const activeLinks = document.querySelectorAll('.titles a.active');

for(let activeLink of activeLinks){
  activeLink.classList.remove('active');
}

  /* add class 'active' to the clicked link */

  console.log('clickedElement (with plus): ' + clickedElement);
  clickedElement.classList.add('active');

  /* remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('#article-1.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */

const articleSelector = document.querySelectorAll('href');
const href = clickedElement.getAttribute("href");
console.log('articleSelector' + clickedElement );


  /* find the correct article using the selector (value of 'href' attribute) */

const targetArticle = document.querySelector('href');
console.log('articleSelector' + clickedElement );

  /* add class 'active' to the correct article */

  console.log('targetArticle (with plus): ' + clickedElement);
  clickedElement.classList.add('active');

}

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}
