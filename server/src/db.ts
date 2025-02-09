import mongoose from 'mongoose'
import { mongooseURL } from './config';
mongoose.connect(mongooseURL);

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

const contentTypes = ['image', 'video', 'article', 'audio']

const contentSchema = new mongoose.Schema({
    link: {type: String, required: true},
    type: {type: String, enum: contentTypes , required: true},
    title: {type: String, required: true},
    tags: [{type: mongoose.Types.ObjectId, ref: 'Tag'}],
    userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true}
})

const linkSchema = new mongoose.Schema({
    hash: {type: String, required: true},
    userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true}
})

const tagSchema = new mongoose.Schema({
    tag: {type: String, required: true, unique: true}
})

export const Link = mongoose.model('Link', linkSchema)
export const UserModel = mongoose.model('User', userSchema);
export const contentModel = mongoose.model('Content', contentSchema);
export const Tag = mongoose.model('Tag', tagSchema)

