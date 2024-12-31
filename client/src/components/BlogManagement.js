// The BlogManagement.js component allows users to view, create, and delete blog posts. Here's a line-by-line explanation:
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/blogs');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('summary', summary);
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.post('http://localhost:5002/api/blogs', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSuccessMessage('Blog submitted successfully');
      setErrorMessage('');
      setTitle('');
      setSummary('');
      setContent('');
      setImage(null);
    } catch (error) {
      console.error('Error submitting blog:', error);
      setErrorMessage('Error submitting blog. Please check if the backend is correctly configured.');
    }
  };

  // const handleEdit = async (blogId) => {
  //   const newTitle = prompt('Enter the new title for this blog:');
  //   if (!newTitle) {
  //     return; // Exit if the user cancels or leaves the prompt empty
  //     /* if you use a return statement without any value, it simply ends the function's execution and returns undefined by default*/
  //   }
  
  //   try {
  //     await axios.post(`http://localhost:5002/api/blogs/${blogId}`, { title: newTitle });
  //     const response = await axios.get('http://localhost:5002/api/blogs');
  //     setBlogs(response.data);
  //     setSuccessMessage('Blog edited successfully!');
  //   } catch (error) {
  //     console.error('Error editing blog:', error);
  //     setErrorMessage('Error editing blog. Please try again.');
  //   }
  // };
  
  
  const handleDelete = async (blogId) => {
    try {
      await axios.delete(`http://localhost:5002/api/blogs/${blogId}`);
      //This url is independent of the GET request in useEffect (to http://localhost:5002/api/blogs).
      setSuccessMessage('Blog deleted successfully!');
      setBlogs(blogs.filter((blog) => blog.id !== blogId)); // Remove deleted blog from list
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  return (
    <div>
      <h3>Blog Management</h3>
      <br/>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Blog Title</label>
          <input
            type="text"
            className="form-control"
            id="title" 
            name='title'
            value={title} //By setting value={title}, the input field's displayed value is controlled by the title state defined in useState.
            onChange={(e) => setTitle(e.target.value)}
            //When a user types in the input field, onChange fires, calling setTitle(e.target.value), which updates title with the user’s input.
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="summary" className="form-label">Blog Summary</label>
          <input
            type="text"
            className="form-control"
            id="summary"
            name='summary'
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="content" className="form-label">Blog Content</label>
          <textarea
            className="form-control"
            id="content"
            rows="5"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">Upload Blog Image</label>
          <input
            type="file"
            className="form-control"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <button type="submit" className="btn btn-primary">Submit Blog</button>
      </form>

      {successMessage && <p className="mt-3 text-success">{successMessage}</p>}
      {errorMessage && <p className="mt-3 text-danger">{errorMessage}</p>}

      <h3 className="mt-5">Submitted Blogs</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Image</th>
            <th>Author</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td>{blog.title}</td>
              <td>
                {blog.image_url ? (
                  <img
                    src={`http://localhost:5002${blog.image_url}`}
                    alt={blog.title}
                    style={{ width: '100px', height: 'auto' }}
                  />
                ) : ( 
                  'No Image'
                )}
              </td>
              <td>{blog.author}</td>
              <td>{new Date(blog.created_at).toLocaleDateString()}</td>
              <td>
                {/* <button className="btn btn-warning" onClick={() => handleEdit(blog.id)}>Edit</button> */}
                <button className="btn btn-danger" onClick={() => handleDelete(blog.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BlogManagement;