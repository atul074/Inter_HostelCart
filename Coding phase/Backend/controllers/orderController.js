const Order = require('../models/orderModel');

const orderController = {
  createOrder: (req, res) => {
    const userId = req.user.userId;
    const { items, totalAmount } = req.body;

    Order.create(userId, items, totalAmount, (err, result) => {
      if (err) {
        console.error('Error creating order:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.status(201).json({ message: 'Order created successfully', order: result.rows[0] });
    });
  },

  getUserOrders: (req, res) => {
    const userId = req.user.userId;
    
    Order.findByUserId(userId, (err, result) => {
      if (err) {
        console.error('Error retrieving orders:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.json({ orders: result.rows });
    });
  },

  getOrderById: (req, res) => {
    const orderId = req.params.id;

    Order.findById(orderId, (err, result) => {
      if (err) {
        console.error('Error retrieving order:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Order not found' });
      }

      res.json({ order: result.rows[0] });
    });
  }
};

module.exports = orderController;