const express = require('express')
const app = express()
const port = process.env.PORT || 81;
app.use(express.static(__dirname))
app.get('/', (req, res) => res.sendFile(__dirname+'/static/html/index.html'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
