const getUsers = async (req, res) => {
  const { prisma } = req;
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
};

const createUser = async (req, res) => {
  const { prisma } = req;
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
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'A user with this email already exists.' });
    }
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'An error occurred while creating the user.' });
  }
};

const createTask = async (req, res) => {
  const { prisma } = req;
  const { title, userId } = req.body;

  if (!title || !userId) {
    return res.status(400).json({ error: 'Title and userId are required.' });
  }

  try {
    const task = await prisma.task.create({
      data: {
        title,
        userId,
      },
    });
    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'An error occurred while creating the task.' });
  }
};

module.exports = {
  getUsers,
  createUser,
  createTask,
};
