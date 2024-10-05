import Hotel from '../models/Hotel.js';

export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body)

    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    } catch (error) {
        next(error);
    }
}


export const readHotels = async (req, res, next) => {

    try {
        const limit = parseInt(req.query.limit) || 20;
        const readHotel = await Hotel.find(req.query).limit(limit);
        res.status(200).json(readHotel);
    } catch (error) {
        next(error);
    }
}

export const updateHotel = async (req, res) => {
    try {
        const updateHotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updateHotel);
    } catch (error) {
        res.status(500).json(error);
        console.log(error.message);
    }
}

export const deleteHotel = async (req, res) => {
    try {
        const deletedHotel = await Hotel.findById(req.params.id);
        res.status(200).json('Hotel has been deleted...');
    } catch (error) {
        res.status(500).json(error);
        console.log(error.message);
    }
}

export const readHotel = async (req, res, next) => {
    const failed = false;
    if (failed) return next(createError(401, 'This is a bad request.'));

    try {
        const readHotel = await Hotel.findById(req.params.id);
        res.status(200).json(readHotel);
        console.log(readHotel);
    } catch (error) {
        res.status(500).json(error);

        console.log(error.message);
    }
}

export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(',');
    console.log(cities);
    try {
        const list = await Promise.all(
            cities.map(city => Hotel.countDocuments({ city }))
        );

        res.status(200).json(list);
    } catch (error) {
        next(error);
    }
}

export const countByType = async (req, res, next) => {
    try {
        const hotelCount = await Hotel.countDocuments({ type: 'Hotel' });
        const apartmentCount = await Hotel.countDocuments({ type: 'Apartment' });
        const resortCount = await Hotel.countDocuments({ type: 'Resort' });
        const villaCount = await Hotel.countDocuments({ type: 'Villa' });
        const cabinCount = await Hotel.countDocuments({ type: 'Cabin' });
        res.status(200).json([
            { type: 'Hotel', count: hotelCount },
            { type: 'Apartment', count: apartmentCount },
            { type: 'Resort', count: resortCount },
            { type: 'Villa', count: villaCount },
            { type: 'Cabin', count: cabinCount }
        ]);

    } catch (error) {
        next(error);
    }
}
