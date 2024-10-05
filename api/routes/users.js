import express from 'express';
import { deleteUser, readUser, readUsers, updateUser } from '../controllers/user.js';
import { verifyAdmin, verifyToken , verifyUser} from '../utils/verifyuser.js';

const router = express.Router();

router.get('/register', (req, res) => {
    res.send('Welcome to User End Points...');
});

router.get('/checkauthentication', verifyToken ,(req, res) => {
    console.log(req.hello);
    res.send('Welcome here.... User is logged in');
});

router.get('/checkuser/:id', verifyUser ,(req, res) => {
    res.send('hello user, you are logged in. Now you can delete your account.');
});

router.get('/checkadmin/:id', verifyAdmin ,(req, res) => {
    res.send('hello admin, you are logged in. Now you can delete all your account.');
});

router.get('/', verifyAdmin, readUsers);
router.get('/:id', verifyUser, readUser);
router.put('/:id', verifyUser, updateUser);
router.delete('/:id', verifyUser, deleteUser);

export default router;