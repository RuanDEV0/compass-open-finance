import * as Yup from 'yup';


class ValidBody{

    async checkPostUser(request, response, next){
        console.log(request.body);
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().min(6).required()
        });
    
        if(!(await schema.isValid(request.body))){
            return response.status(400).json({error: 'validation failed in body of post'});
        }
    
        return next();
    }

    async checkPutUser(request, response, next){
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            oldPassword: Yup.string().min(6),
            password: Yup.string().min(6).when('oldPassword', (oldPassword, field) => {
                oldPassword ? field.required() : field
            }),
            confirmPassword: Yup.string().when('password', (password, field) => {
                password ? field.required().oneOf([Yup.ref('password')]) : field
            })
        });

        if(!(await schema.isValid(request.body))){
            return response.status(400).json({error: 'validation failed in body of put'})
        }

        return next();
    }

    async checkPostTask(request, response, next){
        const schema = Yup.object().shape({
            task: Yup.string().required()
        })

        if(!(await schema.isValid(request.body))) 
            return response.status(400).json({error: 'value fields invalid!'});

        return next();
    }
}
export default new ValidBody();