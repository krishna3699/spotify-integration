import { AppDataSource } from '../config/data-source';
import { User } from '../entities/User';
import { IUser } from '../models/interfaces';
import { ApiError } from '../utils/apiError';

const userRepository = AppDataSource.getRepository(User);

export const createOrUpdateUser = async (
    userData: Partial<IUser>
): Promise<User> => {
    try {
        let user = await userRepository.findOne({
            where: { spotifyId: userData.spotifyId },
        });

        if (user) {
            user.accessToken = userData.accessToken || user.accessToken;
            user.refreshToken = userData.refreshToken || user.refreshToken;
            user.tokenExpiry = userData.tokenExpiry || user.tokenExpiry;
        } else {
            user = userRepository.create({
                spotifyId: userData.spotifyId,
                accessToken: userData.accessToken,
                refreshToken: userData.refreshToken,
                tokenExpiry: userData.tokenExpiry,
            });
        }

        return await userRepository.save(user);
    } catch (error) {
        throw new ApiError(500, 'Failed to create or update user');
    }
};

export const getUserById = async (id: string): Promise<User | null> => {
    try {
        return await userRepository.findOne({
            where: { id },
        });
    } catch (error) {
        throw new ApiError(500, 'Failed to fetch user');
    }
};
