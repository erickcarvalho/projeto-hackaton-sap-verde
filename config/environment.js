config = {
    development: {
        port: process.env.PORT || 3000
    },

    production: {
        port: process.env.PORT || 3000
    }
}

const env = process.env.NODE_ENV || 'development';

module.exports = config[env];