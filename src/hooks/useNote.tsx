"use client"

import { noteProviderContext } from "@/providers/NoteProvider"
import { useContext } from "react"

export function useNote(){
    const context = useContext(noteProviderContext)
    if (!context) {
        throw new Error("No context available")

    }
    return context
}