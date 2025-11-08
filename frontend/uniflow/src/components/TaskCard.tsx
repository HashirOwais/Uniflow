import { Trash2, Circle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { TaskCardProps } from "@/types/task"
import { format } from "date-fns"

const priorityBadgeColors = {
  HIGH: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  MEDIUM: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  LOW: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
}

export function TaskCard({ task, onDelete, onToggleComplete }: TaskCardProps) {
  return (
    <div className="group relative flex items-start gap-4 rounded-lg border bg-card p-4 transition-all hover:shadow-md">
      <Button
        variant="ghost"
        size="icon"
        className={`h-5 w-5 p-0 ${task.completed ? "text-green-500" : "text-muted-foreground"}`}
        onClick={() => onToggleComplete(task.id)}
      >
        {task.completed ? (
          <CheckCircle2 className="h-5 w-5" />
        ) : (
          <Circle className="h-5 w-5" />
        )}
      </Button>

      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <h3 className={`font-medium ${task.completed ? "text-muted-foreground line-through" : ""}`}>
            {task.title}
          </h3>
          <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${priorityBadgeColors[task.priority]}`}>
            {task.priority}
          </span>
          {task.course && (
            <span className="rounded bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
              {task.course}
            </span>
          )}
        </div>
        {task.description && (
          <p className={`text-sm text-muted-foreground ${task.completed ? "line-through" : ""}`}>
            {task.description}
          </p>
        )}
        <p className="text-xs text-muted-foreground">
          Due {format(task.deadline, "MMM d, yyyy 'at' h:mm a")}
        </p>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
        onClick={() => onDelete(task.id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}