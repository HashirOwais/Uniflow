// Import required packages
require('dotenv').config();
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const routes = require('./routes');

// Initialize clients
const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());

// Pass prisma client to all routes
app.use((req, res, next) => {
  req.prisma = prisma;
  next();
});

// --- API Routes ---
app.use('/', routes);

// --- Server Initialization ---

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
