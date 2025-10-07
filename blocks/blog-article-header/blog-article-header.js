/**
 * Formats a date string for display
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Creates author link element
 * @param {string} authorName - Author name
 * @param {string} authorSlug - Author URL slug
 * @returns {HTMLAnchorElement} Author link element
 */
function createAuthorLink(authorName, authorSlug) {
  const link = document.createElement('a');
  link.href = `/blog/authors/${authorSlug}`;
  link.textContent = authorName;
  link.className = 'blog-article-author-link';
  return link;
}

/**
 * Slugifies a string for URL usage
 * @param {string} text - Text to slugify
 * @returns {string} Slugified text
 */
function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Decorates the blog article header block
 * @param {HTMLElement} block - The block element
 */
export default function decorate(block) {
  // Expected structure: rows with label-value pairs
  // Date | 2024-10-07
  // Author | Author Name
  // Tags | tag1, tag2, tag3

  const metadata = {};

  // Parse block content
  [...block.children].forEach((row) => {
    const cells = [...row.children];
    if (cells.length === 2) {
      const label = cells[0].textContent.trim().toLowerCase();
      const value = cells[1].textContent.trim();
      metadata[label] = value;
    }
  });

  // Clear block
  block.textContent = '';
  block.classList.add('blog-article-header');

  // Create metadata container
  const metaContainer = document.createElement('div');
  metaContainer.className = 'blog-article-metadata';

  // Date
  if (metadata.date) {
    const dateDiv = document.createElement('div');
    dateDiv.className = 'blog-metadata-item blog-metadata-date';

    const dateIcon = document.createElement('span');
    dateIcon.className = 'blog-metadata-icon';
    dateIcon.innerHTML = '📅';

    const dateText = document.createElement('span');
    dateText.textContent = formatDate(metadata.date);

    dateDiv.append(dateIcon, dateText);
    metaContainer.append(dateDiv);
  }

  // Author
  if (metadata.author) {
    const authorDiv = document.createElement('div');
    authorDiv.className = 'blog-metadata-item blog-metadata-author';

    const authorIcon = document.createElement('span');
    authorIcon.className = 'blog-metadata-icon';
    authorIcon.innerHTML = '✍️';

    const authorSlug = slugify(metadata.author);
    const authorLink = createAuthorLink(metadata.author, authorSlug);

    authorDiv.append(authorIcon, authorLink);
    metaContainer.append(authorDiv);
  }

  // Tags
  if (metadata.tags) {
    const tagsDiv = document.createElement('div');
    tagsDiv.className = 'blog-metadata-item blog-metadata-tags';

    const tagsIcon = document.createElement('span');
    tagsIcon.className = 'blog-metadata-icon';
    tagsIcon.innerHTML = '🏷️';

    const tagsContainer = document.createElement('span');
    tagsContainer.className = 'blog-tags-list';

    const tags = metadata.tags.split(',').map((tag) => tag.trim()).filter((tag) => tag);
    tags.forEach((tag, index) => {
      const tagSpan = document.createElement('span');
      tagSpan.className = 'blog-tag';
      tagSpan.textContent = tag;
      tagsContainer.append(tagSpan);

      if (index < tags.length - 1) {
        const separator = document.createElement('span');
        separator.className = 'blog-tag-separator';
        separator.textContent = ', ';
        tagsContainer.append(separator);
      }
    });

    tagsDiv.append(tagsIcon, tagsContainer);
    metaContainer.append(tagsDiv);
  }

  block.append(metaContainer);
}
