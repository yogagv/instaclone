import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({

    image: {

        type:String,
        required:true
    },
    caption: {

        type:String,
        required:true
    },

    likes: [
        {
            _id: false,
            user: {
              id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
              },
              name: {
                type: String,
                required: true
              }
            }
          }
],

    comments : [{
        
        user: {
          id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
          },
          name: {
            type: String,
            required: true
          }
        },
        
        comment: {

            type:String
        }

    }],

    likeCount : {

        type:Number
    },

    commentCount : {

        type:Number
    },

    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        name: {
            type: String,
            required:true
        },
        profilePic: {
            type:String,
            required:true
        }
    }
}, 

{ timestamps: true })

export default mongoose.model('Post', PostSchema);