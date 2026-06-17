import React from 'react'
import './styles.css'

export const metadata = {
  description: 'Personal portfolio powered by Payload CMS.',
  title: 'Software Engineer Portfolio',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
