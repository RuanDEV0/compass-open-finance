import Reserve from '../model/Reserve';
import User  from '../model/User';
import House from '../model/House';
class ReserveController{
    async store(request, response) {
        const { user_id } = request.headers;
        const { house_id } = request.params;
        const { date } = request.body;

        const house = await House.findById(house_id);
        if(!house){
            return response.status(400).json({error: 'house not exists!'})
        }
        
        const user = await User.findById(user_id);
        if(!user){
            return response.status(400).json({error: 'user not exists!'});
        }

        if(String(user._id) === String(house.user)){
            return response.status(400).json({error: 'user created this house'});
        }

        const reserve = await Reserve.create({
            user: user_id,
            house: house_id,
            date
        });

        await reserve.populate('user');
        await reserve.populate('house');


        return response.json(reserve);
    }

    async index(request, response){
        const reserves = await Reserve.find();

        return response.json(reserves);
    }

    async show(request, response){
        const { id } = request.params;

        const reserves = await Reserve.find({ user: id }).populate('house');

        return response.json(reserves);
    }

    async destroy(request, response){

        const { id } = request.params;

        await Reserve.findByIdAndDelete({ _id: id});

        return response.send();
    }
}

export default new ReserveController();