import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/Notes/NoteContext'
import Noteitem from './Noteitem'
import AddNote from './AddNote'
import { useNavigate } from 'react-router-dom'

const Notes = () => {
    const context = useContext(NoteContext);
    const { note, fetchNote, editNote } = context;
    const [editNoteData, setEditNote] = useState({ _id: "", title: "", description: "", tag: "" });
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('accessToken'))
            navigate('/login');
        else
            fetchNote();
        // eslint-disable-next-line
    }, []);

    const ref = useRef(null);

    const updateNote = (currentNote) => {
        setEditNote(currentNote);
        ref.current.click();
    }

    const handleClick = (event) => {
        event.preventDefault();
        setEditNote({ _id: "", title: "", description: "", tag: "" });
        editNote(editNoteData._id, editNoteData.title, editNoteData.description, editNoteData.tag);
    };

    const onChange = (event) => {
        setEditNote({ ...editNoteData, [event.target.name]: event.target.value });
    }

    return (
        <>
            <AddNote />
            <button type="button" ref={ref} className="btn btn-primary" style={{display: 'none'}} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" data-bs-backdrop="static" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" name='title' value={editNoteData.title} aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="description" name='description' value={editNoteData.description} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="tag" name='tag' value={editNoteData.tag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row my-3'>
                <h2>Your Notes </h2>
                <div>{note.length === 0 && 'No notes to display'}</div>
                {note.map((noteItem) => {
                    return <Noteitem key={noteItem._id} updateNote={updateNote} note={noteItem} />
                })}
            </div>
        </>
    )
}

export default Notes