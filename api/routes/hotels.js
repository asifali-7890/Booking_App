import express from 'express';
import { createHotel, deleteHotel, readHotels, readHotel, updateHotel } from '../controllers/hotel.js';
import { verifyAdmin } from '../utils/verifyuser.js';

const router = express.Router();

//CREATE
//READ
//UPDATE
//DELETE

router.get('/:id', readHotel);
router.get('/', readHotels);
router.post('/', verifyAdmin, createHotel);  
router.put('/:id', verifyAdmin, updateHotel);
router.delete('/:id', verifyAdmin, deleteHotel);


export default router;