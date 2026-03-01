const express = require('express');
const mongoose = require('mongoose');
const Project = require('./models/Project');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://127.0.0.1:27017/projectDB')
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch(err => console.log(err));

/* HOME PAGE */
app.get('/', (req, res) => {
  res.render('home');
});

/* VIEW ALL PROJECTS */
app.get('/projects', async (req, res) => {
  const projects = await Project.find();
  res.render('projects', { projects });
});

/* FILTER BY DOMAIN */
app.get('/domain/:name', async (req, res) => {
  const domainName = req.params.name;
  const projects = await Project.find({ domain: domainName });
  res.render('projects', { projects });
});

/* SHOW ADD FORM */
app.get('/create', (req, res) => {
  res.render('form');
});

/* SAVE PROJECT */
app.post('/create', async (req, res) => {
  const { title, domain, description, github } = req.body;
  await Project.create({ title, domain, description, github });
  res.redirect('/projects');
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});