# Overview
Shemaless, Promise based mongoDB driver, **Just connect to a collection and use!**

## Installation
`` npm install simple-mongo-client ``

## Database Name
Database name is automatically generated from your application name in package.json file

## Connect To Collection
> connect to a collection (create if doesn't exist)
### sample code
```typescript
  const Db = require('simple-mongo-client')
  const userDB = await Db.connect('Users')
```

## Save One
> save one documents

### parameters
```typescript
    - data: Object
```
### sample code
```typescript
  const res = await userDb.save({
    name:'Prince',
    location:'Abuja, Nigeria'
  })

```
### sample response
```typescript
  {
    success: true,
    _id:'asdjflekll'
  }
```


## Save Many
> save many documents
### parameters
```typescript
- data: Array<Object>
```
### sample code
```typescript
  const res = await userDb.saveMany([
    {
      name:'Prince',
      location:'Abuja, Nigeria',
      gender:'male'
    },
    {
      name:'Abdul',
      location:'Accra, Ghana',
      gender:'male'
    }
  ])

```
### sample response
```typescript
{
  success: true,
  _ids:['ksjdlfsjlajkf','kljsljdfsdlkf']
}
```


## Get One
> get one document

### parameters
```typescript
  - searchQuery: Object
```
### sample code
```typescript
  const res = await userDb.getOne({name:'Prince'})
```
### sample response
```typescript
  {
    success: true,
    data:{
      name:'Prince',
      location:'Abuja, Nigeria'
    }
  }
```


## Search
> search for documents
### parameters
```typescript
- searchQuery: Object
```
### sample code
```typescript
  const res = await userDb.search({gender:'male'})
```
### sample response
```typescript
  {
    success: true,
    data:[
      {
        name:'Prince',
        location:'Abuja, Nigeria',
        gender:'male'
      },
      {
        name:'Abdul',
        location:'Accra, Ghana',
        gender:'male'
      }
    ]
  }
```

## Get All
> get all documents
### sample code
```typescript
  const res = await userDb.getAll()
```
### sample response
```typescript
  {
    success: true,
    data:[
      {
        name:'Prince',
        location:'Abuja, Nigeria',
        gender:'male'
      },
      {
        name:'Abdul',
        location:'Accra, Ghana',
        gender:'male'
      }
    ]
  }
```

## Update
> update a document
### parameters
```typescript
- searchQuery: Object
- data: Object
```
### sample code
```typescript
  const res = await userDb.update({name:'Prince'},{location:'Lagos,Nigeria'})
```
### sample response
```typescript
  {success: true}
```

## Delete
> delete a document 
### parameters
```typescript
- searchQuery: Object
```
### sample code
```typescript
  const res = await userDb.delete({name:'Prince'})
```
### sample response
```typescript
  {success: true}
```

## Delete All
> deletes all documents
### sample code
```typescript
  const res = await userDb.deleteAll()
```
### sample response
```typescript
  {success: true}
```

## Drop
> delete the collection
### sample code
```typescript
  const res = await userDb.deleteAll()
```
### sample response
```typescript
  {success: true}
```

## Disconnect
> disconnect from database
### sample code
```typescript
  await userDb.disconnect()
```
### sample response
```typescript
  {success: true}
```

## Configuration Options
> you can also set some connect options
### sample code
```typescript
  const Db = require('simple-mongo-client')
  const userDB = await Db.connect('Users',{
    database: 'MyDB', //defaults to package.json name field
    mongoURL:'mongodb://localhost:27018', //defaults to mongodb://localhost:27017
  })
```