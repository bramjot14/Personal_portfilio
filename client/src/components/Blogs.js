import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

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
  }, []); // [] empty dependency array used so that data fetches once only

  return (
    <div className="container mt-5 blogs-container">
      <h2 className="text-center mb-5 blogs-heading">Blogs</h2>
      <div className="row">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div className="col-md-12 mb-4 blog-card-wrapper" key={blog.id}>
              <div className="blog-card d-flex align-items-center">
                <div className="blog-image-wrapper">
                  <img
                    src={`http://localhost:5002${blog.image_url}`} // Use the correct base URL
                    alt={blog.title}
                    className="blog-image"
                  />
                </div>
                <div className="blog-details">
                  <h3 className="blog-title">{blog.title}</h3>
                  <p className="blog-summary">{blog.summary}</p>
                  <p className="blog-meta">
                    By {blog.author} on {new Date(blog.created_at).toLocaleDateString()}
                  </p>
                  <a href={`/blog/${blog.id}`} className="blog-read-more">
                    Read More
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No blogs available.</p>
        )}
      </div>
    </div>
  );
};

export default Blogs;