const createGroup = async (req, res) => {
  const { prisma } = req;
  const { name, userIds } = req.body;

  if (!name || !userIds) {
    return res.status(400).json({ error: 'Name and userIds are required.' });
  }

  try {
    const group = await prisma.group.create({
      data: {
        name,
        users: {
          connect: userIds.map((id) => ({ id })),
        },
      },
    });
    res.status(201).json(group);
  } catch (error) {
    console.error('Error creating group:', error);
    res.status(500).json({ error: 'An error occurred while creating the group.' });
  }
};

const getGroups = async (req, res) => {
  const { prisma } = req;
  try {
    const groups = await prisma.group.findMany({
      include: {
        users: true,
      },
    });
    res.json(groups);
  } catch (error) {
    console.error('Error fetching groups:', error);
    res.status(500).json({ error: 'An error occurred while fetching groups.' });
  }
};

const getGroupById = async (req, res) => {
  const { prisma } = req;
  const { id } = req.params;
  try {
    const group = await prisma.group.findUnique({
      where: { id: Number(id) },
      include: {
        users: true,
      },
    });
    if (!group) {
      return res.status(404).json({ error: 'Group not found.' });
    }
    res.json(group);
  } catch (error) {
    console.error('Error fetching group:', error);
    res.status(500).json({ error: 'An error occurred while fetching the group.' });
  }
};

const updateGroup = async (req, res) => {
  const { prisma } = req;
  const { id } = req.params;
  const { name, userIds } = req.body;

  try {
    const group = await prisma.group.update({
      where: { id: Number(id) },
      data: {
        name,
        users: {
          set: userIds.map((id) => ({ id })),
        },
      },
    });
    res.json(group);
  } catch (error) {
    console.error('Error updating group:', error);
    res.status(500).json({ error: 'An error occurred while updating the group.' });
  }
};

const deleteGroup = async (req, res) => {
  const { prisma } = req;
  const { id } = req.params;

  try {
    await prisma.group.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting group:', error);
    res.status(500).json({ error: 'An error occurred while deleting the group.' });
  }
};

module.exports = {
  createGroup,
  getGroups,
  getGroupById,
  updateGroup,
  deleteGroup,
};