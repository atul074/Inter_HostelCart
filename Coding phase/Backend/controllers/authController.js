const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const secretKey = process.env.SECRET_KEY;

const authController = {
  signup: (req, res) => {
    const { emailid, hostelno, roomno, username, userdob, userphoneno, userpassword, userdept, usercourse } = req.body;

    bcrypt.hash(userpassword, 10, (err, hash) => {
      if (err) {
        console.error('Error hashing password:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      User.create(emailid, hostelno, roomno, username, userdob, userphoneno, hash, userdept, usercourse, (err, result) => {
        if (err) {
          console.error('Error executing query:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(201).json({ message: 'User registered successfully' });
      });
    });
  },

  login: (req, res) => {
    const { email, password } = req.body;

    User.findByEmail(email, (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (result.rows.length === 0) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const user = result.rows[0];

      bcrypt.compare(password, user.userpassword, (err, isMatch) => {
        if (err) {
          console.error('Error comparing passwords:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }

        if (!isMatch) {
          return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user.userid, admin: user.admin }, secretKey, { expiresIn: '1h' });
        res.json({ token, admin: user.admin });
      });
    });
  }
};

module.exports = authController;