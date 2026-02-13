import { useState, useEffect } from "react"
import Sidebar from "@/components/layout/Sidebar"
import SpecForm from "@/components/spec/SpecForm"
import SpecEditor from "@/components/spec/SpecEditor"
import { Routes, Route, Link } from "react-router-dom"
import Status from "@/pages/Status"

import {
  generateSpec,
  getRecentSpecs,
  getSpecById,
  updateSpec,
} from "@/api/specApi"

export default function App() {
  const [recentSpecs, setRecentSpecs] = useState([])
  const [loadingRecent, setLoadingRecent] = useState(false)
  const [spec, setSpec] = useState(null)

  useEffect(() => {
    fetchRecent()
  }, [])

  const fetchRecent = async () => {
  try {
    setLoadingRecent(true)
    const res = await getRecentSpecs()
    setRecentSpecs(res.data)
  } finally {
    setLoadingRecent(false)
  }
}


  const handleGenerate = async (form) => {
    const res = await generateSpec(form)
    setSpec(res.data)
    fetchRecent()
  }

  const handleLoad = async (id) => {
    const res = await getSpecById(id)
    setSpec(res.data)
  }

const handleSave = async () => {
  console.log("Saving:", spec.generated_output)

  const res = await updateSpec(spec.id, {
    generated_output: spec.generated_output,
  })

  // update local state with fresh DB data
  setSpec(res.data)

  fetchRecent()
}



return (
  <div className="min-h-screen bg-gray-100 flex flex-col">

    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Tasks Generator</h1>

      <div className="flex gap-4">
        <Link to="/" className="text-sm hover:underline">
          Home
        </Link>
        <Link to="/status" className="text-sm hover:underline">
          Status
        </Link>
      </div>
    </header>

    <Routes>
      <Route
        path="/"
        element={
          <div className="flex flex-1">
            <Sidebar recentSpecs={recentSpecs} 
            loading={loadingRecent}
            onSelect={handleLoad} 
            />
            <div className="flex-1 p-6 space-y-6">
              <SpecForm onGenerate={handleGenerate} />
              {spec && (
                <SpecEditor
                  spec={spec}
                  setSpec={setSpec}
                  onSave={handleSave}
                />
              )}
            </div>
          </div>
        }
      />

      <Route path="/status" element={<Status />} />
    </Routes>

  </div>
)

}
