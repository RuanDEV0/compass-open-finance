import jwt from 'jsonwebtoken';
import User from '../model/User';
import authConfig from '../../config/auth';

class SessionController{

    async store(request, response){
        const {email, password} = request.body; 

        const user = await User.findOne({
            where: {email}
        });

        if(!user){
            return response.status(401).json({error: 'user not register'});
        }

        if(!(await user.checkPassword(password))){
            return response.status(401).json({error: 'password invalid!'});
        }

        const { id, name }= user;
         return response.json({
            user: {id,name,email},
            token: jwt.sign({id}, authConfig.secret, {
                expiresIn: authConfig.expiresIn
            })
         })
    }
}

export default new SessionController();