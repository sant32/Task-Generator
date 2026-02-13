import { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Status() {
  const [status, setStatus] = useState({
    backend: "Checking...",
    db: "Checking...",
    llm: "Checking...",
  })

  useEffect(() => {
    checkStatus()
  }, [])

  const checkStatus = async () => {
    try {
      await axios.get("https://task-generator-hrz3.onrender.com/api/health")
      setStatus((prev) => ({ ...prev, backend: "Healthy" }))
    } catch {
      setStatus((prev) => ({ ...prev, backend: "Down" }))
    }

    try {
      await axios.get("https://task-generator-hrz3.onrender.com/api/health/db")
      setStatus((prev) => ({ ...prev, db: "Healthy" }))
    } catch {
      setStatus((prev) => ({ ...prev, db: "Down" }))
    }

    try {
      await axios.get("hhttps://task-generator-hrz3.onrender.com/api/health/llm")
      setStatus((prev) => ({ ...prev, llm: "Healthy" }))
    } catch {
      setStatus((prev) => ({ ...prev, llm: "Down" }))
    }
  }

  const getBadgeVariant = (value) =>
    value === "Healthy" ? "default" : "destructive"

  return (
    <div className="p-6">
      <Card>
        <CardContent className="p-6 space-y-4">
          <h1 className="text-2xl font-bold">System Status</h1>

          <div className="flex justify-between">
            <span>Backend</span>
            <Badge variant={getBadgeVariant(status.backend)}>
              {status.backend}
            </Badge>
          </div>

          <div className="flex justify-between">
            <span>Database</span>
            <Badge variant={getBadgeVariant(status.db)}>
              {status.db}
            </Badge>
          </div>

          <div className="flex justify-between">
            <span>LLM Connection</span>
            <Badge variant={getBadgeVariant(status.llm)}>
              {status.llm}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
