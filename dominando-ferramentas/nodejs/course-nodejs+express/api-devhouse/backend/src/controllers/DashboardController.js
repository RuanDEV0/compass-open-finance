import House from "../model/House";


class DashBoardController{

    async show(request, response){
        const { user_id } = request.headers;
        const houses = await House.find({ user: user_id });

        return response.json(houses);
    }

}

export default new DashBoardController();