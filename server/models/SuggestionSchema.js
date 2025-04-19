import mongoose from "mongoose";

const SuggestionSchema = new mongoose.Schema({

    name: {

        type: String,
        required: true
    },

    email: {

        type: String,
        required: true
    },
    
    profilePic: {

        type: String,
        required: true
    },

})

export default mongoose.model('Suggestion', SuggestionSchema);