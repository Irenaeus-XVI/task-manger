import dev from './dev.config';

const env = process.env.NODE_ENV || 'dev';

const configurations = {
    dev,
};

const config = configurations[env];

export default () => config();
