import House from '../model/House';
import User from '../model/User';

class HouseController{


    async store(request, response){
        const { filename } = request.file;
        const {title, description, price, status, location} = request.body;
        const {user_id} = request.headers;

        const house = await House.create({
            user: user_id,
            thumbnail: filename,
            title,
            description,
            price,
            status,
            location
        });

        return response.json(house);
    }

    async filter(request, response){
        const status = request.query.status;
        let houses;
        if(status === undefined){
            houses = await House.find();
            return response.json(houses);
        }
        houses = await House.find({status});

        return response.json(houses);
    }

    async destroy(request, response){
        const {id} = request.params;
        const {user_id} = request.headers;

        const user = await User.findById(user_id);
        const house = await House.findById(id);

        if(String(user._id) !== String(house.user)){
            return response.status(401).json({error: 'user not authorized!'});
        }

        await House.findByIdAndDelete(id);

        return response.send();
    }

    async update(request, response){
        const { filename } =  request.file;
        const {id}  = request.params;
        const{user_id} = request.headers;
        const{description, title, location, price, status} = request.body;

        const user = await User.findById(user_id);
        const house = await House.findById(id);

        if(String(user._id) !== String(house.user)){
            return response.status(401).json({error: 'user session not authorized!'});
        }

        await House.updateOne({ _id: id }, {
            user: user_id,
            thumbnail: filename,
            description,
            title,
            price,
            location,
            status
        });

        return response.send();
    }
}

export default new HouseController();