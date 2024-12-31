import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-container">
      <h1><b>About Me</b></h1>
      <hr></hr>
      <div className="about-content">
        <p>
          Hello! My name is <strong>Bramjot Singh</strong>, and I am currently pursuing an Advanced Diploma in Computer Programming from George Brown College. I am deeply passionate about technology and strive to build innovative and efficient web applications that deliver a seamless user experience.
        </p>

        <section>
          <h2 className='about'>Skills</h2>
          <p>
            With a strong passion for full-stack development, I dedicate myself to creating dynamic and user-friendly web applications. My technical expertise includes:
          </p>
          <ul>
            <li>Proficiency in <strong>JavaScript, React, Node.js, Express.js, and PostgreSQL</strong>.</li>
            <li>Hands-on experience in <strong>web application development</strong>.</li>
            <li>Expertise in <strong>database modeling and API integration</strong>.</li>
          </ul>
        </section>

        <section>
          <h2 className='about'>Interests & Hobbies</h2>
          <p>
            Outside of programming, I enjoy staying active through gymnastics and nurturing my creative side through singing. I am always eager to experiment with emerging technologies and explore new programming frameworks to expand my knowledge.
          </p>
        </section>

        <section>
          <h2 className='about'>Contact Me</h2>
          <p>
            I am always excited to connect with like-minded individuals and explore new opportunities. Feel free to reach out to me via my <a href="/contact">contact page</a> or connect with me on <a href ="https://www.linkedin.com/in/bramjot-singh" target='blank'>LinkedIn</a>
          </p>
        </section>
      </div>
    </div>
  );
}

export default About;
