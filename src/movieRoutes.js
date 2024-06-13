
   const express = require('express');
   const router = express.Router();
   const Movie = require('./movieModel');

   // Create a new movie
   router.post('/movies', async (req, res) => {
       try {
           const movie = new Movie(req.body);
           await movie.save();
           res.status(201).send(movie);
       } catch (err) {
           res.status(400).send(err);
       }
   });

   // Get all movies
   router.get('/movies', async (req, res) => {
       try {
           const movies = await Movie.find();
           res.status(200).send(movies);
       } catch (err) {
           res.status(500).send(err);
       }
   });

   // Get a movie by ID
   router.get('/movies/:id', async (req, res) => {
       try {
           const movie = await Movie.findById(req.params.id);
           if (!movie) return res.status(404).send();
           res.status(200).send(movie);
       } catch (err) {
           res.status(500).send(err);
       }
   });

   // Update a movie by ID
   router.patch('/movies/:id', async (req, res) => {
       try {
           const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
           if (!movie) return res.status(404).send();
           res.status(200).send(movie);
       } catch (err) {
           res.status(400).send(err);
       }
   });

   // Delete a movie by ID
   router.delete('/movies/:id', async (req, res) => {
       try {
           const movie = await Movie.findByIdAndDelete(req.params.id);
           if (!movie) return res.status(404).send();
           res.status(200).send(movie);
       } catch (err) {
           res.status(500).send(err);
       }
   });

   module.exports = router;