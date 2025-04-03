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
        const { email, oldPassword } = request.body;

        const user = await User.findByPk(request.userId);

        if(email != user.email){
            const userExists = await User.findOne({
                where: {email}
            })

            if(userExists){
                return response.status(400).json({error: 'user exists'})
            }
        }

        if(oldPassword && !(await user.checkPassword(oldPassword))){
            return response.status(401).json({error: 'incorrect password'});
        }

        if(request.body.password){
            user.password = request.body.password;
        }

        user.name = request.body.name;
        user.email = email;

        const {id, name} = await user.save();

        return response.json({
            id,
            name,
            email
        })
    }
}

export default new UserController();