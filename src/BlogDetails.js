import { useHistory, useParams } from "react-router-dom";
import Modal from "./Modal";
import useFetch from "./useFetch";
import { useState } from "react";


const BlogDetails = () => {
  const { id } = useParams();
  const { data: blog, error, isPending } = useFetch('http://localhost:8000/blogs/' + id);
  const history = useHistory();
  const [openModal, setOpenModal] = useState (false)

  const handleClick = () => {
    fetch('http://localhost:8000/blogs/' + blog.id, {
      method: 'DELETE'
    }).then(() => {
      history.push('/');
    }) 
  }

 

  return ( 
    <div className="blog-details">
      { isPending && <div>Loading...</div> }
      { error && <div>{ error }</div> }
      { blog && (
        <article>
          <h2>{ blog.title }</h2>
          <p>Written by { blog.author }</p>
          <div>{ blog.body }</div>
          {openModal || <button onClick={()=> setOpenModal(true)}>Edit</button>}
          {openModal || <button className="delete-btn" onClick={handleClick}>Delete</button>}
          {openModal && <Modal blog={blog} closeModal={setOpenModal}/>}
          
        </article>
      )}
    </div>
  );
}
 
export default BlogDetails;