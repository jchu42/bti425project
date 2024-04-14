// pages/api/login.js

import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
      const user = await usersCollection.findOne({ username});

      if (user) {
        // If user exists, move on to checking the password
        const isPasswordMatch = await bcrypt.compare(password, user.hashedPassword);
        if (isPasswordMatch) {
            const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
            const favorites = JSON.parse(user.favorites);
            console.log("favorites: ", favorites)
            const history = JSON.parse(user.history);
            console.log("history: ", history)
            res.status(200).json({ message: 'Login successful. Redirecting to Home...', token, favorites, history });
        } else {
            // If passwords don't match, return an error response
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } else {
        // If user does not exist, return an error response
        res.status(401).json({ message: 'Username does not exist' });
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
