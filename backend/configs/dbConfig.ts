import sequelize from './sequalize';
import { Form } from '../models/form.models';
import { FormField } from '../models/form.models';
import { ResponseData } from '../models/formResponse.models';

const syncDatabase = async () => {
    try {
        // Sync all models
        await sequelize.sync({ force: false });
        console.log('Database synchronized successfully');
    } catch (error) {
        console.error('Unable to synchronize database:', error);
    }
};

export default syncDatabase;

