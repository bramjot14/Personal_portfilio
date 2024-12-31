import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.classList.toggle('blur', !isMenuOpen); // .toggle('blur', condition):
    // Add or remove blur class
  };

  const closeMenu = () => {      
    setIsMenuOpen(false);   
    document.body.classList.remove('blur'); // Ensure blur is removed when menu is closed 
};

  return (
    <nav className='navStyle'>
      
      <button className='menuToggle' onClick={toggleMenu} aria-label="Toggle navigation">
        {isMenuOpen ? '✖' : '☰'}
      </button>
      <div className={`menuContainer ${isMenuOpen ? 'open' : ''}`}>
      <div className='logo'>
        <Link to="/" className="linkStyle logoText">MyPortfolio</Link>
      </div>
        <ul className='navbar-left navListStyle'>
          <li><Link to="/" className="linkStyle HomeText" onClick={closeMenu}>Home</Link></li>
          <li><Link to="/about" className="linkStyle aboutText" onClick={closeMenu}>About</Link></li>
          <li><Link to="/contact" className="linkStyle contactText" onClick={closeMenu}>Contact</Link></li>
          <li><Link to="/blogs" className='linkStyle blogsText' onClick={closeMenu}>Blogs</Link></li>
          <li><Link to="/admin/dashboard" className="linkStyle nav-link-custom" onClick={closeMenu}>Admin Dashboard</Link></li>
        </ul>
        <ul className='navbar-right navListStyle'>
          <li>
            <a href="https://github.com/bramjot14" target='_blank' rel='noreferrer' className="linkStyle githubText">
              <i className="fa fa-github"></i>
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/bramjot-singh" target='_blank' rel='noreferrer' className="linkStyle linkedInText">
              <i className="fa fa-linkedin"></i>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;  

 // 1. import { Link } from 'react-router-dom'; 
 // 1.  Used Link in place of "a" for links due to its prevention from full page reload whcih is essential for SPA 
 //     (Single Page Application) especiallly in deployed website 

 // 2. <div className="menuToggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
 // 2. When clicked, the setIsMenuOpen function is called with the opposite of the current state (!isMenuOpen).

 // 3. <ul className={`navListStyle ${isMenuOpen ? 'open' : ''}`}>
 // 3. Backticks (``) and the dollar sign with curly braces (${}) are part of the template literals which make it easy to include JavaScript expressions directly inside strings.
 


//  import React, { useState } from 'react';
//  import { Link } from 'react-router-dom';
//  import './Navbar.css';
 
//  function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//    return (
//    <nav className='navStyle'>
//     <div className='logo'>
//     <Link to="/" className="linkStyle logoText">MyPortfolio</Link>
//     </div>
//     <button className='menuToggle' onClick={toggleMenu}>
//     {isMenuOpen ? '✖' : '☰'}
//     </button>
//     <ul className={`navbar-left navListStyle ${isMenuOpen ? 'open' : ''}`}> 
//   <li>
//     <Link to="/" className="linkStyle HomeText">Home</Link>
//   </li>
//   <li>
//     <Link to="/about" className="linkStyle aboutText">About</Link>
//   </li>
//   <li>
//     <Link to="/contact" className="linkStyle contactText">Contact</Link>
//   </li>
//   <li>
//      <Link to="/blogs" className='linkStyle blogsText'>Blogs</Link>
//   </li>
//   <li>
//     <Link to="/admin/dashboard" className=" linkStyle nav-link-custom">Admin Dashboard</Link>
//   </li>
//  </ul>

//  <ul className={`navbar-right navListStyle ${isMenuOpen ? 'open' : ''}`}> 
//   <li>
//   <a href = "https://github.com/bramjot14" target='blank' className="linkStyle githubText">
//       <i className="fa fa-github"></i>
//   </a>
//   </li>
//   <li>
//   <a href ="https://www.linkedin.com/in/bramjot-singh" target='blank' className="linkStyle linkedInText">
//      <i className="fa fa-linkedin"></i>
//   </a>
//   </li>
  
//   </ul>

//    </nav>
//    )
//  }
//  export default Navbar;


 




































//  import React, { useState } from 'react';
//  import { Link } from 'react-router-dom';
//  import './Navbar.css';
 
//  function Navbar() {
//    const [isMenuOpen, setIsMenuOpen] = useState(false);
 
//    return (
//      <nav className="navStyle">
//        <div className="logo">
//          <Link to="/" className="linkStyle logoText">MyPortfolio</Link>
//        </div>
//        <div className="menuToggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
//          ☰
//        </div>
//        <ul className={`navListStyle ${isMenuOpen ? 'showMenu' : ''}`}>
//          <li><Link to="/" className="linkStyle" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
//          <li><Link to="/about" className="linkStyle" onClick={() => setIsMenuOpen(false)}>About</Link></li>
//          <li><Link to="/contact" className="linkStyle" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
//          <li><Link to="/github" className="linkStyle" onClick={() => setIsMenuOpen(false)}>Github</Link></li>
//        </ul>
//      </nav>
//    );
//  }
 
//  export default Navbar;





/* Navbar Container */
// .navStyle {
//     background: black;
//     padding: 15px 30px;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     /* position: sticky;
//     top: 0;
//     z-index: 1000; */
// }

// /* Logo */
// .logoText {
//     color: #f39c12;
//     text-decoration: none;
//     font-size: 1.8rem;
//     font-weight: bold;
// }

// /* Menu Toggle Button (Hamburger Menu) */
// .menuToggle {
//     display: none;
//     font-size: 1.8rem;
//     color: #f0f6fc;
//     cursor: pointer;
// }

// /* Navigation List */
// .navListStyle {
//     list-style: none;
//     display: flex;
//     gap: 20px;
//     margin: 0;
//     padding: 0;
// }

// .linkStyle {
//     text-decoration: none;
//     color: #f0f6fc;
//     font-size: 1.2rem;
// }

// .linkStyle:hover {
//     color: #f39c12;
// }

// /* Responsive Design */
// @media (max-width: 768px) {
//     .menuToggle {
//         display: block;
//     }

//     .navListStyle {
//         display: none;
//         flex-direction: column;
//         background: #0d1117;
//         padding: 15px;
//         border-radius: 5px;
//         position: absolute;
//         top: 50px;
//         right: 20px;
//     }

//     .navListStyle.showMenu {
//         display: flex;
//     }
// } 