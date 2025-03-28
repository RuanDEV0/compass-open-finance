import House from '../model/House';

class HouseController{
    async store(request, response){
        console.log(request.body);
        console.log(request.file);

        return response.json({message: 'sucessful'});
    }
}

export default new HouseController();