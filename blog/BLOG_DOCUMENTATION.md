# Blog Documentation

## Overview

This documentation provides complete guidance for managing and extending the Experience Catalyst Fashion Blog built on Adobe Edge Delivery Services (EDS).

## Project Structure

```
/blog/
  index.md                    # Blog home page
  search.md                   # Search page
  query-index.json            # Article index for search and listing
  BLOG_DOCUMENTATION.md       # This file
  /articles/                  # All blog articles
    article-name.md
  /authors/                   # Author profile pages
    author-name.md
  /images/                    # Blog images
    *.jpg, *.png

/blocks/
  /blog-article-list/         # Dynamic article list block
    blog-article-list.js
    blog-article-list.css
  /blog-article-header/       # Article metadata display block
    blog-article-header.js
    blog-article-header.css
  /search/                    # Search block (from Adobe collection)
    search.js
    search.css
```

## Adding a New Article

### Step 1: Create the Article File

Create a new markdown file in `/blog/articles/` with a descriptive slug name:

```bash
touch blog/articles/your-article-slug.md
```

### Step 2: Article Template

Use this template for new articles:

```markdown
+---------------------------------------------------------------+
| **Hero**                                                      |
+---------------------------------------------------------------+
| ![Article Hero Image][hero]                                   |
+---------------------------------------------------------------+
| # Your Article Title Here                                     |
+---------------------------------------------------------------+

+---------------------------------------------------------------+
| **Blog-article-header**                                       |
+---------------------+-----------------------------------------+
| Date                | YYYY-MM-DD                              |
+---------------------+-----------------------------------------+
| Author              | Author Name                             |
+---------------------+-----------------------------------------+
| Tags                | tag1, tag2, tag3                        |
+---------------------+-----------------------------------------+

Your article introduction paragraph goes here. This should be compelling and summarize what readers will learn.

## First Section Heading

Content for the first section. Use multiple paragraphs as needed.

![Section Image][img1]

## Second Section Heading

More content here. Keep paragraphs focused and readable.

## Conclusion

Wrap up your article with key takeaways or final thoughts.

[hero]: /blog/images/your-hero-image.jpg
[img1]: /blog/images/your-section-image.jpg
```

### Step 3: Content Guidelines

**Metadata Requirements:**
- **Date**: Use ISO format (YYYY-MM-DD), typically today's date
- **Author**: Must match exactly one of the author names:
  - Sofia Martinez
  - James Chen
  - Emma Thompson
- **Tags**: 2-4 relevant tags, comma-separated

**Writing Guidelines:**
- **Length**: 3-5 paragraphs minimum (300-800 words)
- **Structure**: Use H2 (##) for section headings
- **Tone**: Professional but conversational
- **Images**: Include hero image and 1-2 section images
- **Topic**: Fashion, lifestyle, trends, style tips

### Step 4: Add Images

1. **Prepare images:**
   - Hero image: 1200x600px minimum
   - Section images: 750x500px minimum
   - Format: JPG or PNG
   - Optimize for web (<200KB per image)

2. **Add to repository:**
   ```bash
   cp your-image.jpg blog/images/
   git add blog/images/your-image.jpg
   ```

3. **Reference in article:**
   ```markdown
   [hero]: /blog/images/your-image.jpg
   [img1]: /blog/images/section-image.jpg
   ```

### Step 5: Update Query Index

Add your article to `/blog/query-index.json`:

```json
{
  "path": "/blog/articles/your-article-slug",
  "title": "Your Article Title",
  "date": "YYYY-MM-DD",
  "author": "Author Name",
  "tags": "tag1, tag2, tag3",
  "image": "/blog/images/your-hero-image.jpg",
  "excerpt": "First 150 characters of your article introduction..."
}
```

**Important:**
- Add new articles at the **beginning** of the `data` array
- Update the `"total"` count
- Keep articles sorted by date (newest first)

### Step 6: Test Locally

```bash
# Start development server
npx @adobe/aem-cli up

# Open in browser
# http://localhost:3000/blog/articles/your-article-slug
# http://localhost:3000/blog (check it appears in list)
```

**Verify:**
- ✅ Article displays correctly
- ✅ Hero image loads
- ✅ Metadata displays (date, author, tags)
- ✅ Author link works
- ✅ Article appears on blog home page
- ✅ Article appears in search results

### Step 7: Commit and Deploy

```bash
# Add all files
git add blog/articles/your-article-slug.md
git add blog/images/*.jpg
git add blog/query-index.json

# Commit with descriptive message
git commit -m "Add article: Your Article Title"

# Push to repository
git push
```

Changes will be live on the preview environment after ~5 seconds.

---

## Adding a New Author

### Step 1: Create Author Page

Create `/blog/authors/author-slug.md`:

```markdown
# Author Name

+---------------------------------------------------------------+
| **Columns**                                                   |
+-----------------------------+---------------------------------+
| ![Author Name][author]       | ## Professional Title            |
|                             |                                 |
|                             | Author bio paragraph here. 2-3  |
|                             | sentences about experience and  |
|                             | expertise.                      |
|                             |                                 |
|                             | **[Twitter](https://twitter.com/handle)** • **[LinkedIn](https://linkedin.com/in/handle)** |
+-----------------------------+---------------------------------+

---

## Latest Articles

+---------------------------------------------------------------+
| **Blog-article-list**                                         |
+---------------------------------------------------------------+
| /blog/query-index.json?author=Author Name                     |
+---------------------------------------------------------------+

[author]: /blog/images/author-slug.jpg
```

### Step 2: Add Author Photo

- Size: 400x400px
- Format: JPG
- Location: `/blog/images/author-slug.jpg`

### Step 3: Update Articles

Use the exact author name in all their articles' metadata.

---

## Customizing Blocks

### Blog Article List Block

Location: `/blocks/blog-article-list/`

**Modify article count:**

Edit `blog-article-list.js` line 108:
```javascript
.slice(0, 10);  // Change 10 to desired count
```

**Modify card layout:**

Edit `blog-article-list.css` line 27:
```css
grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
/* Adjust 300px to change card size */
```

### Blog Article Header Block

Location: `/blocks/blog-article-header/`

**Customize metadata display:**

Edit `blog-article-header.js` to add/remove metadata fields or change formatting.

---

## Search Configuration

The search block searches article **titles only** by default.

**To search full content:**
1. Update query index to include full article text
2. Configure search block to index body content

---

## Troubleshooting

### Article doesn't appear on homepage

**Check:**
1. Is it added to `query-index.json`?
2. Is the date format correct (YYYY-MM-DD)?
3. Is the path correct (`/blog/articles/slug`)?
4. Did you clear browser cache?

### Images not loading

**Check:**
1. Are images committed to git?
2. Is the path correct (`/blog/images/name.jpg`)?
3. Are image references using markdown syntax?
4. Did you wait for code sync (~5 seconds)?

### Article metadata not displaying

**Check:**
1. Is the Blog-article-header block included?
2. Is the metadata table formatted correctly?
3. Do labels match exactly: `Date`, `Author`, `Tags`?
4. Are there exactly 2 cells per row?

### Search not working

**Check:**
1. Is `query-index.json` valid JSON?
2. Is the search block path correct?
3. Are article paths consistent with filesystem?

---

## Best Practices

### Writing

- ✅ Write for your audience (fashion enthusiasts)
- ✅ Use active voice
- ✅ Include practical takeaways
- ✅ Add visual breaks with images
- ✅ Use descriptive headings

### Images

- ✅ Optimize before committing
- ✅ Use descriptive alt text
- ✅ Maintain consistent aspect ratios
- ✅ Credit photographers if needed

### Metadata

- ✅ Use consistent date format
- ✅ Match author names exactly
- ✅ Choose relevant, searchable tags
- ✅ Write compelling excerpts (first 150 chars)

### Git Commits

- ✅ Commit images separately from content
- ✅ Use descriptive commit messages
- ✅ Test locally before pushing
- ✅ Update query index in same commit

---

## Quick Reference

### File Locations

| Item | Path |
|------|------|
| Articles | `/blog/articles/*.md` |
| Authors | `/blog/authors/*.md` |
| Images | `/blog/images/*.jpg` |
| Query Index | `/blog/query-index.json` |
| Blog Home | `/blog/index.md` |
| Search | `/blog/search.md` |

### Block Names

| Block | Usage |
|-------|-------|
| `Hero` | Article headers and page banners |
| `Blog-article-header` | Article metadata display |
| `Blog-article-list` | Dynamic article list |
| `Search` | Search functionality |
| `Columns` | Side-by-side layouts (author pages) |

### CLI Commands

```bash
# Start local server
npx @adobe/aem-cli up

# Install new block from Adobe collection
bash tools/eds-migration/helpers/add-block.sh <blockname> collection

# Commit changes
git add . && git commit -m "message" && git push
```

---

## Support

For EDS-specific questions:
- [EDS Documentation](https://www.aem.live/docs/)
- [Block Collection](https://github.com/adobe/aem-block-collection)

For project-specific issues:
- Review `/tools/eds-migration/docs/` documentation
- Check CLAUDE.md for project guidelines
