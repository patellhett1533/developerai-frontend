import React from 'react'
import { ChatProvider } from './chatContext'

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <ChatProvider>
        {children}
    </ChatProvider>
  )
}

export default layout