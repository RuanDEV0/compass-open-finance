import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';
class User extends Model{
    static init(sequelize){
        super.init({
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            password: Sequelize.VIRTUAL,
            password_hash: Sequelize.STRING
        },{
            sequelize
        });
        this.addHook('beforeSave', async (User) => {
            User.password_hash = await bcrypt.hash(User.password, 6);
        })
        
        return this;
    }

    checkPassword(password){
        return bcrypt.compare(password, this.password_hash);
    }
}

export default User;