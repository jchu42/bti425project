// pages/api/login.js

import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function updatehistory(req, res) {
  if (req.method === 'POST') {
    try {
        const token = req.headers.authorization;
        const history = req.headers.history
        const username = jwt.verify(token, process.env.JWT_SECRET).username;
    }
    catch (error){
      res.status(401).json({message: "Invalid token"});
      return;
    }
    try{

        // Connect to MongoDB
        const client = new MongoClient(process.env.MONGODB_URI);
        await client.connect();

        // Check if the username and password match a user in the database
        const db = client.db('BTIProject');
        const usersCollection = db.collection('users');
        const user = await usersCollection.findOne({ username});

        if (user) {
            //const history = user.history;

            await usersCollection.updateOne({ username }, {$set: {history: history}});

            res.status(200).json({message: "synced history"});
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
