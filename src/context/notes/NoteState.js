import NoteContext from "./NoteContext";
import  {useState} from "react";
const NoteState=(props)=>{
    const notesInitial=[
  {
    "_id": "6a59a5014c2fd1bccb4837af",
    "user": "6a58550ece923345b8054981",
    "title": "My Title",
    "description": "Please wake up early",
    "tag": "personal",
    "date": "2026-07-17T03:44:01.404Z",
    "__v": 0
  },
  {
    "_id": "6a59a5044c2fd1bccb4837b0",
    "user": "6a58550ece923345b8054981",
    "title": "My Title",
    "description": "Please wake up early",
    "tag": "personal",
    "date": "2026-07-17T03:44:04.376Z",
    "__v": 0
  },
  {
    "_id": "6a59a5054c2fd1bccb4837b1",
    "user": "6a58550ece923345b8054981",
    "title": "My Title",
    "description": "Please wake up early",
    "tag": "personal",
    "date": "2026-07-17T03:44:05.502Z",
    "__v": 0
  },
    {
    "_id": "6a59a5054c2fd1bccb4837b1",
    "user": "6a58550ece923345b8054981",
    "title": "My Title",
    "description": "Please wake up early",
    "tag": "personal",
    "date": "2026-07-17T03:44:05.502Z",
    "__v": 0
  },
    {
    "_id": "6a59a5054c2fd1bccb4837b1",
    "user": "6a58550ece923345b8054981",
    "title": "My Title",
    "description": "Please wake up early",
    "tag": "personal",
    "date": "2026-07-17T03:44:05.502Z",
    "__v": 0
  },
    {
    "_id": "6a59a5054c2fd1bccb4837b1",
    "user": "6a58550ece923345b8054981",
    "title": "My Title",
    "description": "Please wake up early",
    "tag": "personal",
    "date": "2026-07-17T03:44:05.502Z",
    "__v": 0
  },
    {
    "_id": "6a59a5054c2fd1bccb4837b1",
    "user": "6a58550ece923345b8054981",
    "title": "My Title",
    "description": "Please wake up early",
    "tag": "personal",
    "date": "2026-07-17T03:44:05.502Z",
    "__v": 0
  },
    {
    "_id": "6a59a5054c2fd1bccb4837b1",
    "user": "6a58550ece923345b8054981",
    "title": "My Title",
    "description": "Please wake up early",
    "tag": "personal",
    "date": "2026-07-17T03:44:05.502Z",
    "__v": 0
  },
    {
    "_id": "6a59a5054c2fd1bccb4837b1",
    "user": "6a58550ece923345b8054981",
    "title": "My Title",
    "description": "Please wake up early",
    "tag": "personal",
    "date": "2026-07-17T03:44:05.502Z",
    "__v": 0
  }
]
const [notes,setNotes]=useState(notesInitial)

    return(
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;