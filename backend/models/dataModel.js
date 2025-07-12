const fs = require('fs');
const path = require('path');

class DataModel {
  constructor(entity) {
    this.dataPath = path.join(__dirname, '..', 'data', `${entity}.json`);
    this.entity = entity;
    this.ensureFile();
  }

  ensureFile() {
    if (!fs.existsSync(this.dataPath)) {
      fs.writeFileSync(this.dataPath, JSON.stringify([], null, 2));
    }
  }

  async getAll() {
    try {
      const data = await fs.promises.readFile(this.dataPath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error(`Error reading ${this.entity} data:`, error);
      return [];
    }
  }

  async getById(id) {
    try {
      const data = await this.getAll();
      return data.find(item => item.id === id);
    } catch (error) {
      console.error(`Error getting ${this.entity} by ID:`, error);
      return null;
    }
  }

  async create(item) {
    try {
      const data = await this.getAll();
      const newItem = {
        ...item,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      data.push(newItem);
      await fs.promises.writeFile(this.dataPath, JSON.stringify(data, null, 2));
      return newItem;
    } catch (error) {
      console.error(`Error creating ${this.entity}:`, error);
      throw error;
    }
  }

  async update(id, updates) {
    try {
      const data = await this.getAll();
      const index = data.findIndex(item => item.id === id);
      
      if (index === -1) {
        throw new Error(`${this.entity} with ID ${id} not found`);
      }
      
      data[index] = {
        ...data[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      
      await fs.promises.writeFile(this.dataPath, JSON.stringify(data, null, 2));
      return data[index];
    } catch (error) {
      console.error(`Error updating ${this.entity}:`, error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const data = await this.getAll();
      const filteredData = data.filter(item => item.id !== id);
      
      if (data.length === filteredData.length) {
        throw new Error(`${this.entity} with ID ${id} not found`);
      }
      
      await fs.promises.writeFile(this.dataPath, JSON.stringify(filteredData, null, 2));
      return true;
    } catch (error) {
      console.error(`Error deleting ${this.entity}:`, error);
      throw error;
    }
  }
}

module.exports = DataModel; 
