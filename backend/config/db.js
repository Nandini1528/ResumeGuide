import mongoose from "mongoose"

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://tekwadenandini_db_user:resume789@cluster0.fkrenmj.mongodb.net/RESUME')
    .then( () => console.log('DB CONNECTED'))
}