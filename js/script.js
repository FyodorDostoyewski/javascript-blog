'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
}

const opt = {
  ArticleSelector: '.post',
  ActiveArticleSelector: '.posts .active',
  ArticleTagsSelector: '.post-tags .list',
  ArticleAuthorSelector: '.post-author',
  TitleSelector: '.post-title',
  TitleListSelector: '.titles',
  TitleListSelectorA: '.titles a',
  TagListSelector: '.tags.list',
  CloudClassCount: 5,
  CloudClassPrefix: 'tag-size-',
  AuthorsListSelector: '.author-name'
};

function titleClickHandler(event) {
  // console.log('Link was clicked!');
  // console.log(event);
  event.preventDefault();
  const clickedElement = this;

  /*remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }
  /* add class 'active' to the clicked link */
  // console.log('clickedElement (with plus): ' + clickedElement);
  clickedElement.classList.add('active');
  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll(opt.ActiveArticleSelector);
  const href = clickedElement.getAttribute('href');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }
  /* get 'href' attribute from the clicked link */
  // console.log(clickedElement);
  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(href);
  // console.log(targetArticle);
  /* add class 'active' to the correct article */
  // console.log('clickedElement (with plus): ' + targetArticle);
  targetArticle.classList.add('active');
}

const generateTitleLinks = function (customSelector = '') {
  /* remove contents of titleList */
  const titleList = document.querySelector(opt.TitleListSelector);
  titleList.innerHTML = '';
  // console.log(titleList);
  /* for each article */
  const articles = document.querySelectorAll(opt.ArticleSelector + customSelector);
  // console.log(articles);
  for (let article of articles) {
    /* get the article id */
    const articleID = article.getAttribute('id');
    /* find the title element */
    const articleTitle = article.querySelector(opt.TitleSelector).innerHTML;
    /* get the title from the title element */
    const linkHTMLData = {id: articleID, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
    // console.log(linkHTML);
    /* create HTML of the link */
    titleList.innerHTML = titleList.innerHTML + linkHTML;
    /* insert link into titleList */
    // html = html + linkHTML;
  }
  // titleList.innerHTML = html;
  const links = document.querySelectorAll(opt.TitleListSelectorA);
  // console.log(links);
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
};
/* Calculate Tag Parameters [DONE]*/
const calculateTagsParams = function (tags){
  const params = { max: 0, min: 999999 };

  for (let tag in tags){
    // console.log(tag + ' is used ' + tags[tag] + ' times');
    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);
  }
  // console.log(tags);
  return params;
};
/* Calculate Tag Class [DONE]*/
const calculateTagClass = function(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (opt.CloudClassCount - 1) + 1);
  return opt.CloudClassPrefix + classNumber;
};

const generateTags = function (customSelector = '') {

  // *NEWcreate a new variable allTags with an empty array */
  let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll(opt.ArticleSelector);
  // console.log(generateTags);
  // articles.innerHTML = '';
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const titleList = article.querySelector(opt.ArticleTagsSelector + customSelector);
    /* make html variable with empty string */
    // titleList.innerHTML='';
    // console.log('titleList');
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    // console.log(articleTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* generate HTML of the link */
      const tagLinkHTMLData = {id: tag, title: tag};
      const tagLinkHTML = templates.tagLink(tagLinkHTMLData);
      /* add generated code to html variable */
      html = html + tagLinkHTML;
      /* END LOOP: for each tag */
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]) {
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      // console.log(allTags[tag]);
      /* insert HTML of all the links into the tags wrapper */
      titleList.innerHTML = titleList.innerHTML + ' ' + tagLinkHTML;
      /* END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(opt.TagListSelector);
    // NEW create variable for all links HTML code
    const allTagsData = {tags: []};

    const tagsParams = calculateTagsParams(allTags);
    // NEW START LOOP: for each tag in alltags
    for(let tag in allTags){
    // NEW generate code of a link and add it to allTagsHTML
      // const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '(' + allTags[tag] +  ')';
      // ' ' + '</a></li>';
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });
    }
    // NEW END LOOP: for each tag in allTags
    // NEW add html from allTagsHTML to tagList
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
  // console.log('tagsParams:', allTagsHTML);
  }
};

const tagClickHandler = function (event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
  const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for(let tagLink of tagLinks){
    /* remove class active */
    tagLink.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinksHref = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for (let tagLinkHref of tagLinksHref) {
    /* add class active */
    tagLinkHref.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
};

const addClickListenersToTags = function () {
  /* find all links to tags */
  const allLinksToTags = document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */
  for (let link of allLinksToTags) {
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
};



const generateAuthors = function (customSelector = ''){
  /* [NEW] create a new variable allTags with an empty array */
  let allAuthors = {};
  // console.log(allTags);
  /* find all authors */
  const articles = document.querySelectorAll(opt.ArticleSelector);
  /* START LOOP: for every author */
  for (let article of articles) {
    /*  find tags wrapper */
    const titleList = article.querySelector(opt.ArticleAuthorSelector + customSelector);
    /* make html variable with empty string */
    let html = '';

    /* get author from data-tags attribute */
    const authorTags = article.getAttribute('data-author');
    // console.log(authorTags);
    /* generate HTML of the link */
    const authorHTMLData = {id: authorTags, title: authorTags};
    const authorLinkHTML = templates.articleLink(authorHTMLData);
    // console.log(authorLinkHTML);
    /* add generated code to html variable */
    html += html + authorLinkHTML;
    // console.log(html);
    /* [NEW] check if this link is NOT already in allAuthors */
    if (!allAuthors[authorTags]) {
      /* [NEW] add tag to allAuthors object */
      allAuthors[authorTags] = 1;
    } else {
      allAuthors[authorTags]++;
    }
    /* insert HTML of all the links into the tags wrapper */
    titleList.innerHTML = titleList.innerHTML + authorLinkHTML;
    /* [NEW] find list of authors in right column */
    const authorList = document.querySelector('.authors');

    /* [NEW] create variable for all links HTML code */
    const allAuthorsData = {authors: []};

    /* [NEW] START LOOP: for each tag in allAuthors: */
    for (let author in allAuthors) {
      // const authorLinkHTML = '<li><a href="#author-' + author + '">' + author + ' (' + allAuthors[author] + ') ' + '</a></li> ';
      allAuthorsData.authors.push({
          author: author,
          count: allAuthors[author],
        });
    }
     authorList.innerHTML = templates.authorCloudLink(allAuthorsData)
  }
};
/* Generate Author Click Handler */
const authorClickHandler = function (event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  // console.log('Tag clicked ', clickedElement);
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#author-', '');
  // console.log(tag);

  const authorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  /* START LOOP: for each active tag link */
  /* remove class active */
  for (let authorLink of authorLinks) {
    authorLink.classList.remove('active');
  }
  /* END LOOP: for each active author link */
  /* find all tag links with "href" attribute equal to the "href" constant */
  const authorLinksHref = document.querySelectorAll('a[href="' + href + '"]');
  // console.log(authorLinksHref);
  /* START LOOP: for each found author link */
  /* add class active */
  for (let authorLinkHref of authorLinksHref) {
    authorLinkHref.classList.add('active');
  }
  /* END LOOP: for each found author link */
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + tag + '"]');
  // console.log(generateTitleLinks);
};
/* Authors click listener [DONE] */
const addClickListenersToAuthors = function () {
  /* find all links to tags */
  const allLinksToAuthors = document.querySelectorAll('a[href^="#author-"]');
  // console.log(allLinksToAuthors);
  /* START LOOP: for each link */
  for (let link of allLinksToAuthors) {
    /* add authorClickHandler as event listener for that link */
    link.addEventListener('click', authorClickHandler);
  }
  /* END LOOP: for each link */
};
generateTags();
addClickListenersToTags();
generateAuthors();
addClickListenersToAuthors();
generateTitleLinks();
