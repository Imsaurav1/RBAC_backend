import express from 'express';
import { Getuser, deletUser } from '../controllers/Admin.js';
import { isAdmin } from '../middleware/verifyToken.js';
import User from '../models/user.js'; // Import the User model

const AdminRoutes = express.Router();

// Fetch all users
AdminRoutes.get('/getuser', isAdmin, Getuser);

// Delete a user
AdminRoutes.delete('/delet/:id', isAdmin, deletUser);

// Update user role (added functionality)
AdminRoutes.post('/update-role', isAdmin, async (req, res) => {
  const { id, role } = req.body;

  // Validate input
  if (!id || !role) {
    //return res.status(400).json({ message: 'User ID and role are required' });
  }

  // Validate role value
 
  try {
    // Find the user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's role
    user.role = role;
    await user.save();

    res.status(200).json({ message: `User role updated to ${role}` });
  } catch (error) {
    //console.error('Error updating role:', error);
    res.status(500).json({ message: 'Failed to update user role' });
  }
});

export default AdminRoutes;
