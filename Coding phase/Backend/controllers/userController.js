const User = require('../models/userModel');
// const Cart = require('../models/cartModel');

const userController = {
  getProfile: (req, res) => {
    const userId = req.user.userId;
    

    User.findById(userId, (err, userResult) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (userResult.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
    
        res.json({
          user: userResult.rows[0]
        });
    });
  },

  updateProfile: (req, res) => {
    const userId = req.user.userId;
    const { mobileNumber } = req.body;

    User.updateMobileNumber(userId, mobileNumber, (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.json({ message: 'Profile updated successfully' });
    });
  },

  uploadProfileImage: (req, res) => {
    const userId = req.user.userId;
    const { image } = req.body;

    User.updateProfileImage(userId, image, (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.json({ message: 'Profile image updated successfully' });
    });
  },
  getusers:(req,res)=>{
    User.getAll((err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ error: err.message });
      }
      res.send(result);
    });
  }
};

module.exports = userController;