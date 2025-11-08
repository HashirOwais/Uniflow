import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { Task, TaskPriority } from "@/types/task"

interface AddTaskDialogProps {
  onAddTask: (task: Omit<Task, "id">) => void;
}

export function AddTaskDialog({ onAddTask }: AddTaskDialogProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    priority: "MEDIUM" as TaskPriority,
    course: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const task = {
      ...formData,
      deadline: new Date(formData.deadline),
      completed: false,
    }
    onAddTask(task)
    setFormData({
      title: "",
      description: "",
      deadline: "",
      priority: "MEDIUM",
      course: "",
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="w-full rounded-md border border-input bg-transparent px-3 py-2"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              id="description"
              className="w-full rounded-md border border-input bg-transparent px-3 py-2"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="deadline" className="block text-sm font-medium mb-1">
                Deadline
              </label>
              <input
                type="datetime-local"
                id="deadline"
                className="w-full rounded-md border border-input bg-transparent px-3 py-2"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                required
              />
            </div>

            <div>
              <label htmlFor="priority" className="block text-sm font-medium mb-1">
                Priority
              </label>
              <select
                id="priority"
                className="w-full rounded-md border border-input bg-transparent px-3 py-2"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as TaskPriority })}
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="course" className="block text-sm font-medium mb-1">
              Course (Optional)
            </label>
            <input
              type="text"
              id="course"
              className="w-full rounded-md border border-input bg-transparent px-3 py-2"
              value={formData.course}
              onChange={(e) => setFormData({ ...formData, course: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" type="button" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Task</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}