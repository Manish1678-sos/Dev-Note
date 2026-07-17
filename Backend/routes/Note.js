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

module.exports = router;