import express from 'express';
import { createHotel, deleteHotel, readHotels, readHotel, updateHotel, countByCity, countByType } from '../controllers/hotel.js';
import { verifyAdmin } from '../utils/verifyuser.js';

const router = express.Router();

//CREATE
//READ
//UPDATE
//DELETE

router.get('/countByCity', countByCity);
router.get('/countByType', countByType);
router.get('/:id', readHotel);
router.post('/', verifyAdmin, createHotel);  
router.put('/:id', verifyAdmin, updateHotel);
router.delete('/:id', verifyAdmin, deleteHotel);

router.get('/', readHotels);
// router.get('/countByType', countByType);


export default router;