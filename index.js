const config = require('./dbConfig')
const { ObjectID } = require('mongodb')
const jsonfile = require('jsonfile')

const Database = {
    connect: async function (coll){
        try{
            console.log('configuring..')
            this.db = jsonfile.readFileSync('package.json').name
            this.config = await config(this.db)
            return new Db(this.config,coll)
        }catch(err){
            console.log(err)
            throw 'couldn not parse json file'
        }
    },
    deleteDatabase: async function(){
       if(!config) throw 'no database selected'
       const res = this.config.collection(this.db).drop()
       return {success: res?true:false}
    },
}



class Db {
    
    #collection;
    constructor(config,coll) {
        this.#collection = config.collection(coll);
    }
    
    async save(data){
        if(!data)  throw 'data cannot be undefined'
        else{
            const res = await this.#collection.insertOne(data)
            return {success: res?true:false, _id:  res.insertedId}
        }
    }

    async saveMany(data=[]){
        if(!data)  throw 'data cannot be undefined'
        else{
            const res = await this.#collection.insertMany(data)
            return {success: res?true:false, n:res.result? res.result.n:undefined,  _ids: res.insertedIds}
        }
    }
  
    async getOne(query={}){
        const res = (await this.#collection.find(query).toArray())[0]
        return {success: res?true:false, data: res}
    }


    async search(query={},sort={}){
        const res = await this.#collection.find(query).sort(sort).toArray()
        return {success: res?true:false, data: res}
    }


    async getAll(sort={}){
        const res = await this.#collection.find().sort(sort).toArray()
        return {success: res?true:false, data: res}
    }


    async update(query,newData){
        if(!newData)  throw 'data cannot be undefined'
        else{
            const savableData = {
                $set: newData
            }
            const res = await this.#collection.updateOne(query,savableData)
            return {success: res?true:false, n:res.n}
        }
    }

    async delete(query){
        const res = await this.#collection.deleteMany(query)
        return {success: res?true:false, n:res.n}
    }


    async deleteAll(){
        const res = await this.#collection.deleteMany()
        return {success: res?true:false, n:res.n}
    }


    watch(listenFor,callback){
        this.#collection.watch([
            {
                $match: {}
            }
        ],{'fullDocument': "updateLookup"}).on("change", function(event) {
            console.log(JSON.stringify(event));
            
            if((listenFor===event.operationType))
                callback({
                    documentId: event.documentKey._id,
                    fullDocument: event.fullDocument,
                    description: event.updateDescription
                })
        });
    }
 


}

module.exports = Database