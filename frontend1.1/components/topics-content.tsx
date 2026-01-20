"use client"

import { useTopics, getCurrentUser, type Topic } from "@/lib/topics-store"

const PRIMARY_COLOR = "#3179F7"

interface TopicCardProps {
  topic: Topic
  onJoin: (id: string) => void
  onDelete: (id: string) => void
  onViewDetails: (id: string) => void
  hasUserJoined: boolean
}

function TopicCard({ topic, onJoin, onDelete, onViewDetails, hasUserJoined }: TopicCardProps) {
  if (!topic) return null

  const members = Array.isArray(topic.members) ? topic.members : []
  const memberCount = members.length
  const isFull = memberCount >= 5

  return (
    <div
      onClick={() => onViewDetails(topic.id)}
      className="bg-card rounded-xl border border-border p-5 flex flex-col aspect-square shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    >
      <h3 className="text-lg font-semibold text-card-foreground mb-4 line-clamp-2">{topic.text}</h3>

      {/* Stats */}
      <div className="flex-1 space-y-3">
        <div className="flex items-center gap-2 text-muted-foreground">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span className="text-sm font-medium">{memberCount} / 5 members</span>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
              topic.status === "active"
                ? "bg-green-100 text-green-800"
                : topic.status === "completed"
                  ? "bg-gray-100 text-gray-800"
                  : "bg-blue-100 text-blue-800"
            }`}
          >
            {topic.status}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-4" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={() => onJoin(topic.id)}
          disabled={hasUserJoined || isFull}
          className={`flex-1 py-2 px-3 rounded-lg text-primary-foreground text-sm font-medium transition-colors ${
            hasUserJoined || isFull ? "bg-muted text-muted-foreground cursor-not-allowed" : "hover:opacity-90"
          }`}
          style={hasUserJoined || isFull ? {} : { backgroundColor: PRIMARY_COLOR }}
        >
          {hasUserJoined ? "Joined" : isFull ? "Full" : "Join"}
        </button>
        <button
          onClick={() => onDelete(topic.id)}
          className="py-2 px-3 rounded-lg border border-border text-muted-foreground text-sm font-medium hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default function TopicsContent() {
  const { topics, deleteTopic, joinTopic } = useTopics()
  const currentUser = getCurrentUser()

  const handleJoin = (id: string) => {
    if (!currentUser) {
      alert("Please log in to join a topic")
      return
    }

    const result = joinTopic(id)
    if (!result.success) {
      alert(result.message)
    }
  }

  const handleDelete = (id: string) => {
    deleteTopic(id)
  }

  const handleViewDetails = (id: string) => {
    window.location.href = `/dashboard/topics/${id}`
  }

  return (
    <div className="max-w-6xl">
      {/* Header */}
      <div className="mb-6">
        <p className="text-muted-foreground">Browse and join active study sessions</p>
      </div>

      {/* Topics Grid */}
      {topics.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {topics.map((topic) => (
            <TopicCard
              key={topic.id}
              topic={topic}
              onJoin={handleJoin}
              onDelete={handleDelete}
              onViewDetails={handleViewDetails}
              hasUserJoined={currentUser && Array.isArray(topic.members) ? topic.members.includes(currentUser) : false}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-card rounded-xl border border-border">
          <svg
            className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          <h3 className="text-lg font-medium text-card-foreground mb-1">No topics yet</h3>
          <p className="text-muted-foreground">Create a new topic to get started</p>
        </div>
      )}
    </div>
  )
}
