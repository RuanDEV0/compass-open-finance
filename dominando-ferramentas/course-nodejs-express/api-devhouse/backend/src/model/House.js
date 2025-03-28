import { Schema, model} from 'mongoose';

const HouseSchema = new Schema({
    thumbnail: String,
    description: String,
    title: String,
    price: Number,
    locatin: String,
    status: Boolean,
    use: {  
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

});


export default model('House', HouseSchema);