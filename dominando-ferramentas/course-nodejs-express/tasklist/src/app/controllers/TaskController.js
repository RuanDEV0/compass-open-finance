import Task from '../model/Task';

class TaskController {
    async store(request, response){
        const { task } = request.body;
        
        const taskSaved = await Task.create({
            user_id: request.userId,
            task
        });

        return response.json(taskSaved);
    }

    async index(request, response){
        const tasks = await Task.findAll({
            where: {
                user_id: request.userId,
                check: false
            }
        });

        return response.json(tasks);
    }

    async update(request, response){
        const {  id } = request.params;
        const { check } = request.body;

        console.log(id)
        const task = await Task.findByPk(id);

        if(!task){
            return response.status(400).json({error: 'task not exists!'});
        }

        await task.update({check});

        return response.send();
    }

    async destroy(request, response){
        const { id } = request.params;

        const task = await Task.findByPk(id);

        if(!task)
            return response.status(400).json({error: 'task not exists!'});

        if(task.user_id !== request.userId)
            return response.status(401).json({error: 'user not authorized delete this task'});

        await Task.destroy({where: { id }});

        return response.send();
    }
}

export default new TaskController();