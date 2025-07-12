const BaseController = require('./baseController');
const crypto = require('crypto');

class JournalController extends BaseController {
  constructor() {
    super('journal');
  }

  // Create an encrypted journal entry
  createEncrypted = async (req, res) => {
    try {
      const { content, title, date, password } = req.body;
      
      if (!content || !password) {
        return res.status(400).json({ error: 'Content and password are required' });
      }
      
      // Encrypt the content
      const encryptedContent = this.encryptContent(content, password);
      
      // Create entry without storing the password
      const journalEntry = {
        title: title || 'Journal Entry',
        date: date || new Date().toISOString(),
        encryptedContent,
        isEncrypted: true
      };
      
      const newEntry = await this.model.create(journalEntry);
      res.status(201).json(newEntry);
    } catch (error) {
      res.status(400).json({ error: `Failed to create encrypted journal entry: ${error.message}` });
    }
  }

  // Decrypt a journal entry
  decrypt = async (req, res) => {
    try {
      const { id } = req.params;
      const { password } = req.body;
      
      if (!password) {
        return res.status(400).json({ error: 'Password is required' });
      }
      
      const entry = await this.model.getById(id);
      if (!entry) {
        return res.status(404).json({ error: 'Journal entry not found' });
      }
      
      if (!entry.isEncrypted || !entry.encryptedContent) {
        return res.status(400).json({ error: 'Journal entry is not encrypted' });
      }
      
      // Try to decrypt
      try {
        const decryptedContent = this.decryptContent(entry.encryptedContent, password);
        res.json({ ...entry, content: decryptedContent });
      } catch (error) {
        res.status(401).json({ error: 'Invalid password' });
      }
    } catch (error) {
      res.status(500).json({ error: `Failed to decrypt journal entry: ${error.message}` });
    }
  }

  // Utility method to encrypt content
  encryptContent(content, password) {
    // Generate a salt
    const salt = crypto.randomBytes(16).toString('hex');
    
    // Generate a key from password and salt
    const key = crypto.scryptSync(password, salt, 32);
    
    // Generate an initialization vector
    const iv = crypto.randomBytes(16);
    
    // Create cipher
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    
    // Encrypt the content
    let encrypted = cipher.update(content, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    // Get the auth tag
    const authTag = cipher.getAuthTag().toString('hex');
    
    // Return everything needed for decryption
    return {
      content: encrypted,
      iv: iv.toString('hex'),
      salt,
      authTag
    };
  }

  // Utility method to decrypt content
  decryptContent(encryptedData, password) {
    const { content, iv, salt, authTag } = encryptedData;
    
    // Recreate the key
    const key = crypto.scryptSync(password, salt, 32);
    
    // Create decipher
    const decipher = crypto.createDecipheriv(
      'aes-256-gcm', 
      key, 
      Buffer.from(iv, 'hex')
    );
    
    // Set auth tag
    decipher.setAuthTag(Buffer.from(authTag, 'hex'));
    
    // Decrypt
    let decrypted = decipher.update(content, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }

  // Get entries by date range
  getByDateRange = async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      
      if (!startDate || !endDate) {
        return res.status(400).json({ error: 'Start date and end date are required' });
      }
      
      const entries = await this.model.getAll();
      const filteredEntries = entries.filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate >= new Date(startDate) && entryDate <= new Date(endDate);
      });
      
      res.json(filteredEntries);
    } catch (error) {
      res.status(500).json({ error: `Failed to get journal entries by date range: ${error.message}` });
    }
  }
}

module.exports = new JournalController(); 
