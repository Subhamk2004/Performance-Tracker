// codeUtils.js - Separate utility functions for code detection and formatting

/**
 * Detects programming language from code content
 * @param {string} code The code to analyze
 * @returns {string} The detected language name
 */
export const detectLanguage = (code) => {
    // C++ patterns
    if (code.includes('vector<') || code.includes('cout') || code.includes('#include') || 
        code.includes('int main(') || code.includes('std::')) {
      return 'cpp'
    }
    // JavaScript/React patterns
    else if (code.includes('import React') || code.includes('useState') || 
        code.includes('export default') || 
        (code.includes('const') && code.includes('=>'))) {
      return 'jsx'
    } 
    // Python patterns
    else if ((code.includes('def ') && code.includes(':')) || 
        (code.includes('import ') && !code.includes(';') && !code.includes('{')) || 
        (code.includes('class ') && code.includes(':'))) {
      return 'python'
    } 
    // PHP patterns
    else if (code.includes('<?php') || code.includes('<?=')) {
      return 'php'
    } 
    // HTML patterns
    else if (code.includes('<!DOCTYPE html>') || code.match(/<\/?[a-z][\s\S]*>/i)) {
      return 'html'
    } 
    // Go patterns
    else if ((code.includes('func ') && code.includes('{')) || code.includes('package ')) {
      return 'go'
    } 
    // Java patterns
    else if (code.includes('public class') || 
        (code.includes('private ') && code.includes('class')) || 
        (code.includes('protected ') && code.includes('class'))) {
      return 'java'
    }
    // Default to JavaScript/TypeScript
    return 'javascript'
  }
  
  // Patterns that strongly indicate code presence
  export const strongCodePatterns = [
    // C++ patterns
    /vector<.*>/,
    /sort\(\w+\.begin\(\)/,
    /push_back\(/,
    /include\s*</,
    /\w+\[.+\]\[.+\]/,
    
    // General programming patterns
    /function\s+\w+\s*\([^)]*\)/,
    /if\s*\([^)]*\)/,
    /for\s*\([^)]*\)/,
    /while\s*\([^)]*\)/,
    /switch\s*\([^)]*\)/,
    /class\s+\w+/,
    /return\s+[\w\{\[\"\'\`\d]/,
    /import\s+.*from/,
    /export\s+/,
    /const\s+\w+\s*=\s*/,
    /let\s+\w+\s*=\s*/,
    /var\s+\w+\s*=\s*/,
    /^\s*#\w+/m,  // C/C++ preprocessor directives
    /^\s*@\w+/m,  // Java/TypeScript decorators
  ]
  
  /**
   * Preserves logical expressions and statements that should stay on one line
   * @param {string} code The code to preserve
   * @returns {string} Code with preserved expressions marked
   */
  const preserveLogicalExpressions = (code) => {
    // Temporarily replace spaces in certain expressions to prevent unwanted line breaks
    let result = code;
    
    // Find for loop conditions and preserve them
    result = result.replace(/for\s*\(\s*([^;]+;\s*[^;]+;\s*[^)]+)\s*\)/g, (match, condition) => {
      return match.replace(/\s+/g, '█'); // Replace spaces with a marker character
    });
    
    // Find if conditions and preserve them
    result = result.replace(/if\s*\(\s*([^)]+)\s*\)/g, (match, condition) => {
      return match.replace(/\s+/g, '█');
    });
    
    // Find while conditions and preserve them
    result = result.replace(/while\s*\(\s*([^)]+)\s*\)/g, (match, condition) => {
      return match.replace(/\s+/g, '█');
    });
    
    // Find function calls with arguments and preserve them
    result = result.replace(/(\w+)\s*\(\s*([^)]*)\s*\)/g, (match, funcName, args) => {
      return match.replace(/\s+/g, '█');
    });
    
    return result;
  }
  
  /**
   * Restores preserved expressions back to normal
   * @param {string} code The code with preserved expressions
   * @returns {string} Code with normal spaces
   */
  const restoreLogicalExpressions = (code) => {
    return code.replace(/█/g, ' ');
  }
  
  /**
   * Formats code content with proper indentation and structure
   * @param {string} code The code to format
   * @param {string} language The detected language 
   * @returns {string} Formatted code
   */
  export const formatCodeContent = (code, language) => {
    // Check if code is on a single line or broken into fragments
    const lines = code.split('\n');
    let formattedCode = '';
    
    // Step 1: Join code fragments if they seem to be part of the same statement
    if (lines.length > 1) {
      let joined = '';
      let currentStatement = '';
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Skip empty lines
        if (!line) continue;
        
        // Check if this line ends a statement
        const isStatementEnd = line.endsWith(';') || 
                            line.endsWith('{') || 
                            line.endsWith('}') ||
                            ((language === 'python' || language === 'ruby') && line.endsWith(':'));
        
        // Check if this line starts a completely new statement
        const isNewStatement = line.startsWith('for') ||
                            line.startsWith('if') ||
                            line.startsWith('else') ||
                            line.startsWith('while') ||
                            line.startsWith('function') ||
                            line.startsWith('class') ||
                            line.startsWith('#include') ||
                            line.startsWith('import') ||
                            line.startsWith('return') ||
                            line.startsWith('vector<');
        
        // If this is a continuation of a statement, join it
        if (!isNewStatement || currentStatement === '') {
          currentStatement += (currentStatement ? ' ' : '') + line;
        } else {
          // Finish the current statement before starting a new one
          if (currentStatement) {
            joined += currentStatement + '\n';
            currentStatement = '';
          }
          currentStatement = line;
        }
        
        // End of statement, add to joined result
        if (isStatementEnd) {
          joined += currentStatement + '\n';
          currentStatement = '';
        }
      }
      
      // Add any remaining statement
      if (currentStatement) {
        joined += currentStatement;
      }
      
      formattedCode = joined;
    } else {
      formattedCode = code.trim();
    }
    
    // Step 2: Apply proper formatting to the joined code
    formattedCode = preserveLogicalExpressions(formattedCode);
    
    // Apply formatting rules
    formattedCode = formattedCode
      // Add line break after opening brace
      .replace(/\{(?!\n)/g, "{\n  ")
      // Add line break before closing brace
      .replace(/([^\n])\}/g, "$1\n}")
      // Add line break after semicolons (that aren't inside for loop conditions)
      .replace(/;(?!\s*$|\s*\n)/g, ";\n")
      // Add line break after function declaration with opening brace
      .replace(/function\s+\w+\s*\([^)]*\)\s*\{/g, match => match.replace("{", "{\n  "))
      // Add line break after if statement with opening brace
      .replace(/if\s*\([^)]*\)\s*\{/g, match => match.replace("{", "{\n  "))
      // Add line break after for loop with opening brace
      .replace(/for\s*\([^)]*\)\s*\{/g, match => match.replace("{", "{\n  "))
      // Add line break after while loop with opening brace
      .replace(/while\s*\([^)]*\)\s*\{/g, match => match.replace("{", "{\n  "));
    
    // Restore spaces in logical expressions
    formattedCode = restoreLogicalExpressions(formattedCode);
    
    // Apply proper indentation
    formattedCode = applyIndentation(formattedCode);
    
    return formattedCode;
  }
  
  /**
   * Applies proper indentation to code
   * @param {string} code The code to indent
   * @returns {string} Properly indented code
   */
  const applyIndentation = (code) => {
    const lines = code.split('\n');
    const result = [];
    let indentLevel = 0;
    
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();
      
      // Skip empty lines
      if (!line) {
        result.push('');
        continue;
      }
      
      // Decrease indent for lines with just a closing brace/bracket
      if (line.match(/^[\}\]\)]+$/)) {
        indentLevel = Math.max(0, indentLevel - 1);
      }
      
      // Add proper indentation
      result.push(' '.repeat(indentLevel * 2) + line);
      
      // Count opening and closing braces/brackets to determine indent level for next line
      const openBraces = (line.match(/\{/g) || []).length;
      const closeBraces = (line.match(/\}/g) || []).length;
      
      // Don't increase indent level for one-liners like { }
      if (!(openBraces === 1 && closeBraces === 1 && line.includes('{'))) {
        indentLevel += openBraces - closeBraces;
      }
      
      // Ensure indent level doesn't go negative
      indentLevel = Math.max(0, indentLevel);
    }
    
    return result.join('\n');
  }

  /**
   * Formats text content with line breaks after periods
   * @param {string} text The text content to format
   * @returns {string} Formatted text with line breaks after periods
   */
  const formatTextContent = (text) => {
    // Add line break and blank line after each period followed by space or end of line
    // This regex matches a period followed by either a space or end of line
    // The lookbehind (?<!\.\.) ensures we don't match ellipsis (...) 
    // The lookahead (?!\d) ensures we don't match decimal points in numbers
    return text.replace(/(?<!\.)\.(?!\d)(\s|$)/g, '.\n\n');
  }
  
  /**
   * Detects and processes code blocks in content
   * @param {string} content The text content to analyze
   * @returns {Array} Array of content parts (text or code)
   */
  export const detectCodeBlocks = (content) => {
    if (!content) return []
    
    // Check for explicit code blocks with triple backticks first
    const codeBlockRegex = /```(?:(\w+)?\n)?([\s\S]*?)```/g
    const hasExplicitCodeBlocks = codeBlockRegex.test(content)
    
    if (hasExplicitCodeBlocks) {
      const parts = []
      let lastIndex = 0
      let match
      
      // Reset regex state
      codeBlockRegex.lastIndex = 0
      
      while ((match = codeBlockRegex.exec(content)) !== null) {
        const [fullMatch, language, code] = match
        const index = match.index
        
        // Add text before code block
        if (index > lastIndex) {
          const textContent = content.substring(lastIndex, index).trim()
          parts.push({
            type: "text",
            content: formatTextContent(textContent) // Apply text formatting for periods
          })
        }
        
        // Add formatted code block
        const detectedLang = language || detectLanguage(code)
        parts.push({
          type: "code",
          content: formatCodeContent(code, detectedLang),
          language: detectedLang
        })
        
        lastIndex = index + fullMatch.length
      }
      
      // Add any remaining text
      if (lastIndex < content.length) {
        const textContent = content.substring(lastIndex).trim()
        parts.push({
          type: "text",
          content: formatTextContent(textContent) // Apply text formatting for periods
        })
      }
      
      return parts.filter(part => part.content.trim().length > 0)
    }
    
    // No explicit code blocks, try to detect based on patterns
    const isLikelyCodeContent = strongCodePatterns.some(pattern => pattern.test(content))
    
    if (isLikelyCodeContent) {
      // Split content into potential paragraphs
      const paragraphs = content.split(/\n\s*\n/) 
      
      const parts = []
      
      // Process each paragraph to detect if it's code
      for (const paragraph of paragraphs) {
        const trimmedParagraph = paragraph.trim()
        
        // Skip empty paragraphs
        if (!trimmedParagraph) continue
        
        // Check if paragraph contains code patterns
        const isCodeParagraph = strongCodePatterns.some(pattern => 
          pattern.test(trimmedParagraph)
        ) || (
          // Additional heuristics for one-liners
          trimmedParagraph.includes('{') && 
          (trimmedParagraph.includes('}') || trimmedParagraph.includes('(') || trimmedParagraph.includes(';'))
        )
        
        if (isCodeParagraph) {
          const lang = detectLanguage(trimmedParagraph)
          parts.push({
            type: "code",
            content: formatCodeContent(trimmedParagraph, lang),
            language: lang
          })
        } else {
          parts.push({
            type: "text",
            content: formatTextContent(trimmedParagraph) // Apply text formatting for periods
          })
        }
      }
      
      return parts.filter(part => part.content.trim().length > 0)
    }
    
    // If nothing looks like code, return the whole content as text with period formatting
    return [{
      type: "text",
      content: formatTextContent(content)
    }]
  }