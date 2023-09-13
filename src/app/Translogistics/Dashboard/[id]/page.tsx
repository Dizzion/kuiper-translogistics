'use client'
import { usePathname } from 'next/navigation'

export default function TrackingNumberDashboard() {
  const url = usePathname();
  const pattern = /\/Dashboard\/([^/]+)/;
  const match = url.match(pattern); 

  return (
    <div style={{ backgroundColor: '#5d5f63' }}>
      <h1>ID: {match ? match[1] : "ID not found"}</h1>
    </div>
  )
}

