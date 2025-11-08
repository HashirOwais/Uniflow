import { useState } from "react"
import { Button } from "@/components/ui/button"
import { TaskCard } from "@/components/TaskCard"
import type { Task, TaskPriority } from "@/types/task"

type FilterType = "ALL" | TaskPriority;

const mockTasks: Task[] = [
  {
    id: 1,
    title: "Data Structures Assignment",
    description: "Complete chapter 5 exercises and submit",
    deadline: new Date("2025-11-09T14:00:00"),
    priority: "HIGH",
    course: "CS 201",
    completed: false
  },
  {
    id: 2,
    title: "Study for Calculus Midterm",
    description: "Review integration techniques",
    deadline: new Date("2025-11-11T16:00:00"),
    priority: "HIGH",
    course: "MATH 210",
    completed: false
  },
  {
    id: 3,
    title: "Physics Lab Report",
    description: "Write up experiments from last week",
    deadline: new Date("2025-11-10T16:00:00"),
    priority: "MEDIUM",
    course: "PHYS 101",
    completed: false
  }
]

export function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks)
  const [activeFilter, setActiveFilter] = useState<FilterType>("ALL")

  const filteredTasks = tasks.filter(task => 
    activeFilter === "ALL" ? true : task.priority === activeFilter
  )

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const handleToggleComplete = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">My Tasks</h1>
        <p className="text-sm text-muted-foreground">
          {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'} to manage
        </p>
      </div>

      <div className="mb-6 flex gap-2">
        {['ALL', 'HIGH', 'MEDIUM', 'LOW'].map((filter) => (
          <Button
            key={filter}
            variant={activeFilter === filter ? 'secondary' : 'ghost'}
            className={
              filter === 'ALL'
                ? 'bg-secondary/50'
                : filter === 'HIGH'
                ? 'bg-red-100/50 text-red-700 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400'
                : filter === 'MEDIUM'
                ? 'bg-yellow-100/50 text-yellow-700 hover:bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400'
                : 'bg-green-100/50 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400'
            }
            onClick={() => setActiveFilter(filter as FilterType)}
          >
            {filter === 'ALL' ? 'All Tasks' : `${filter} Priority`}
          </Button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredTasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={handleDeleteTask}
            onToggleComplete={handleToggleComplete}
          />
        ))}
      </div>
    </div>
  )
}