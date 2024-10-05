import express from 'express';
import { createRoom, deleteRoom, readRoom, readRooms, updateRoom } from '../controllers/room.js';
import { readHotels } from '../controllers/hotel.js';
import { verifyAdmin } from '../utils/verifyuser.js';

const router = express.Router();

router.post('/:hotelId', createRoom );
router.put('/:hotelId/:id', verifyAdmin, updateRoom);
router.get('/:hotelId/:id', verifyAdmin, readRoom);
router.get('/:hotelId', verifyAdmin, readRooms);
router.delete('/:hotelId/:id', verifyAdmin, deleteRoom);

export default router;