//API Route for registration
// pages/api/register.js

// pages/api/register.js

import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { username, password } = req.body;

      // Connect to MongoDB
      const client = new MongoClient(process.env.MONGODB_URI);
      await client.connect();

      // Check if the username already exists
      const db = client.db('BTIProject');
      const usersCollection = db.collection('users');
      const existingUser = await usersCollection.findOne({ username });

      if (existingUser) {
        // If the username already exists, return an error response
        await client.close();
        return res.status(400).json({ error: 'Username already exists', code: 'USER_EXISTS' });
      }

      // Insert user data into the database
      const hashedPassword = await hashPassword(password);
      await usersCollection.insertOne({ username, hashedPassword });

      await client.close();

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
// Function to hash password
const hashPassword = async (password) => {
  const saltRounds = 10; // Number of salt rounds for bcrypt
  return await bcrypt.hash(password, saltRounds);
};