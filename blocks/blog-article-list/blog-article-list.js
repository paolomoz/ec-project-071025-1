import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * Fetches the blog query index
 * @param {string} indexPath - Path to the query index JSON
 * @returns {Promise<Array>} Array of article objects
 */
async function fetchArticles(indexPath) {
  try {
    const response = await fetch(indexPath);
    if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
    const json = await response.json();
    return json.data || [];
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

/**
 * Creates an article card element
 * @param {Object} article - Article data
 * @returns {HTMLLIElement} Article card element
 */
function createArticleCard(article) {
  const li = document.createElement('li');
  li.className = 'blog-article-card';

  // Image container
  if (article.image) {
    const imageDiv = document.createElement('div');
    imageDiv.className = 'blog-article-card-image';
    const picture = createOptimizedPicture(article.image, article.title, false, [{ width: '750' }]);
    imageDiv.append(picture);
    li.append(imageDiv);
  }

  // Content container
  const bodyDiv = document.createElement('div');
  bodyDiv.className = 'blog-article-card-body';

  // Title
  const title = document.createElement('h3');
  const titleLink = document.createElement('a');
  titleLink.href = article.path;
  titleLink.textContent = article.title;
  title.append(titleLink);
  bodyDiv.append(title);

  // Excerpt
  if (article.excerpt) {
    const excerpt = document.createElement('p');
    excerpt.className = 'blog-article-excerpt';
    excerpt.textContent = article.excerpt;
    bodyDiv.append(excerpt);
  }

  // Metadata (date + author)
  const meta = document.createElement('div');
  meta.className = 'blog-article-meta';

  if (article.date) {
    const date = document.createElement('span');
    date.className = 'blog-article-date';
    const dateObj = new Date(article.date);
    date.textContent = dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    meta.append(date);
  }

  if (article.author) {
    const separator = document.createElement('span');
    separator.textContent = ' • ';
    separator.className = 'blog-article-separator';
    meta.append(separator);

    const author = document.createElement('span');
    author.className = 'blog-article-author';
    author.textContent = article.author;
    meta.append(author);
  }

  bodyDiv.append(meta);
  li.append(bodyDiv);

  return li;
}

/**
 * Decorates the blog article list block
 * @param {HTMLElement} block - The block element
 */
export default async function decorate(block) {
  // Get the query index path from block content (first cell)
  const indexPathRaw = block.textContent.trim() || '/blog/query-index.json';

  // Parse URL to extract query parameters
  let indexPath = indexPathRaw;
  let authorFilter = null;

  if (indexPathRaw.includes('?')) {
    const [path, queryString] = indexPathRaw.split('?');
    indexPath = path;
    const params = new URLSearchParams(queryString);
    authorFilter = params.get('author');
  }

  // Clear block content
  block.textContent = '';

  // Show loading state
  block.classList.add('loading');
  const loadingMsg = document.createElement('p');
  loadingMsg.textContent = 'Loading articles...';
  block.append(loadingMsg);

  // Fetch articles
  const articles = await fetchArticles(indexPath);

  // Remove loading state
  block.classList.remove('loading');
  block.textContent = '';

  if (!articles || articles.length === 0) {
    const noArticles = document.createElement('p');
    noArticles.className = 'blog-no-articles';
    noArticles.textContent = 'No articles found.';
    block.append(noArticles);
    return;
  }

  // Filter by author if specified
  let filteredArticles = articles.filter((article) => article.path && article.title);

  if (authorFilter) {
    filteredArticles = filteredArticles.filter((article) => article.author === authorFilter);
  }

  // Sort by date (newest first) and take top 10
  const sortedArticles = filteredArticles
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 10);

  if (sortedArticles.length === 0) {
    const noArticles = document.createElement('p');
    noArticles.className = 'blog-no-articles';
    noArticles.textContent = authorFilter
      ? `No articles found by ${authorFilter}.`
      : 'No articles found.';
    block.append(noArticles);
    return;
  }

  // Create article list
  const ul = document.createElement('ul');
  ul.className = 'blog-article-list';

  sortedArticles.forEach((article) => {
    const card = createArticleCard(article);
    ul.append(card);
  });

  block.append(ul);
}
