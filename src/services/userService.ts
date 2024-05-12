import User from '../models/user.model';

export const getUserByEmail = async (email: string) => {
    const userFound = await User.findOne({ email });
    return userFound;
};

export const getUserById = async (id: string) => {
    const userFound = await User.findById(id).select('_id');
    return userFound;
};

export const createUser = async (email: string, password: string) => {
    const newUser = new User({
        email,
        password
    });
    const userSaved = await newUser.save();
    return userSaved;
};
