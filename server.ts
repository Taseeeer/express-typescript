import express, { Express, Request, Response } from 'express';

const app: Express = express();
const PORT = 5000;

//get
app.get('/', (req: Request, res: Response) => {
    res.send('Express+Ts')
})

app.listen(PORT, () => console.log(`Listening on ${PORT}...`))


