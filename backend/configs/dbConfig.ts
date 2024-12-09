import sequelize from './sequalize';
import { Form } from '../models/form.models';
import { FormField } from '../models/form.models';
import { ResponseData } from '../models/formResponse.models';

const syncDatabase = async () => {
    try {
        // Sync all models
        await sequelize.sync({ force: false }); // Set to true if you want to drop and recreate tables
        console.log('Database synchronized successfully');
    } catch (error) {
        console.error('Unable to synchronize database:', error);
    }
};

export default syncDatabase;

// In your main server file (e.g., server.ts or app.ts)
// import syncDatabase from './path/to/this/file';
// syncDatabase();