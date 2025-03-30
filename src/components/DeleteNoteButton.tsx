import { Note } from '@prisma/client'
import React from 'react'

interface Props{
    noteId : string,
    deleteNoteLocally : (noteId : string)=>void 
}
function DeleteNoteButton({noteId, deleteNoteLocally}: Props) {
  return (
    <div>
      
    </div>
  )
}

export default DeleteNoteButton
