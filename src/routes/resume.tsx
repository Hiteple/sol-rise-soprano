import { marked } from 'marked'

import { createFileRoute } from '@tanstack/react-router'
import { allEducations } from 'content-collections'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export const Route = createFileRoute('/resume')({
  component: App,
})

function App() {
  return (
    <div className="min-h-screen p-8 lg:p-12">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold">
            My Resume
          </h1>
          <p className="text-lg">
            Education
          </p>
          <Separator className="mt-8" />
        </div>

        {/* Education */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold">
            Education
          </h2>
          <div className="space-y-6">
            {allEducations.map((education) => (
              <Card key={education.school}>
                <CardHeader>
                  <CardTitle className="text-xl">
                    {education.school}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed">
                    {education.summary}
                  </p>
                  {education.content && (
                    <div
                      className="mt-6 prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: marked(education.content),
                      }}
                    />
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
