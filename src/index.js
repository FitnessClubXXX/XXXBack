import express from 'express';

const app = express();
const port = 3003;

app.get('/', (req, res) => {
		console.log('FETCHED REQUEST ON /');
    return res.send('REST API is working fine!');
});

app.listen(process.env.PORT || 3003, () => {
    console.log(`App is listening on port ${port}`);
		console.log('APP IS CURELY STARTED');
});
