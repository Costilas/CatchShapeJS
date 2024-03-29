const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
    console.log(__dirname);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});