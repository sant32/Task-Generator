import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function SpecForm({ onGenerate }) {
  const [form, setForm] = useState({
    title: "",
    goal: "",
    users: "",
    constraints: "",
    template_type: "Web App",
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async () => {
    if (!form.goal || !form.users || !form.constraints) {
      alert("Goal, Users, and Constraints are required")
      return
    }

    try {
      setLoading(true)
      await onGenerate(form)

      // optional: clear form after generation
      setForm({
        title: "",
        goal: "",
        users: "",
        constraints: "",
        template_type: "Web App",
      })
    } catch (err) {
      alert("Failed to generate spec")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <h1 className="text-2xl font-bold">
          Tasks Generator
        </h1>

        <Input
          name="title"
          placeholder="Feature Title"
          value={form.title}
          onChange={handleChange}
        />

        <Textarea
          name="goal"
          placeholder="Goal (Required)"
          value={form.goal}
          onChange={handleChange}
        />

        <Textarea
          name="users"
          placeholder="Target Users (Required)"
          value={form.users}
          onChange={handleChange}
        />

        <Textarea
          name="constraints"
          placeholder="Constraints (Required)"
          value={form.constraints}
          onChange={handleChange}
        />

        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Generating..." : "Generate Tasks"}
        </Button>
      </CardContent>
    </Card>
  )
}
