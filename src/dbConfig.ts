import {MongoClient} from "mongodb"
import { connectOptions } from "./types"
const MONGO_URL = "mongodb://localhost/27017"



export default async (opts:connectOptions)=>{

    const mongoURL = opts.mongoURL|| MONGO_URL 

    if(!opts.database) 
        throw new Error('provide a databse')
    else{
        const connection = await MongoClient.connect(mongoURL as string,{
        });
        return connection;
    }
}