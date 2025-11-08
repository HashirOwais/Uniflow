import { useState, useEffect } from "react"
import { eventsApi, type Event } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"

export function EventsList() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await eventsApi.getAll()
      setEvents(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load events")
      console.error("Error loading events:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateEvent = async () => {
    const title = prompt("Enter event title:")
    if (!title) return

    const startTime = prompt("Enter start time (YYYY-MM-DDTHH:mm):")
    const endTime = prompt("Enter end time (YYYY-MM-DDTHH:mm):")
    const notes = prompt("Enter notes (optional):")
    const userIdInput = prompt("Enter user ID:")

    if (!startTime || !endTime || !userIdInput) return

    const userId = parseInt(userIdInput)
    if (isNaN(userId)) {
      setError("Invalid user ID")
      return
    }

    try {
      const newEvent = await eventsApi.create({
        title,
        startTime: new Date(startTime).toISOString(),
        endTime: new Date(endTime).toISOString(),
        notes: notes || undefined,
        userId,
      })
      setEvents([...events, newEvent])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create event")
      console.error("Error creating event:", err)
    }
  }

  const handleDeleteEvent = async (id: number) => {
    if (!confirm("Are you sure you want to delete this event?")) return

    try {
      await eventsApi.delete(id)
      setEvents(events.filter(e => e.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete event")
      console.error("Error deleting event:", err)
    }
  }

  if (loading) return <div>Loading events...</div>
  if (error) return <div className="text-destructive">Error: {error}</div>

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Events</h2>
        <Button onClick={handleCreateEvent}>Add Event</Button>
      </div>
      <div className="space-y-2">
        {events.map(event => (
          <div key={event.id} className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <p className="font-medium">{event.title}</p>
              <p className="text-sm text-muted-foreground">
                {format(new Date(event.startTime), "MMM d, yyyy 'at' h:mm a")} - 
                {format(new Date(event.endTime), "h:mm a")}
              </p>
              {event.notes && (
                <p className="text-sm text-muted-foreground">{event.notes}</p>
              )}
            </div>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => handleDeleteEvent(event.id)}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

