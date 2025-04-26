"use client"
import React, { useEffect } from 'react'

const page = () => {
    useEffect(() => {
        window.location.href = `/chat/${localStorage.getItem('activeTeam')}`
    })
  return (
    <div></div>
  )
}

export default page