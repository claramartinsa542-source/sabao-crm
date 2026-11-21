"use client"

import { useState, useCallback } from "react"
import { SearchCommand } from "./search-command"

interface SearchCommandProviderProps {
  children: React.ReactNode
}

export function SearchCommandProvider({ children }: SearchCommandProviderProps) {
  const [open, setOpen] = useState(false)

  const handleOpenChange = useCallback((value: boolean) => {
    setOpen(value)
  }, [])

  return (
    <>
      {children}
      <SearchCommand open={open} onOpenChange={handleOpenChange} />
    </>
  )
}