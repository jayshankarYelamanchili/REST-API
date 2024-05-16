const express = require('express');
const mongoose = require('mongoose');
const Movie = require('./movies'); // Import the model
const app = express();
const uri = "mongodb+srv://yjayshankar123:f8KLpRJFWuwTnuQy@cluster0.kv6kpn3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.use(express.json()); // Middleware to parse JSON bodies

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});

const connectionParams ={
  useNewUrlParser: true,
  useUnifiedTopology: true,
}
mongoose.connect(uri,connectionParams)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));


// CREATE
app.post('/movies', async (req, res) => {
  const movie = new Movie(req.body);
  try {
    await movie.save();
    res.status(201).send(movie);
  } catch (error) {
    res.status(400).send(error);
  }
});

// READ all
app.get('/movies', async (req, res) => {
  try {
    const movie = await Movie.find({});
    res.status(200).send(movie);
  } catch (error) {
    res.status(500).send();
  }
});

// READ one by ID
app.get('/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).send();
    }
    res.send(movie);
  } catch (error) {
    res.status(500).send();
  }
});

// UPDATE
app.patch('/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!movie) {
      return res.status(404).send();
    }
    res.send(movie);
  } catch (error) {
    res.status(400).send(error);
  }
});

// DELETE
app.delete('/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).send();
    }
    res.send(movie);
  } catch (error) {
    res.status(500).send();
  }
});