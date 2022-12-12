import { ObjectId } from 'mongodb';
import Db,{Database} from '../src/index'

describe(':Database',()=>{

    // jest.setTimeout(30000)
    
    const mockCollection = 'users'
    let userDb:Database;
    let id: ObjectId;

    beforeAll(async()=>{
        userDb = await Db.connect(mockCollection,{mongoURL:'mongodb://localhost:27018'})
    })
    
    const mockUser = {
        name: 'Prince',
        gender: 'Male',
        dob: new Date(),
        loginUsing: 'Facebook'
    }
    
    const manyMock = [
        {
            name: 'Prince',
            gender: 'Male',
            dob: new Date(),
            loginUsing: 'Facebook'
        },
        {
            name: 'Jamiu',
            gender: 'Male',
            dob: new Date(),
            loginUsing: 'Instagram'
        }
    ]
    
    /**
     * TODO: listen test
     */
    // it('should listen for insert',(done)=>{
    //     //watch collection (insert)
    //     userDb.watch('insert',(response)=>{
    //         expect(response).toBe({success:true})
    //         done()
    //     });
    // })
    
    it('should save one item to db', async () => {
        
        //save data to collection
        const response = await userDb.save(mockUser);
        id = response._id
        expect(response.success).toBe(true);
    });
    
    it('should save many item to db', async () => {
        //save many data to collection
        const response7 = await userDb.saveMany(manyMock);
        expect(response7.success).toBe(true);
        
    });
    
    it('should get one item from db', async () => {
        //get one data from collection
        const response1 = (await userDb.getOne({_id:id})).data;
        expect(response1.name).toBe(mockUser.name);
    });
    
    it('should search items from db', async () => {
        //search for data in collection
        const response2 = (await userDb.search({_id:id})).data[0];
        expect(response2.name).toBe(mockUser.name);
    });
    
    it('should get all items from db', async () => {
        
        //get all data from collection
        const response3 = (await userDb.getAll()).data    
        expect(response3.every(d=>manyMock.map(m=>m.name).includes(d.name))).toBe(true);
    });
    
    it('should update one item in db', async () => {
        
        //update data in collection
        await userDb.update({_id:id},{name:'James'});
        //fetch updated
        const response4 = (await userDb.getOne({_id:id})).data;
        expect(response4.name).toBe('James');
    });
    
    it('should delete one item from db', async () => {
        
        //delete data in collection
        await userDb.delete({name:'James'});
        const response5 = (await userDb.getOne({_id:id})).data;
        expect(response5).toBeUndefined();
    });
        
    it('should delete all items db', async () => {
        
        await userDb.save(mockUser);
        await userDb.deleteAll();
        const response6 = (await userDb.getOne({_id:id})).data;
        expect(response6).toBeUndefined();
        
    });


})