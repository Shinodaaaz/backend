import express from 'express';
const app = express();
const port = process.env.PORT || 3001;

const middlewareJson = express.json();
app.use(middlewareJson);

let db = {
    courses: [
        {id: 1, name: 'Frontend'},
        {id: 2, name: 'Backend'},
        {id: 3, name: 'QA'},
        {id: 4, name: 'BA'},
    ],
}

app.get('/courses', (req, res) => {
    res.send(db.courses);
})

app.get('/courses/:id', (req, res) => {
    let currentCourse = db.courses.find(course => course.id === +req.params.id);

    if (!currentCourse) {
        res.sendStatus(404).send('Not found course');
        return;
    }

    res.json(currentCourse);
})

app.post('/courses', (req, res) => {
    const createCourse = {name: req.body.title, id: +(new Date())}
        db.courses.push(createCourse)
        res.status(201).json(createCourse);
})

app.delete('/courses/:id', (req, res) => {
    db.courses = db.courses.filter(c => c.id !== +req.params.id);

    res.sendStatus(204);
})

app.put('/courses/:id', (req, res) => {
    let currentCourse = db.courses.find(course => course.id === +req.params.id);

    if (!currentCourse) {
        res.sendStatus(404).send('Not found course');
        return;
    }

    currentCourse.name = req.body.title;

    res.json(currentCourse);
})


app.listen(port, () => {
    console.log(`Example app listening ${port}`)
})