import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'userID is required']
    },
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    slug: {
        type: String,
        required: [true, 'Slug is required'],
        unique: true
    },
    excerpt: {
        type: String,
        required: [true, 'Excerpt is required']
    },
    content: {
        type: String,
        required: [true, 'Content is required']
    },
    author: {
        type: String,
        required: [true, 'Author is required']
    },
    category: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now()
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    imageURL: {
        type: String
    }
})

const PostSchema = mongoose.models.posts || mongoose.model('posts', postSchema);

export default PostSchema