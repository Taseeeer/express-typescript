import express, { Express, Request, Response } from 'express';

const app: Express = express();
const PORT = 5000;
import databaseConnection from './lib/databaseConnection';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Schemas
import User from './schemas/User';

//database conneciton
databaseConnection();

//get all the users

app.get('/', (req: Request, res: Response) => {
    res.send('Express+Ts')
});

app.get('/users', async (req: Request, res:Response) => {
    const users = await User.find();
    return res.send(users);
})

// get single user
app.post('/user/:name', async (req: Request, res: Response) => {
    const { name } = req.params;
    const user = await User.findOne({ name});
    if(!user) {
        return res.status(404).send('Not found');
    }
    return user;
})

//register user
app.post('/register', async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if(user) return res.send('User exists already!');
    const newUser = User.create(req.body);
    return res.send(newUser);
});

//deactivate user
app.post('/delme', async (req: Request, res: Response) => {
    const { name } = req.body;
    const removedUser = User.deleteOne({ name }).remove().exec();
    return res.send(removedUser);
})

app.listen(PORT, () => console.log(`Listening on ${PORT}...`))


