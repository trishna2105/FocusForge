"use client"

import type React from "react"

import { useState } from "react"
import { useTopics } from "@/lib/topics-store"

const PRIMARY_COLOR = "#3179F7"

export default function CreateTopicContent() {
  const [topicText, setTopicText] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const { addTopic } = useTopics()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!topicText.trim()) return

    setIsSubmitting(true)
    setTimeout(() => {
      addTopic(topicText.trim())
      setIsSubmitting(false)
      setSuccess(true)
      setTopicText("")
      setTimeout(() => setSuccess(false), 3000)
    }, 500)
  }

  return (
    <div className="max-w-xl">
      <div className="bg-card rounded-xl border border-border p-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-card-foreground">New Topic</h2>
          <p className="text-sm text-muted-foreground mt-1">Create a new topic to start focusing on</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Topic Name Input */}
          <div>
            <label htmlFor="topic-name" className="block text-sm font-medium text-foreground mb-2">
              Topic Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="topic-name"
                value={topicText}
                onChange={(e) => setTopicText(e.target.value)}
                placeholder="Enter topic name"
                className="w-full pl-12 pr-4 py-3 border border-border bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-shadow"
                style={{ "--tw-ring-color": PRIMARY_COLOR } as React.CSSProperties}
              />
            </div>
          </div>

          {/* Success Message */}
          {success && (
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Topic created successfully!
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || !topicText.trim()}
            className="w-full py-3 px-4 text-primary-foreground font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
            style={{ backgroundColor: PRIMARY_COLOR }}
          >
            {isSubmitting ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Creating...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Topic
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
