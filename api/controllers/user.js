import User from '../models/User.js';

export const readUsers = async (req, res, next) => {
    const failed = false;
    if (failed) return next(createError(401, 'This is a bad request.'));

    try {
        const readUser = await User.find();
        res.status(200).json(readUser);
        console.log(readUser);
    } catch (error) {
        res.status(500).json(error);

        console.log(error.message);
    }
}

export const updateUser = async (req, res) => {
    try {
        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updateUser);
    } catch (error) {
        res.status(500).json(error);
        console.log(error.message);
    }
}

export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        res.status(200).json('Hotel has been deleted...');
    } catch (error) {
        res.status(500).json(error);
        console.log(error.message);
    }
}

export const readUser = async (req, res, next) => {
    const failed = false;
    if (failed) return next(createError(401, 'This is a bad request.'));

    try {
        const readUser = await User.findById(req.params.id);
        res.status(200).json(readUser);
    } catch (error) {
        res.status(500).json(error);

        console.log(error.message);
    }
}