const API_BASE_URL = "http://localhost:3000"

// Types
export interface User {
  id: number
  email: string
  name: string | null
  createdAt: string
}

export interface Task {
  id: number
  title: string
  description: string | null
  deadline: string
  priority: string
  userId: number
  completed?: boolean
  groupId?: number | null
}

export interface Group {
  id: number
  name: string
  users?: User[]
}

export interface Event {
  id: number
  title: string
  notes: string | null
  startTime: string
  endTime: string
  userId: number
  groupId?: number | null
  group?: Group | null
  completed?: boolean
}

// Users API
export const usersApi = {
  getAll: async (): Promise<User[]> => {
    const response = await fetch(`${API_BASE_URL}/users`)
    if (!response.ok) throw new Error("Failed to fetch users")
    return response.json()
  },

  create: async (data: { email: string; name?: string }): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to create user")
    return response.json()
  },
}

// Tasks API
export const tasksApi = {
  getAll: async (): Promise<Task[]> => {
    const response = await fetch(`${API_BASE_URL}/tasks`)
    if (!response.ok) throw new Error("Failed to fetch tasks")
    return response.json()
  },

  getById: async (id: number): Promise<Task> => {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`)
    if (!response.ok) throw new Error("Failed to fetch task")
    return response.json()
  },

  create: async (data: {
    title: string
    description?: string
    deadline: string
    priority: string
    userId: number
    groupId?: number | null
  }): Promise<Task> => {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to create task")
    return response.json()
  },

  update: async (
    id: number,
    data: {
      title?: string
      description?: string
      deadline?: string
      priority?: string
      completed?: boolean
      groupId?: number | null
    }
  ): Promise<Task> => {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to update task")
    return response.json()
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) throw new Error("Failed to delete task")
  },
}

// Groups API
export const groupsApi = {
  getAll: async (): Promise<Group[]> => {
    const response = await fetch(`${API_BASE_URL}/groups`)
    if (!response.ok) throw new Error("Failed to fetch groups")
    return response.json()
  },

  getById: async (id: number): Promise<Group> => {
    const response = await fetch(`${API_BASE_URL}/groups/${id}`)
    if (!response.ok) throw new Error("Failed to fetch group")
    return response.json()
  },

  create: async (data: {
    name: string
    userIds: number[]
  }): Promise<Group> => {
    const response = await fetch(`${API_BASE_URL}/groups`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to create group")
    return response.json()
  },

  update: async (
    id: number,
    data: { name?: string; userIds?: number[] }
  ): Promise<Group> => {
    const response = await fetch(`${API_BASE_URL}/groups/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to update group")
    return response.json()
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/groups/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) throw new Error("Failed to delete group")
  },
}

// Events API
export const eventsApi = {
  getAll: async (): Promise<Event[]> => {
    const response = await fetch(`${API_BASE_URL}/events`)
    if (!response.ok) throw new Error("Failed to fetch events")
    return response.json()
  },

  getById: async (id: number): Promise<Event> => {
    const response = await fetch(`${API_BASE_URL}/events/${id}`)
    if (!response.ok) throw new Error("Failed to fetch event")
    return response.json()
  },

  create: async (data: {
    title: string
    notes?: string
    startTime: string
    endTime: string
    userId: number
    groupId?: number | null
  }): Promise<Event> => {
    const response = await fetch(`${API_BASE_URL}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to create event")
    return response.json()
  },

  update: async (
    id: number,
    data: {
      title?: string
      notes?: string
      startTime?: string
      endTime?: string
      completed?: boolean
      groupId?: number | null
    }
  ): Promise<Event> => {
    const response = await fetch(`${API_BASE_URL}/events/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to update event")
    return response.json()
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/events/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) throw new Error("Failed to delete event")
  },
}

