const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Note = require('../models/Notes');
const fetchUser = require('../middleware/fetchUser');
// ROUTE:1:-Get all the Note: Get "/api/Note/fetchallNote". Doesn't require Auth
router.get('/fetchallNote', fetchUser, async (req, res) => {
    try{const Notes = await Note.find({ user: req.user.id })

    res.json(Notes)
}
catch(error){
    console.log(error.message);
    res.status(500).send("Internal server error");
}

})
// ROUTE:2:-Add a new note: Post "/api/Note/addNote".Login required
router.post('/addNote', fetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter a valid description').isLength({ min: 5 }),
], async (req, res) => {
    try{
    const { title, description, tag } = req.body;

    const errors = validationResult(req);
if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
}
const note = new Note({
    title,description,tag,user: req.user.id

})
const saveNote=await note.save();
res.json(saveNote)
    }catch(error)
    {
        console.log(error.message);
    res.status(500).send("Internal server error");
    }
})
// ROUTE:3:-Update an existing note: Put "/api/Note/updatenote/:id".Login required
router.put('/updatenote/:id',fetchUser,async(req,res)=>{
    const{title,description,tag}=req.body;
    //Create a newnote object
    try{const newNote={};
    if(title){newNote.title=title};
        if(description){newNote.description=description};
        if(tag){newNote.tag=tag};
//Find the note to be updated and update it
let note=await Note.findById(req.params.id);
if(!note){res.status(404).send("Not found")};
if(note.user.toString()!==req.user.id){
    return res.status(401).send("Not allowed");
}
 note=await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{retunDocument:"after"})
res.json(note)
    }
    catch(error){
         console.log(error.message);
    res.status(500).send("Internal server error");

    }

})
// ROUTE:3:-Delete an existing note: Delete "/api/Note/deleteenote/:id".Login required
router.delete('/deletenote/:id',fetchUser,async(req,res)=>{
    
    
try{
//Find the note to be deletd and delete it
let note=await Note.findById(req.params.id);
if(!note){res.status(404).send("Not found")};
//Allow deletion only if user owns this note
if(note.user.toString()!==req.user.id){
    return res.status(401).send("Not allowed");
}
 note=await Note.findByIdAndDelete(req.params.id,{retunDocument:"after"})
res.json({Success: "Note has been deleted",note:note})
    }
    catch(error){
         console.log(error.message);
    res.status(500).send("Internal server error");
    }
});
module.exports = router;