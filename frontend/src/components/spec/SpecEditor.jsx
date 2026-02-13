import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function SpecEditor({ spec, setSpec, onSave }) {
  if (!spec) return null

  const moveTaskUp = (group, index) => {
  if (index === 0) return

  const updated = structuredClone(spec)
  const tasks = updated.generated_output.engineering_tasks[group]

  ;[tasks[index - 1], tasks[index]] =
    [tasks[index], tasks[index - 1]]

  setSpec(updated)
}


  const moveTaskDown = (group, index) => {
  const updated = structuredClone(spec)
  const tasks = updated.generated_output.engineering_tasks[group]

  if (index === tasks.length - 1) return

  ;[tasks[index + 1], tasks[index]] =
    [tasks[index], tasks[index + 1]]

  setSpec(updated)
}

const generateMarkdown = () => {
  const { title, goal, users, constraints, generated_output } = spec

  let md = `# ${title || "Feature Spec"}\n\n`

  md += `## Goal\n${goal}\n\n`
  md += `## Users\n${users}\n\n`
  md += `## Constraints\n${constraints}\n\n`

  md += `## User Stories\n`
  generated_output.user_stories.forEach((story) => {
    md += `- ${story}\n`
  })

  md += `\n## Engineering Tasks\n`
  Object.entries(generated_output.engineering_tasks).forEach(
    ([group, tasks]) => {
      md += `\n### ${group}\n`
      tasks.forEach((task) => {
        md += `- ${task}\n`
      })
    }
  )

  md += `\n## Risks\n`
  generated_output.risks.forEach((risk) => {
    md += `- ${risk}\n`
  })

  md += `\n## Unknowns\n`
  generated_output.unknowns.forEach((u) => {
    md += `- ${u}\n`
  })

  return md
}

const handleCopy = async () => {
  const markdown = generateMarkdown()
  await navigator.clipboard.writeText(markdown)
  alert("Copied to clipboard!")
}

const handleDownload = () => {
  const markdown = generateMarkdown()

  const blob = new Blob([markdown], { type: "text/markdown" })
  const url = URL.createObjectURL(blob)

  const a = document.createElement("a")
  a.href = url
  a.download = `${spec.title || "spec"}.md`
  a.click()

  URL.revokeObjectURL(url)
}


  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <h2 className="text-xl font-semibold">
          Generated Output
        </h2>

        {/* User Stories */}
        <div>
          <h3 className="font-semibold mb-2">User Stories</h3>
          <ul className="list-disc pl-5 space-y-1">
            {spec.generated_output.user_stories.map((story, i) => (
              <li key={i}>{story}</li>
            ))}
          </ul>
        </div>

        {/* Engineering Tasks */}
        <div>
          <h3 className="font-semibold mb-2">
            Engineering Tasks
          </h3>

          {Object.entries(
            spec.generated_output.engineering_tasks
          ).map(([group, tasks]) => (
            <div key={group} className="mb-4">
              <h4 className="capitalize font-medium mb-2">
                {group}
              </h4>

              {tasks.map((task, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 mb-2"
                >
                  <input
                    className="border rounded px-2 py-1 w-full"
                    value={task}
                    onChange={(e) => {
  const updated = structuredClone(spec)
  updated.generated_output.engineering_tasks[group][index] =
    e.target.value
  setSpec(updated)
}}
                  />

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => moveTaskUp(group, index)}
                  >
                    ↑
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => moveTaskDown(group, index)}
                  >
                    ↓
                  </Button>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Risks */}
        <div>
          <h3 className="font-semibold mb-2">Risks</h3>
          <ul className="list-disc pl-5">
            {spec.generated_output.risks.map((risk, i) => (
              <li key={i}>{risk}</li>
            ))}
          </ul>
        </div>

        {/* Unknowns */}
        <div>
          <h3 className="font-semibold mb-2">Unknowns</h3>
          <ul className="list-disc pl-5">
            {spec.generated_output.unknowns.map((u, i) => (
              <li key={i}>{u}</li>
            ))}
          </ul>
        </div>

        <Button onClick={onSave}>
          Save Changes
        </Button>

        <div className="flex gap-4">
  <Button variant="secondary" onClick={handleCopy}>
    Copy as Markdown
  </Button>

  <Button variant="outline" onClick={handleDownload}>
    Download .md
  </Button>
</div>

      </CardContent>
    </Card>
  )
}
