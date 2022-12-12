import config from './dbConfig'
import {readFileSync} from 'fs'
import {normalize,join} from 'path'
import { connectOptions, keyVal } from './types'
import { Db,Collection,ChangeStreamDocument, Document,MongoClient } from 'mongodb'

export class Database {
    
    public collection: Collection;
    constructor(coll:string,private client:MongoClient, private options:connectOptions) {
        this.collection = this.client.db(this.options.database).collection(coll);
    }
    
    async save(data:keyVal){
        if(!data)  throw 'data cannot be undefined'
        else{
            const res = await this.collection.insertOne(data)
            return {success: res?true:false, _id:  res.insertedId}
        }
    }

    async saveMany(data:keyVal[]){
        if(!data || data.length<1)  throw 'data cannot be undefined'
        else{
            const res = await this.collection.insertMany(data)
            return {success: res?true:false, n:res.insertedIds? res.insertedCount:undefined,  _ids: res.insertedIds}
        }
    }
  
    async getOne(query:keyVal){
        const res = (await this.collection.find(query).toArray())[0]
        return {success: res?true:false, data: res}
    }


    async search(query:keyVal,sort?:keyVal){
        const res = await this.collection.find(query).sort(sort||{}).toArray()
        return {success: res?true:false, data: res}
    }


    async getAll(sort?:keyVal){
        const res = await this.collection.find().sort(sort||{}).toArray()
        return {success: res?true:false, data: res}
    }


    async update(query:keyVal,newData:keyVal){
        if(!newData)  throw 'data cannot be undefined'
        else{
            const savableData = {
                $set: newData
            }
            const res = await this.collection.updateOne(query,savableData)
            return {success: res?true:false, n:res.upsertedCount}
        }
    }

    async delete(query:keyVal){
        const res = await this.collection.deleteMany(query)
        return {success: res.acknowledged?true:false, n:res.deletedCount}
    }


    async deleteAll(filter?:keyVal){
        const res = await this.collection.deleteMany(filter||{})
        return {success: res.acknowledged?true:false, n:res.deletedCount}
    }


    watch(listenFor:ChangeStreamDocument<Document>['operationType'],callback:(event:ChangeStreamDocument<Document>)=>void){
        this.collection.watch([
            {
                $match: {}
            }
        ],{'fullDocument': "updateLookup"}).on("change", function(event) {
            console.log(JSON.stringify(event));
            
            if((listenFor===event.operationType)) callback(event)
        });
    }


    async drop(){
        const res = await this.collection.drop()
        return {success: res?true:false}
    }

    disconnect(){
        return this.client.close()
    }

}

const readJSON = (path:string):Promise<any> =>{
    return new Promise((resolve,reject)=>{
        try {
            resolve(JSON.parse(readFileSync(normalize(path),'utf8')))
        } catch (error) {
            reject(error)
        }

    })
}

export const connect = async function (collection:string,options?:connectOptions){
    try{       
        options||={}     
        options.database||=(await readJSON(join(process.cwd(),'package.json'))).name
        const client = await config(options)
        return new Database(collection,client,options)
    }catch(err){
        console.log(err)
        throw 'couldn not parse json file'
    }
}





export default {connect,Database}

