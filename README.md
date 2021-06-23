# Overview
Shemaless, Promise based mongoDB driver, **Just connect to a collection and use!**

## Installation
`` npm install https://github.com/princeomonu/simple-mongo-driver.git ``

## Database Name
Database name is automatically generated from your application name in package.json file

## Connect To Collection
> connect to a collection (create if doesn't exist)
### sample code
```
  const Db = require('simple-mongo-driver')
  const userDB = await Db.connect('Users')
```

## Save One
> save one documents

### parameters
```
    - data: Object
```
### sample code
```
  const res = await userDb.save({
    name:'Prince',
    location:'Abuja, Nigeria'
  })

```
### sample response
```
  {
    success: true,
    _id:'asdjflekll'
  }
```


## Save Many
> save many documents
### parameters
```
- data: Array<Object>
```
### sample code
```
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
```
{
  success: true,
  _ids:['ksjdlfsjlajkf','kljsljdfsdlkf']
}
```


## Get One
> get one document

### parameters
```
  - searchQuery: Object
```
### sample code
```
  const res = await userDb.getOne({name:'Prince'})
```
### sample response
```
  {
    success: true,
    data:{
      name:'Prince'
      location:'Abuja, Nigeria'
    }
  }
```


## Search
> search for documents
### parameters
```
- searchQuery: Object
```
### sample code
```
  const res = await userDb.search({gender:'male'})
```
### sample response
```
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
```
  const res = await userDb.getAll()
```
### sample response
```
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
```
- searchQuery: Object
- data: Object
```
### sample code
```
  const res = await userDb.update({name:'Prince'},{location:'Lagos,Nigeria'})
```
### sample response
```
  {success: true}
```

## Delete
> delete a document 
### parameters
```
- searchQuery: Object
```
### sample code
```
  const res = await userDb.delete({name:'Prince'})
```
### sample response
```
  {success: true}
```

## Delete All
> deletes all documents
### sample code
```
  const res = await userDb.deleteAll()
```
### sample response
```
  {success: true}
```

## Drop
> delete the collection
### sample code
```
  const res = await userDb.deleteAll()
```
### sample response
```
  {success: true}
```