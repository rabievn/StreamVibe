'use client'

import { useParams } from 'next/navigation'

export default function MediaPage() {
  const params = useParams()
  const id = params.id as string

  return <div>Media: {id}</div>
}
