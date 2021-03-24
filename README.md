# Objection Mixin (OMX)
Objection Mixin adds: 
- auto pluralization of tablename
- sync 
- getById
- getByKey 

functionality to your classes, while automatically setting your class tablenames and timestamps (to an ISOString).

## Getting Started
Below is an example to help you get started.

```js
const knexfile = require('./knexfile').development
const knex = require('knex')(knexfile)
const OM = require('objection-mixin')
const { Model } = require('objection')
const bcrypt = require('bcrypt')
const BCRYPT_ROUNDS = 12

Model.knex(knex)

class BaseModel extends  OM(Model) {

    // add your base model code here ...

    $formatJson(json) {
        json = super.$formatJson(json)
        delete json.user_id
        delete json.password
        return json
    }

}

class User extends BaseModel {

    // example of extending your model with bycript package

    async verifyPassword(password){
        return await bcrypt.compare(password, this.password)    
    }

    async $beforeInsert(context){
        await super.$beforeInsert(context)
        if(this.password) this.password = await bcrypt
            .hash(this.password, BCRYPT_ROUNDS)
    }

    async $beforeUpdate(context){
        await super.$beforeInsert(context)
        if(this.password) this.password = await bcrypt
            .hash(this.password, BCRYPT_ROUNDS)
    }

}
```

## API Documentation

#### .$sync()
The sycn method can only be called on an instance where a ManyToManyRelation has been defined.
This method takes three arguments. The first two are required, and the last one is optional.
e.g.
```js
instance.$sync('relation_name', [1,2,3,4, ..., n], 'id_field_name')
```

#### .getById()
The getById is an asynchronous class method, that takes in one argument and returns an object if a match was found else null. 
e.g.
```js
class.getById(id)
```

#### .getByKey()
The getByKey method can only be called on the class. It returns an object if a match was found else null. 
e.g.

```js
class.getByKey('field_name', 'field_value')
```