/*
    metodos: index, show, store, destroy and update

    index: listagem de sessoes
    show: listar uma sessao
    store: criar uma sessao
    update: atualizar uma sessao
    destroy: deletar uma sessao
 */

import User from '../model/User'

class SessionController{
    async store(request, response){
        const { email } = request.body;

        let user = await User.findOne({ email });

        if(!user){
            user = await User.create({ email });
        }

        return response.json(user);
    }

    async index(request, response){
        const users = await User.find();

        return response.json(users);
    }
}



export default new SessionController();