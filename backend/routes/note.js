const mongoose = require('mongoose');
const express = require('express')
const router=express.Router();
const Notes=require('../models/Notes');
const { body, validationResult } = require('express-validator');
var userfetching = require('../middleware/userfetching');


// to get all notes
router.get('/fetchallnotes',  userfetching, async (req, res) => {
  try {
      const notes = await Notes.find({ user: req.user.id });
      res.json(notes)
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
})

// to add notes
router.post('/addnote', userfetching, [
  body('title', 'Enter a valid title').isLength({ min: 3 }),
  body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),], async (req, res) => {
      try {
          const { title, description, tag } = req.body;

          // If there are errors, return Bad request and the errors
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
              return res.status(400).json({ errors: errors.array() });
          }
          const note = new Notes({
              title, description, tag, user: req.user.id
          })
          const savedNote = await note.save()

          res.json(savedNote)

      } catch (error) {
          console.error(error.message);
          res.status(500).send("Internal Server Error");
      }
  })

//

router.put('/updatenote/:id', userfetching, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
      // Create a newNote object
      const newNote = {};
      if (title) { newNote.title = title };
      if (description) { newNote.description = description };
      if (tag) { newNote.tag = tag };

      // Find the note to be updated and update it
      let note = await Notes.findById(req.params.id);
      if (!note) { return res.status(404).send("Not Found") }

      if (note.user.toString() !== req.user.id) {
          return res.status(401).send("Not Allowed");
      }
      note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
      res.json({ note });
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
})





//


router.delete('/deletenote/:id', userfetching, async (req, res) => {
  try {
      // Find the note to be delete and delete it
      let note = await Notes.findById(req.params.id);
      if (!note) { return res.status(404).send("Not Found") }

      // Allow deletion only if user owns this Note
      if (note.user.toString() !== req.user.id) {
          return res.status(401).send("Not Allowed");
      }

      note = await Notes.findByIdAndDelete(req.params.id)
      res.json({ "Success": "Note has been deleted", note: note });
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
})












// router1.get('/', (req, res) => {
//      console.log(req.body);
//        const notes=Notes(req.body);
//        notes.save()
//        res.send(req.body);
//      })
   
   
   
     
   
   module.exports = router;
   