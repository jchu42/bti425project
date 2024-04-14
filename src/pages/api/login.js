// pages/api/login.js

import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { username, password } = req.body;

      // Connect to MongoDB
      const client = new MongoClient(process.env.MONGODB_URI);
      await client.connect();

      // Check if the username and password match a user in the database
      const db = client.db('BTIProject');
      const usersCollection = db.collection('users');
      const user = await usersCollection.findOne({ username, password });

      if (user) {
        // If user exists, login is successful
        res.status(200).json({ message: 'Login successful' });
      } else {
        // If user does not exist or password is incorrect, return an error response
        res.status(401).json({ message: 'Invalid username or password' });
      }

      await client.close();
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
