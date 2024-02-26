import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'


function Modal({ closeModal, blog,}) {
    const history = useHistory();
    const [formState,setFormState]= useState({
      title: blog.title,
      body: blog.body,
      author: blog.author   
     })    
     
     const handleSubmit = (e) => {
        e.preventDefault ();
        closeModal(false)

        fetch('http://localhost:8000/blogs/' + blog.id, {
          method: 'PUT',
          headers: { "Content-Type": "application/json"},
          body:JSON.stringify(formState)
        }).then(() => {
          history.push('/');
        }) 
      }
  return (
    <div className='modalBackground'>
        <div className='modalContainer'>
           
        <div className="create">
            <h2>Edit Your Blog</h2>
            <form onSubmit ={handleSubmit}>
                <label>Blog title:</label>
                    <input 
                    value={formState.title}
                    onChange ={(e) => setFormState({...formState,
                    title: e.target.value})}
                    type="text" 
                    required 
                    />
                    <label>Blog body:</label>
                    <textarea
                    onChange={(e) => setFormState({...formState,
                    body: e.target.value})}
                    value = {formState.body}
                    required
                    ></textarea>

                <label>Blog author:</label>
                    <input
                    value = {formState.author}
                    onChange ={(e)=> setFormState({...formState,
                    author:e.target.value})} 
                    type="text" 
                    placeholder="Your Name"
                    required 
                    />
        
            </form>
        </div>
            <div className='footer'>
                <button className='delete-btn' onClick={()=>closeModal(false)}>Cancel</button>
                <button className='submit-btn' onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    </div>
  )
}

export default Modal