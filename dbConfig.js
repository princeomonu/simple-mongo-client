const {MongoClient} = require('mongodb');

const MONGO_URL = (process.env.MONGO_URL||"mongodb://localhost/default")+"?replicaSet=rs0"


module.exports = async (database)=>{
    if(!database) 
        throw new Error('provide a databse')
    else{
        const connection = await MongoClient.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        return await connection.db(database);
    }
}