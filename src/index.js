import express from 'express';

const app = express();
const port = 3003;

app.get('/', (req, res) => {
    return res.send('REST API is working fine!');
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});