import { useState, useEffect } from "react"
import { groupsApi, type Group } from "@/lib/api"
import { Button } from "@/components/ui/button"

export function GroupsList() {
  const [groups, setGroups] = useState<Group[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadGroups()
  }, [])

  const loadGroups = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await groupsApi.getAll()
      setGroups(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load groups")
      console.error("Error loading groups:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateGroup = async () => {
    const name = prompt("Enter group name:")
    if (!name) return

    const userIdsInput = prompt("Enter user IDs (comma-separated):")
    const userIds = userIdsInput 
      ? userIdsInput.split(",").map(id => parseInt(id.trim())).filter(id => !isNaN(id))
      : []

    try {
      const newGroup = await groupsApi.create({ name, userIds })
      setGroups([...groups, newGroup])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create group")
      console.error("Error creating group:", err)
    }
  }

  const handleDeleteGroup = async (id: number) => {
    if (!confirm("Are you sure you want to delete this group?")) return

    try {
      await groupsApi.delete(id)
      setGroups(groups.filter(g => g.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete group")
      console.error("Error deleting group:", err)
    }
  }

  if (loading) return <div>Loading groups...</div>
  if (error) return <div className="text-destructive">Error: {error}</div>

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Groups</h2>
        <Button onClick={handleCreateGroup}>Add Group</Button>
      </div>
      <div className="space-y-2">
        {groups.map(group => (
          <div key={group.id} className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <p className="font-medium">{group.name}</p>
              {group.users && group.users.length > 0 && (
                <p className="text-sm text-muted-foreground">
                  {group.users?.length} member{group.users?.length !== 1 ? 's' : ''}
                </p>
              )}
            </div>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => handleDeleteGroup(group.id)}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

