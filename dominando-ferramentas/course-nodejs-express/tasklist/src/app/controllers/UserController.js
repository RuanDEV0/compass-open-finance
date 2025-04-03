import User from '../model/User'

class UserController{
    async store(request, response){

        const userExists = await User.findOne({
            where: {email: request.body.email}
        });
        if(userExists){
            return response.status(400).json({error: 'user is registed!'});
        }
        const { id, name, email } = await User.create(request.body);

        return response.json({
            id,
            name,
            email
        });
    }

    async update(request, response){
        console.log(request.userId);
        return response.json({active: true});
    }
}

export default new UserController();