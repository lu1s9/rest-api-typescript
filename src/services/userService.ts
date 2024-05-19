import User from '../models/user.model';
import { UserType } from '../models/user.model';
import Friendship from '../models/friendship.model';

export const getListUsers = async (user1_ID: string) => {
    const listUsers = await User.find({
        _id: {
            $ne: user1_ID
        }
    }).select('name');
    return listUsers;
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

export const deleteFriendService = async (user1_ID: string, user2_ID: string) => {
    const deletedFriendship = await Friendship.deleteOne({
        $and: [
            {
                user1_id: user1_ID
            },
            {
                user2_id: user2_ID
            }
        ]
    });
    return deletedFriendship;
};
