/**
 * Fetches placeholders for localization
 * @returns {Promise<Object>} Object containing placeholder key-value pairs
 */
export async function fetchPlaceholders() {
  // Default placeholders for search
  return {
    searchPlaceholder: 'Search...',
    searchNoResults: 'No results found.',
  };
}
