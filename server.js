const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded images

// Multer storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'lv33global'
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('❌ MySQL connection failed:', err);
    process.exit(1);
  }
  console.log('✅ Connected to MySQL database');
});

// Signup API
app.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const [existing] = await db.promise().query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    if (existing.length > 0) {
      return res.status(409).json({ message: 'Email already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.promise().query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );

    res.json({ message: 'Signup successful!' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// Login API
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
    const [users] = await db.promise().query(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );

    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    const user = users[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// ✅ Create Post API
app.post('/api/create-post', upload.single('image'), async (req, res) => {
  const { title, content, link } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  if (!title || !content || !image) {
    return res.status(400).json({ message: 'Title, content, and image are required.' });
  }

  try {
    await db.promise().query(
      'INSERT INTO posts (title, content, link, image) VALUES (?, ?, ?, ?)',
      [title, content, link, image]
    );
    res.status(201).json({ message: 'Post created successfully!' });
  } catch (error) {
    console.error('Error saving post:', error);
    res.status(500).json({ message: 'Server error while saving post.' });
  }
});

// ✅ Fetch posts
app.get('/api/posts', async (req, res) => {
  try {
    const [rows] = await db.promise().query('SELECT * FROM posts ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Error fetching posts' });
  }
});

// ✅ Save updated casino info
app.post('/api/update-casino', upload.single('logo'), async (req, res) => {
  console.log("🚀 Incoming Casino Edit Submission:", req.body);
  console.log("📁 Uploaded File:", req.file);

  const { id, label1, label2, country, website, ranking } = req.body;

  if (!id) {
    return res.status(400).json({ message: 'Casino ID is required for updating.' });
  }

  const payments = Array.isArray(req.body['payments[]'])
    ? req.body['payments[]']
    : [req.body['payments[]']];

  const logo = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    // Check if casino with given ID exists
    const [existingRows] = await db.promise().query('SELECT * FROM casinos WHERE id = ?', [id]);
    if (existingRows.length === 0) {
      return res.status(404).json({ message: 'Casino not found.' });
    }

    const updateQuery = logo
      ? 'UPDATE casinos SET label1=?, label2=?, country=?, website=?, logo=?, payments=?, ranking=? WHERE id=?'
      : 'UPDATE casinos SET label1=?, label2=?, country=?, website=?, payments=?, ranking=? WHERE id=?';

    const values = logo
      ? [label1, label2, country, website, logo, JSON.stringify(payments), ranking, id]
      : [label1, label2, country, website, JSON.stringify(payments), ranking, id];

    await db.promise().query(updateQuery, values);

    res.status(200).json({ message: 'Casino updated successfully!' });
  } catch (error) {
    console.error('Error updating casino info:', error);
    res.status(500).json({ message: 'Server error while updating casino.' });
  }
});



// ✅ Get list of all casinos
app.get('/api/casino-list', async (req, res) => {
  try {
    const [rows] = await db.promise().query('SELECT * FROM casinos ORDER BY ranking ASC');
    const formatted = rows.map(c => ({
      ...c,
      payments: JSON.parse(c.payments)
    }));
    res.json(formatted);
  } catch (error) {
    console.error('Error fetching casinos:', error);
    res.status(500).json({ message: 'Error fetching casino list' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

app.post('/api/create-casino', upload.single('logo'), async (req, res) => {
  console.log("🚀 Creating new casino:", req.body);
  const { label1, label2, country, website, ranking } = req.body;

  if (!label1 || !label2 || !country || !website || !ranking) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const payments = Array.isArray(req.body['payments[]'])
    ? req.body['payments[]']
    : [req.body['payments[]']];

  const logo = req.file ? `/uploads/${req.file.filename}` : null;

  if (!logo) {
    return res.status(400).json({ message: 'Logo upload is required.' });
  }

  try {
    await db.promise().query(
      'INSERT INTO casinos (label1, label2, country, website, logo, payments, ranking) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [label1, label2, country, website, logo, JSON.stringify(payments), ranking]
    );

    res.status(201).json({ message: 'New casino created successfully!' });
  } catch (error) {
    console.error('Error creating casino:', error);
    res.status(500).json({ message: 'Server error while creating casino.' });
  }
});


app.delete('/api/delete-casino/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "Casino ID is required." });

  try {
    const [check] = await db.promise().query('SELECT * FROM casinos WHERE id = ?', [id]);
    if (check.length === 0) {
      return res.status(404).json({ message: 'Casino not found.' });
    }

    await db.promise().query('DELETE FROM casinos WHERE id = ?', [id]);
    res.status(200).json({ message: 'Casino deleted successfully.' });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Server error while deleting casino." });
  }
});
