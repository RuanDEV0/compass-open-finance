import House from '../model/House';

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
}

export default new HouseController();