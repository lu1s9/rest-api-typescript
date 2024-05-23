import User from '../models/user.model';
import { UserType } from '../models/user.model';
import Friendship from '../models/friendship.model';
import { UpdateFriendshipType } from '../schemas/friendship.schema';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getListUsers = async (loggedInUserId: any) => {
    // 1. Obtener los ObjectId de los amigos del usuario logueado con status "Accepted"
    const acceptedFriends = await Friendship.find({
        $or: [
            { user1_id: loggedInUserId, status: 'Accepted' },
            { user2_id: loggedInUserId, status: 'Accepted' }
        ]
    }).exec();

    // 2. Obtener los IDs de los amigos aceptados y del usuario logueado
    const friendIds = acceptedFriends.map((friend) => {
        if (friend.user1_id.toString() === loggedInUserId.toString()) {
            return friend.user2_id;
        } else {
            return friend.user1_id;
        }
    });

    // Agregar el ID del usuario logueado a la lista de IDs
    friendIds.push(loggedInUserId);

    // 3. Obtener los ObjectId de los amigos del usuario logueado con status "Pending"
    const pendingFriends = await Friendship.find({
        $or: [
            { user1_id: loggedInUserId, status: 'Pending' },
            { user2_id: loggedInUserId, status: 'Pending' }
        ]
    }).exec();

    // Obtener los IDs de los amigos pendientes
    const pendingFriendIds = pendingFriends.map((friend) => {
        if (friend.user1_id.toString() === loggedInUserId.toString()) {
            return friend.user2_id;
        } else {
            return friend.user1_id;
        }
    });

    // 4. Obtener todos los usuarios excepto los amigos (aceptados y pendientes) y el usuario logueado
    const excludedFriendIds = [...friendIds, ...pendingFriendIds];
    const users = await User.find({
        _id: { $nin: excludedFriendIds }
    }).select('name');

    return users;
};

export const createFriendship = async (user1_ID: string, user2_ID: string) => {
    const newFriendship = new Friendship({
        user1_id: user1_ID,
        user2_id: user2_ID
    });

    const friendshipSaved = await newFriendship.save();
    return friendshipSaved;
};

export const getFriendsService = async (userID: string) => {
    const listFriends = await Friendship.find({
        $or: [{ user1_id: userID }, { user2_id: userID }]
    })
        .populate<{ user: UserType }>('user1_id', '-password -email')
        .populate<{ user: UserType }>('user2_id', '-password -email');
    return listFriends;
};

export const deleteFriendService = async (friendshipID: string) => {
    const deletedFriendship = await Friendship.findByIdAndDelete(friendshipID);
    return deletedFriendship;
};

export const updateFriendship = async (friendship_ID: string, updatedFriendship: UpdateFriendshipType) => {
    const friendship = await Friendship.findByIdAndUpdate(friendship_ID, updatedFriendship, { new: true });
    return friendship;
};
