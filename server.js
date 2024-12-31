const express = require('express');
const cors = require('cors'); 
/* The cors (Cross-Origin Resource Sharing) package is used in your Node.js backend to
 enable your React frontend (running on a different origin) to communicate with the backend server without being blocked by the 
 Same-Origin Policy enforced by web browsers.*/
 const pgp = require('pg-promise')();
const bodyParser = require('body-parser');
/* The body-parser package allows you to extract data from the request body, which is useful when you're building web applications that need to handle form data or other types of user input.*/
const multer = require('multer'); // For handling file uploads.
const path = require('path'); // For working with file paths.

const app = express();
const PORT = 5002;

// Database connection setup
const db = pgp({
  host: 'localhost',
  port: 5432,
  database: 'portfolio',
  user: 'postgres',
  password: 'Chauhan@123',
});


// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Serve static files (optional, in case you need this)
app.use(express.static(path.join(__dirname, 'public')));

// Set up multer for file storage
const storage = multer.diskStorage({ // multer.diskStorage() is a method provided by the multer library, which specifies where and how files should be stored on the serve
  destination: (req, file, cb) => { // cb (callback function) is used to locate the path and file
    cb(null, 'uploads/'); //cb expects the first argument to be an error, so null means there’s no error 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));     
    // Date.now(): Generates a unique timestamp (current date and time in milliseconds), used to avoid filename conflicts. This timestamp ensures that each uploaded file has a unique name.
    //  path.extname(file.originalname): Extracts the file extension from the original filename, e.g., .jpg, .png, etc., using Node’s path module. This allows the new filename to keep the original file extension.
  },
});

const upload = multer({ storage: storage });
// you must define upload with multer({ storage: storage }) to use it as middleware. The multer function is what provides the middleware functions (upload.single(), upload.array(), etc.) for handling file uploads in your routes.

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Node.js backend for React!');
});

app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await db.any('SELECT * FROM contacts'); // Fetch all contacts
    res.status(200).json(contacts); // Send the data as JSON response
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body; // Extract data from the request body
  // These name, email and message are bein taken from const formData = { name, email, message }; which is in contact.js

  try {
    const result = await db.one(
      'INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3) RETURNING *',
      [name, email, message]
    );
    // If you're inserting a row and need to know the generated id (or any other field created by the database, like created_at), 
    // and thus used RETURNING to fetch it, and db.one ensures exactly one row is returned. Because here, id is being generated with each user.

    res.status(201).json({ message: 'Message saved successfully!', data: result });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ error: 'Failed to save contact' });
  }
});

// POST: Create a new blog with image upload
app.post('/api/blogs', upload.single('image'), async (req, res) => {
  const { title, content, summary } = req.body;
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    await db.none(
      'INSERT INTO blogs (title, content, summary, image_url, author, created_at) VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)',
      [title, content, summary, image_url, 'Admin']
    );
    res.status(201).send('Blog created successfully');
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).send('Server error');
  }
});

// GET: Fetch all blogs
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await db.any('SELECT * FROM blogs');
    res.json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Fetch a single blog by ID
app.get('/api/blogs/:id', async (req, res) => {
  const blogId = req.params.id; 
  // params are the values after the colon in url. For eg. Here, it is "id" in "/api/blogs/:id'"
  try {
    const blog = await db.one('SELECT * FROM blogs WHERE id = $1', [blogId]);
    res.json(blog);
  } catch (err) {
    console.error('Error fetching blog:', err);
    res.status(500).send('Server error');
  }
});

// Edit a blog
// app.post('/api/blogs/:id', async (req, res) => {
//   const blogId = req.params.id; // Blog ID from the route parameter
//   const { title } = req.body; 
//   /* title in const { title } = req.body; in your server.js code corresponds directly to the title key sent from the handleEdit function */

//   try {
//     const blog = await db.one(
//       'UPDATE blogs SET title = $1 WHERE id = $2 RETURNING *', // Update the title in the blogs table
//       [title, blogId]
//     );
//     res.status(200).json({ message: 'Blog updated successfully', blog });
//   } catch (err) {
//     console.error('Error updating blog:', err);
//     res.status(500).send('Server error');
//   }
// });


// Delete a blog
app.delete('/api/blogs/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.none('DELETE FROM blogs WHERE id = $1', [id]);
    res.status(200).send('Blog deleted');
  } catch (err) {
    console.error('Error deleting blog:', err);
    res.status(500).send('Server error');
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

/* The RETURNING clause is used in SQL to return specific data after performing an operation like INSERT, UPDATE, or DELETE.
 It is particularly useful when you want to retrieve details about the affected rows without having to make a separate query.*/

 /*When to Use RETURNING in an INSERT:
 
You would use RETURNING if:

You Need the Inserted Data: For example, the id or other generated fields (like created_at) of the newly inserted blog are 
required for further operations or for the client. */