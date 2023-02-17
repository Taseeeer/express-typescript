import express, { Express, Request, Response } from 'express';

const app: Express = express();
const PORT = 3000;
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
    return res.send(user);
})

//register user
app.post('/register', async (req: Request, res: Response) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if(user) return res.send('User exists already!');
    const newUser = User.create(req.body);
    return res.send(newUser);
});

//deactivate user
app.delete('/delme', async (req: Request, res: Response) => {
    const { name } = req.body;
    const user = await User.findOne({ name});
    const removedUser = await User.deleteOne({ name }).remove().exec();
    return res.send(`${user.name} removed!`);
});

//update user
app.put('/update/:name', async (req: Request, res: Response) => {
    const { name } = req.params;
    const { newname } = req.body;
    const user = await User.updateOne({ name }, { $set: { name: newname }});
    return res.send(user);
})

app.listen(PORT, () => console.log(`Listening on ${PORT}...`))


