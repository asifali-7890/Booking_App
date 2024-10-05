import Hotel from '../models/Hotel.js';
import Room from '../models/Room.js';


export const createRoom = async (req, res, next) => {
    const hotelID = req.params.hotelId;

    // Validate input data if necessary
    const newRoom = new Room(req.body); // Just create an instance

    try {
        // Save the new room to the database
        const savedRoom = await newRoom.save();

        // Update the hotel with the new room ID
        await Hotel.findByIdAndUpdate(hotelID, { $push: { rooms: savedRoom._id } }); // Use $push to add to an array

        // Respond with the saved room information
        res.status(200).json(savedRoom);
    } catch (error) {
        // Pass any errors to the error-handling middleware
        next(error);
    }
}


export const readRooms = async (req, res, next) => {

    try {
        const readRooms = await Room.find();
        res.status(200).json(readRooms);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const updateRoom = async (req, res) => {
    try {
        const updateRoom = await Room.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updateRoom);
    } catch (error) {
        res.status(500).json(error);
        console.log(error.message);
    }
}

export const deleteRoom = async (req, res) => {
    try {
        const deletedRoom = await Room.findByIdAndDelete(req.params.id);
        res.status(200).json({deletedRoom});
    } catch (error) {
        res.status(500).json(error);
        console.log(error.message);
    }
}

export const readRoom = async (req, res, next) => {

    try {
        const readRoom = await Room.findById(req.params.id);
        res.status(200).json(readRoom);
    } catch (error) {
        res.status(500).json(error);
    }
}