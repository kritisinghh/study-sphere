const DataModel = require('../models/dataModel');

class BaseController {
  constructor(entityName) {
    this.model = new DataModel(entityName);
    this.entityName = entityName;
  }

  getAll = async (req, res) => {
    try {
      const items = await this.model.getAll();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: `Failed to get ${this.entityName}s: ${error.message}` });
    }
  }

  getById = async (req, res) => {
    try {
      const item = await this.model.getById(req.params.id);
      
      if (!item) {
        return res.status(404).json({ error: `${this.entityName} not found` });
      }
      
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: `Failed to get ${this.entityName}: ${error.message}` });
    }
  }

  create = async (req, res) => {
    try {
      const newItem = await this.model.create(req.body);
      res.status(201).json(newItem);
    } catch (error) {
      res.status(400).json({ error: `Failed to create ${this.entityName}: ${error.message}` });
    }
  }

  update = async (req, res) => {
    try {
      const updatedItem = await this.model.update(req.params.id, req.body);
      res.json(updatedItem);
    } catch (error) {
      if (error.message.includes('not found')) {
        return res.status(404).json({ error: error.message });
      }
      res.status(400).json({ error: `Failed to update ${this.entityName}: ${error.message}` });
    }
  }

  delete = async (req, res) => {
    try {
      await this.model.delete(req.params.id);
      res.json({ message: `${this.entityName} deleted successfully` });
    } catch (error) {
      if (error.message.includes('not found')) {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: `Failed to delete ${this.entityName}: ${error.message}` });
    }
  }
}

module.exports = BaseController; 
