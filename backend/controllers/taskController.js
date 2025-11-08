const createTask = async (req, res) => {
  const { prisma } = req;
  const { title, description, deadline, priority, userId } = req.body;

  if (!title || !deadline || !priority || !userId) {
    return res.status(400).json({ error: 'Title, deadline, priority, and userId are required.' });
  }

  try {
    const task = await prisma.task.create({
      data: {
        title,
        description,
        deadline,
        priority,
        userId,
      },
    });
    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'An error occurred while creating the task.' });
  }
};

const getTasks = async (req, res) => {
  const { prisma } = req;
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'An error occurred while fetching tasks.' });
  }
};

const getTaskById = async (req, res) => {
  const { prisma } = req;
  const { id } = req.params;
  try {
    const task = await prisma.task.findUnique({
      where: { id: Number(id) },
    });
    if (!task) {
      return res.status(404).json({ error: 'Task not found.' });
    }
    res.json(task);
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ error: 'An error occurred while fetching the task.' });
  }
};

const updateTask = async (req, res) => {
  const { prisma } = req;
  const { id } = req.params;
  const { title, description, deadline, priority, completed } = req.body;

  try {
    const task = await prisma.task.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        deadline,
        priority,
        completed,
      },
    });
    res.json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'An error occurred while updating the task.' });
  }
};

const deleteTask = async (req, res) => {
  const { prisma } = req;
  const { id } = req.params;

  try {
    await prisma.task.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'An error occurred while deleting the task.' });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
