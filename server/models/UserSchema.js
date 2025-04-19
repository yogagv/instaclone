import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobno: {
        type: Number,
        required: true
    },
    profilePic: {

        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },

    posts: {
        type: [
            {
                _id: false,
                id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Post',
                    required: true
                },
                image: String,
                caption: String,
                likes: String,
                name: String,
                comment: String,

                likedBy: [
                    {
                     _id: false,
                      id: String,
                      name: String
                    }
                  ],

                  commentedBy: [
                    {
                     _id: false,
                      id: String,
                      name: String
                    }
                  ],
            }
        ],
        default: []
    },

    userStatus : {

        type: [
            {
                _id: false,
                id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Status',
                    required: true
                },
                statusPic: String,
                caption: String,
            }
        ]
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('User', UserSchema)