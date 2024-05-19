import User from '../models/user.model';

export const getUserByEmail = async (email: string) => {
    const userFound = await User.findOne({ email });
    return userFound;
};

export const getUserById = async (id: string) => {
    const userFound = await User.findById(id).select('email name');
    return userFound;
};

export const createUser = async (email: string, name: string, password: string) => {
    const newUser = new User({
        email,
        password,
        name
    });

    const userSaved = await newUser.save();
    return userSaved;
};
