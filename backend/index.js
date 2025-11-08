// Import required packages
require('dotenv').config();
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const { PrismaClient } = require('@prisma/client');

// Initialize clients
const app = express();
const prisma = new PrismaClient();
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// Middleware
app.use(express.json());

// --- API Routes ---

// A simple test route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Uniflow API!' });
});

// Example route to get all users from the database using Prisma
app.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'An error occurred while fetching users.' });
  }
});

// Example route to create a new user
app.post('/users', async (req, res) => {
    const { email, name } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required.' });
    }

    try {
        const newUser = await prisma.user.create({
            data: {
                email,
                name,
            },
        });
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        // P2002 is the Prisma error code for a unique constraint violation
        if (error.code === 'P2002') {
            return res.status(409).json({ error: 'A user with this email already exists.' });
        }
        res.status(500).json({ error: 'An error occurred while creating the user.' });
    }
});


// --- Server Initialization ---

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('Connected to Prisma and Supabase');
});

// Graceful shutdown for Prisma Client
process.on('beforeExit', async () => {
  await prisma.$disconnect();
  console.log('Prisma client disconnected.');
});
