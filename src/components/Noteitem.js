import React,{useContext} from 'react'

import NoteContext from '../context/notes/NoteContext';
const Noteitem = (props) => {
    const context=useContext(NoteContext);
    const { deleteNote } = context;
    const {note,updateNote}=props;

    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    
                   
                   <button
  className="btn btn-danger mx-2"
  onClick={() => deleteNote(note._id)}
>
  <i className="fa-solid fa-trash"></i>
</button>
                    
                    <button
  className="btn btn-primary mx-2"
  onClick={() => updateNote(note)}
>
  <i className="fa-solid fa-pen-to-square"></i>
</button>
                </div>
            </div>
        </div>
    )
}

export default Noteitem;