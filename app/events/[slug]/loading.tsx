import React from 'react'

const loading = () => {
  return (
   <div className="flex h-screen w-full items-center justify-center">
      <h2 className="text-xl font-bold animate-pulse">Loading Event Details...</h2>
      {/* You can replace this text with a nice Skeleton UI component later */}
    </div>
  )
}

export default loading