const express = require('express')
const multer = require('multer')
var bodyParser = require('body-parser');
const cors = require('cors')
const upload = multer({
    dest: 'uploads/'
})
const p = require('path');

const app = express()
app.use(bodyParser.json({
    limit: '50mb',
    extended: true
})); // for parsing application/json
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
})); // for parsing application/x-www-form-urlencoded
app.options('/upload', cors())

app.post('/upload', cors(), function (req, res, next) {
    console.log(req.body);
    // res.json({
    //     key: req.file.filename
    // })
    res.send(req.body)
})
app.get('/upload/:key', cors(), function (req, res, next) {
    res.sendFile(`uploads/${req.params.key}`, {
        root: __dirname,
        headers: {
            'Content-Type': 'image/jpeg',
        },
    }, (error) => {
        if (error) {
            res.status(404).send('Not found')
        }
    })
})
var port = process.env.PORT || 3000

app.listen(port)