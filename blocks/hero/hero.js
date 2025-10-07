export default function decorate(block) {
  // Hero block structure:
  // Row 1: Image (optional background)
  // Row 2: Text content (heading, description, buttons)

  const rows = [...block.children];

  // Check if first row contains an image (background)
  if (rows.length > 1) {
    const firstRow = rows[0];
    const picture = firstRow.querySelector('picture');

    if (picture) {
      // Move picture to be a direct child of hero for background positioning
      block.appendChild(picture);
      // Remove the now-empty first row
      firstRow.remove();
    }
  }

  // Wrap remaining content in a div for proper layering
  const contentDiv = document.createElement('div');
  while (block.firstElementChild && block.firstElementChild.tagName !== 'PICTURE') {
    contentDiv.appendChild(block.firstElementChild);
  }
  block.appendChild(contentDiv);
}
