import { useState } from 'react'
import Image from 'next/image'

export default function UploadForm() {
  const [file, setFile] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('file', file)
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    })
    const data = await response.json()
    setImageUrl(data.path)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Upload</button>
      </form>
      {imageUrl && <Image src={imageUrl} width={200} height={200} />}
    </div>
  )
}
