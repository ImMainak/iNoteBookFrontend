import NoteContext from "./NoteContext";
import React, { useState } from "react";
const helperFunction = require('../../helpers/CommonFunction');

const NoteState = (props) => {
    const [note, setNote] = useState([]);

    const fetchNote = async() => {
        //Fetch Note
        let result = await helperFunction.getAPICall({
            url: 'api/fetch_note_list',
        })
        if (result.status === 200) {
            setNote(result.data);
        }
        else {
            console.log(result.msg);
        }
    }

    const addNote = async(title, description, tag) => {
        //Add Note
        try {
            let requestConfig = {
                title: title,
                description: description,
                tag: tag
            };
    
            let result = await helperFunction.postAPICall({
                url: 'api/create_note',
                data: requestConfig
            });

            if (result.status === 200) {
                fetchNote();
            } else {
                console.log(result.msg);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const deleteNote = async(id) => {
        //Delete Note
        let result = await helperFunction.deleteAPICall({
            url: 'api/delete_note/' + id
        });
        
        if (result.status === 200) {
            setNote(note.filter(f => f._id !== id));
        } else {
            console.log(result.msg);
        }
    }

    const editNote = async(id, title, description, tag) => {
        //Edit Note
        let requestConfig = {
            title: title,
            description: description,
            tag: tag
        };

        let result = await helperFunction.putAPICall({
            url: 'api/update_note/' + id,
            data: requestConfig
        });

        if (result.status === 200) {
            let index = note.findIndex(f => f._id === id);
        
            if (index !== -1) {
                let newNote = JSON.parse(JSON.stringify(note));

                newNote[index].title = title;
                newNote[index].description = description;
                newNote[index].tag = tag;
                
                setNote(newNote);
            }
        } else {
            console.log(result.msg);
        }
    }

    return (
        <NoteContext.Provider value={{note, fetchNote, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;