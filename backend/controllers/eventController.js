const createEvent = async (req, res) => {
  const { prisma } = req;
  const { title, notes, startTime, endTime, userId } = req.body;

  if (!title || !startTime || !endTime || !userId) {
    return res.status(400).json({ error: 'Title, startTime, endTime, and userId are required.' });
  }

  try {
    const event = await prisma.event.create({
      data: {
        title,
        notes,
        startTime,
        endTime,
        userId,
      },
    });
    res.status(201).json(event);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'An error occurred while creating the event.' });
  }
};

const getEvents = async (req, res) => {
  const { prisma } = req;
  try {
    const events = await prisma.event.findMany();
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'An error occurred while fetching events.' });
  }
};

const getEventById = async (req, res) => {
  const { prisma } = req;
  const { id } = req.params;
  try {
    const event = await prisma.event.findUnique({
      where: { id: Number(id) },
    });
    if (!event) {
      return res.status(404).json({ error: 'Event not found.' });
    }
    res.json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ error: 'An error occurred while fetching the event.' });
  }
};

const updateEvent = async (req, res) => {
  const { prisma } = req;
  const { id } = req.params;
  const { title, notes, startTime, endTime } = req.body;

  try {
    const event = await prisma.event.update({
      where: { id: Number(id) },
      data: {
        title,
        notes,
        startTime,
        endTime,
      },
    });
    res.json(event);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ error: 'An error occurred while updating the event.' });
  }
};

const deleteEvent = async (req, res) => {
  const { prisma } = req;
  const { id } = req.params;

  try {
    await prisma.event.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'An error occurred while deleting the event.' });
  }
};

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};