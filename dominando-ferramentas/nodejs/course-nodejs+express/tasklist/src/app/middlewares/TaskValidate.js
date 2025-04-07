import * as Yup from 'yup';

class TaskValidate{
    async validateBodyPost(request, response, next){
        const schema = Yup.object().shape({
            task: Yup.string().required()
        })

        if(!(await schema.isValid(request.body))) 
            return response.status(400).json({error: 'value fields invalid!'});

        return next();
    }
}

export default new TaskValidate();