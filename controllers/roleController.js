// controllers/roleController.js
const RoleModel = require('../models/roleModel');

const getRoles = async (req, res) => {
  try {
    const roles = await RoleModel.getAllRoles();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRoleById = async (req, res) => {
  const { id } = req.params;
  try {
    const role = await RoleModel.getRoleById(id);
    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }
    res.json(role);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createRole = async (req, res) => {
  const newRole = req.body;
  try {
    await RoleModel.createRole(newRole);
    res.status(201).json({ message: 'Role created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateRole = async (req, res) => {
  const { id } = req.params;
  const updatedRole = req.body;
  try {
    await RoleModel.updateRole(id, updatedRole);
    res.status(200).json({ message: 'Role updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteRole = async (req, res) => {
  const { id } = req.params;
  try {
    await RoleModel.deleteRole(id);
    res.status(200).json({ message: 'Role deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
};