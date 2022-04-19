import React, {useState, useEffect} from 'react'
import { useParams, useNavigate, Link } from "react-router-dom"
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'


const NotePage = () => {
    const params=useParams();
    const navigate= useNavigate();
    
    let noteId=params.id
    let [note, setNote]= useState(null)
    
  
    useEffect(() => {
      getNote()
    }, [noteId])
    
    let getNote = async () => {
        if(noteId==='new') return
        let response = await fetch(`http://localhost:8000/api/notes/${noteId}`)
        let data = await response.json()
        setNote(data)
    }
    let createNote = async () =>{
        await fetch(`http://localhost:8000/api/notes/create/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
    }
    let updateNote = async () =>{
        await fetch(`http://localhost:8000/api/notes/${noteId}/update/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
    }

    let deleteNote = async () =>{
        await fetch(`http://localhost:8000/api/notes/${noteId}/delete/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            
        })
        navigate(-1)
    }

    let handleSubmit = () =>{
        if(noteId!=='new' && note.body === ''){
            deleteNote()
        }else if(noteId!=='new'){
            updateNote()
        }else if(noteId==='new'&& note!==null){
            createNote()
        }


        navigate("/", { replace: true })
        
    }
    let handleChange = (value) => {
        setNote(note => ({ ...note, 'body': value }))
        
    }
    return (
        <div className='note'><h3>Wpis z tego dnia</h3>
            <div className='note-header'>
                
                <h3>
                    <Link to="/">
                        <ArrowLeft onClick={handleSubmit}/>
                    </Link>
                </h3>
                {noteId !=='new' ? (
                   <button onClick={deleteNote}>USUŃ WPIS</button> 
                ):(
                    <button onClick={handleSubmit}>ZAPISZ</button> 
                )}
                
            </div>
            <textarea onChange={(e)=>{handleChange(e.target.value)}} value={note?.body}>

            </textarea>
        </div>
    )
}

export default NotePage

