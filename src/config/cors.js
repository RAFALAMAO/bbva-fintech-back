const whiteList = ["http://localhost:3000", "http://localhost:3001", "http://localhost:3002", "http://20.114.144.5"];

const corsOptions = {
    origin: function(origin, callback){
        console.log('El origen a admitir', origin)
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if(!origin) return callback(null, true);

        if( whiteList.indexOf(origin) === -1 ){
            var msg = 'The CORS policy for this site does not ' +
                    'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
}

module.exports = { corsOptions };
