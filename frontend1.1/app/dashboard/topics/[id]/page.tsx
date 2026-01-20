"use client"

import { useParams } from "next/navigation"
import { useTopics } from "@/lib/topics-store"
import { ArrowLeft, Users, Calendar, ExternalLink } from "lucide-react"

export default function TopicDetailsPage() {
  const params = useParams()
  const id = params.id as string
  const { topics } = useTopics()

  const topic = topics.find((t) => t.id === id)

  // Loading state - topics might not be loaded yet
  if (!topics || topics.length === 0) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => (window.location.href = "/dashboard")}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Topics
          </button>
          <div className="bg-card rounded-xl border border-border p-12 text-center">
            <div className="inline-flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <p className="text-muted-foreground">Loading topic details...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!topic) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => (window.location.href = "/dashboard")}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Topics
          </button>
          <div className="bg-card rounded-xl border border-border p-12 text-center">
            <h2 className="text-xl font-semibold text-card-foreground mb-2">Topic not found</h2>
            <p className="text-muted-foreground">The topic you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    )
  }

  const createdDate = new Date(topic.created_at)
  const formattedDate = createdDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  const hasResources = topic.resources !== null
  const hasYoutubeResources = hasResources && topic.resources.youtube && topic.resources.youtube.length > 0
  const hasWebsiteResources = hasResources && topic.resources.websites && topic.resources.websites.length > 0

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => (window.location.href = "/dashboard")}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Topics
        </button>

        {/* Topic Header */}
        <div className="bg-card rounded-xl border border-border p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-3xl font-bold text-card-foreground">{topic.text}</h1>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
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

          <div className="flex items-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span className="text-sm">{topic.members.length} / 5 members</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span className="text-sm">{formattedDate}</span>
            </div>
          </div>
        </div>

        {/* Members Section */}
        <div className="bg-card rounded-xl border border-border p-6 mb-6">
          <h2 className="text-xl font-semibold text-card-foreground mb-4">Members</h2>
          {topic.members.length > 0 ? (
            <div className="space-y-3">
              {topic.members.map((member, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                    {member.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-card-foreground">{member}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">No members yet</p>
          )}
        </div>

        {/* AI Response Section */}
        <div className="bg-card rounded-xl border border-border p-6 mb-6">
          <h2 className="text-xl font-semibold text-card-foreground mb-4">AI Response</h2>

          {!hasResources ? (
            <div className="flex items-center gap-3 p-6 bg-background rounded-lg border border-dashed border-border">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
              <p className="text-sm text-muted-foreground">AI response is being generated. Check back shortly...</p>
            </div>
          ) : (
            <div className="bg-background rounded-lg p-6 space-y-4">
              {/* YouTube Resources */}
              {hasYoutubeResources && (
                <div>
                  <h3 className="text-sm font-semibold text-card-foreground mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                    Recommended YouTube Playlists
                  </h3>
                  <div className="space-y-2">
                    {topic.resources.youtube.map((video, index) => (
                      <a
                        key={index}
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-primary hover:underline group"
                      >
                        <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        {video.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Website Resources */}
              {hasWebsiteResources && (
                <div>
                  <h3 className="text-sm font-semibold text-card-foreground mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      />
                    </svg>
                    Recommended Websites
                  </h3>
                  <div className="space-y-2">
                    {topic.resources.websites.map((website, index) => (
                      <a
                        key={index}
                        href={website.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-primary hover:underline group"
                      >
                        <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        {website.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {!hasYoutubeResources && !hasWebsiteResources && (
                <p className="text-muted-foreground text-sm">No resources available yet</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
