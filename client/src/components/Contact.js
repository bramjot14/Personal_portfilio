import React, { useState } from 'react';
import './Contact.css';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { name, email, message };

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setResponseMessage('Message sent successfully!');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setResponseMessage('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setResponseMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="contact-container">
      <h1>Contact Me</h1>
      {responseMessage && <p className="response-message">{responseMessage}</p>}
      <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>

        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}

export default Contact;



// const formData = { name, email, message }; // Collect all input data
// JavaScript automatically uses the variable names as the key names in the object on using shorthand syntax

// const [responseMessage, setResponseMessage] = useState('');
// The responseMessage state in the Contact component is used to provide feedback to the user about the status of their form submission.
// It shows whether the message was successfully sent or if there was an error.