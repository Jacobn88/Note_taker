const fs = require("fs");

module.exports = function(app) {
app.get("/api/notes", (req, res) => {
    const getNotes = JSON.parse(fs.readFileSync("./db/db.json"));
    res.json(getNotes)
})


app.post("/api/notes", (req, res) => {
    var noteData = req.body;
    noteData.id = "noteid" + Math.floor(Math.random() * 1000000);
    let notes = JSON.parse(fs.readFileSync("./db/db.json"))
    notes.push(noteData)
    fs.writeFileSync("./db/db.json", JSON.stringify(notes))
    res.json(notes)
})


app.delete("/api/notes/:id", (req, res) => {
    const { id } = req.params;
    let notes = JSON.parse(fs.readFileSync("./db/db.json"));
    for (let i = 0; i < notes.length; i++) {
        if (notes[i].id === id) {
            notes.splice(i, 1);
        }
    }

    fs.writeFileSync("./db/db.json", JSON.stringify(notes));
    res.json(notes)
});
}