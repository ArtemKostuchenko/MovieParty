import mongoose, { Mongoose } from 'mongoose';

const connectToDB = async (uri: string): Promise<Mongoose> => {
    return await mongoose.connect(uri);
}

export default connectToDB;
