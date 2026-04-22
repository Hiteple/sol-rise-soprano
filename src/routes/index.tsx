import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { allHomes, allHomeSections, allMediaItems } from 'content-collections'
import { X } from 'lucide-react'

import { HomeSectionRenderer } from '@/sections/HomeSectionRenderer'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  const site = allHomes[0]
  const layout = allHomeSections[0]
  const mediaItems = [...allMediaItems].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0),
  )
  const [filter, setFilter] = useState<'all' | 'video' | 'image'>('all')
  const [activeVideo, setActiveVideo] = useState<string | null>(null)

  if (!site || !layout) return null

  return (
    <div style={{ background: 'var(--page-background-color)' }}>
      {layout.sections.map((section, index) => (
        <HomeSectionRenderer
          key={`${section.type}-${index}`}
          section={section}
          mediaItems={mediaItems}
          filter={filter}
          setFilter={setFilter}
          onOpenVideo={setActiveVideo}
        />
      ))}

      {activeVideo && (
        <div
          className="modal-overlay"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute -top-12 right-0 p-2 transition-opacity hover:opacity-70"
              style={{ color: 'var(--media-caption-text-color)' }}
              onClick={() => setActiveVideo(null)}
            >
              <X size={28} />
            </button>
            <div style={{ aspectRatio: '16/9' }}>
              <iframe
                src={`${activeVideo}?autoplay=1`}
                title="Video player"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
