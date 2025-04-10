// Client-side encryption utilities
// Note: For a real whistleblowing platform, server-side encryption would be used for sensitive data
// This is a simplified implementation for demonstration purposes

/**
 * Encrypts data using AES algorithm (browser's SubtleCrypto API)
 * In a production environment, end-to-end encryption should be implemented properly
 * 
 * @param {Object|string} data - Data to encrypt
 * @returns {Promise<string>} - Encrypted data as base64 string
 */
export const encryptData = async (data) => {
  try {
    // In a real implementation, we would use proper key exchange protocols
    // For demonstration, we're just simulating encryption
    
    const serializedData = typeof data === 'string' ? data : JSON.stringify(data);
    
    // This is a mock implementation - in a real app, we would use actual encryption
    console.log('Encrypting data (mock):', serializedData);
    
    // Return a simulated "encrypted" string - this is NOT real encryption
    // In production, use proper cryptographic libraries
    const mockEncrypted = btoa(serializedData);
    return mockEncrypted;
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt data');
  }
};

/**
 * Decrypts data (mock implementation)
 * 
 * @param {string} encryptedData - Encrypted data as base64 string
 * @returns {Promise<Object|string>} - Decrypted data
 */
export const decryptData = async (encryptedData) => {
  try {
    // This is a mock implementation - in a real app, we would use actual decryption
    const decoded = atob(encryptedData);
    
    // Try to parse as JSON if possible
    try {
      return JSON.parse(decoded);
    } catch (e) {
      // If not valid JSON, return as string
      return decoded;
    }
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Failed to decrypt data');
  }
};

/**
 * Generates a random token for secure access
 * 
 * @param {number} length - Length of the token
 * @returns {string} - Random token
 */
export const generateRandomToken = (length = 32) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  
  // Use the more secure Crypto API if available
  if (window.crypto && window.crypto.getRandomValues) {
    const values = new Uint32Array(length);
    window.crypto.getRandomValues(values);
    
    for (let i = 0; i < length; i++) {
      token += characters[values[i] % characters.length];
    }
  } else {
    // Fallback to less secure Math.random
    for (let i = 0; i < length; i++) {
      token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
  }
  
  return token;
};

/**
 * Hashes a string using SHA-256 (browser's SubtleCrypto API)
 * 
 * @param {string} text - Text to hash
 * @returns {Promise<string>} - Hashed string as hex
 */
export const hashString = async (text) => {
  try {
    // Convert string to buffer
    const msgBuffer = new TextEncoder().encode(text);
    
    // Hash the message
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgBuffer);
    
    // Convert hash to hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    return hashHex;
  } catch (error) {
    console.error('Hashing error:', error);
    
    // Fallback for browsers that don't support SubtleCrypto
    // Note: This is NOT cryptographically secure and should NOT be used in production
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(16);
  }
};