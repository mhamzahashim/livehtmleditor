/**
 * Utility functions for counting words in different content types
 */

/**
 * Count words in plain text
 */
export const countWordsInText = (text: string): number => {
  if (!text || typeof text !== 'string') return 0;
  
  // Remove extra whitespace and split by word boundaries
  const words = text.trim().split(/\s+/).filter(word => word.length > 0);
  return words.length;
};

/**
 * Count words in HTML content by extracting text content
 */
export const countWordsInHtml = (html: string): number => {
  if (!html || typeof html !== 'string') return 0;
  
  try {
    // Create a temporary DOM element to extract text content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    
    // Get only the text content, ignoring HTML tags
    const textContent = tempDiv.textContent || tempDiv.innerText || '';
    
    return countWordsInText(textContent);
  } catch (error) {
    console.error('Error counting words in HTML:', error);
    return 0;
  }
};

/**
 * Format word count for display
 */
export const formatWordCount = (count: number): string => {
  if (count === 0) return '0 words';
  if (count === 1) return '1 word';
  
  // Add comma separators for large numbers
  const formatted = count.toLocaleString();
  return `${formatted} words`;
};