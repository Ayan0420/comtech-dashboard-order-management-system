const express = require('express');

app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.listen(3000, () => console.log('express is running'))


app.get('/home', (req, res) => {
    res.send('Hello World from /home endpoint.')
})

app.post('/display-name', (req, res) => {
    res.send(`Hello there ${req.body.firstName} ${req.body.lastName}!`)
})