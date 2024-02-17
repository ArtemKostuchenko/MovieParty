import UserModel, { User } from "../models/user.model";
import { BadRequestError, UnAuthorizedError, NotFoundError } from "../errors";
import { generateAvatarColorHex } from "../utils/functions";
import { UserToken } from "../utils/interfaces";


class UserRepository {
    constructor() { }

    async singUpUser(userData: User): Promise<UserToken> {
        const { nickname, email, password } = userData;

        if (!nickname || !email || !password) {
            throw new BadRequestError('Please provide nickname, email and password');
        }

        userData.avatarColor = generateAvatarColorHex();

        const user = await UserModel.create({ ...userData });

        const token = user.createToken();

        return { user, token };
    }

    async loginUser(userData: User): Promise<UserToken> {
        const { email, password } = userData;

        if (!email || !password) {
            throw new BadRequestError('Please provide email and password');
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            throw new UnAuthorizedError('Invalid credentials');
        }

        const correctPassword = await user.comparePassword(password);

        if (!correctPassword) {
            throw new UnAuthorizedError('Invalid credentials');
        }

        const token = user.createToken();

        return { user, token };
    }

    async getUserById(userId: string): Promise<User> {
        const user = await UserModel.findById(userId).select('-password');

        if(!user){
            throw new NotFoundError('User not found');
        }

        return user;
    }
}

export default new UserRepository();