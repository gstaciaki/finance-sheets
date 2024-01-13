import functions from './src/functions/index.js';
import * as dotenv from 'dotenv'
import express from 'express'


dotenv.config()

const app = express()
const port = 3000

app.use(express.json());

app.post('/receiveGmailWebhook', async (req, res) => {
    try {
        const messageId = await functions.getMessageIdFromHistory(req.body);
        

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})