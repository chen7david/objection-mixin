# Objection Mixin
Objection Mixin adds sync, getById and getByKey functionality to your classes, while automatically setting your class tablenames and timestamps to an ISOString.

## Getting Started
Below is an example to help you get started.

```js
const { dd } = require('funx-js')
const knexfile = require('./knexfile').development
const knex = require('knex')(knexfile)
const OM = require('objection-mixin')
const { Model } = require('objection')

Model.knex(knex)

class BaseModel extends  OM(Model) {
    // add your base model code here ...
}

class User extends BaseModel {

}
```

## API Documentation

#### .$sync()
The sycn method can only be called on an instance where a ManyToManyRelation has been defined.
This method takes three arguments. The first two are required, and the last one is optional.
e.g. <code>instance.$sync(relation_name, [1,2,3,4, ..., n], id_field_name)</code>

#### .getById()
The getById is an asynchronous class method, that takes in one argument and returns an object if a match was found else null. 
e.g. <code>class.getById(id)</code>

#### .getByKey()
The getByKey method can only be called on the class. It returns an object if a match was found else null. 
e.g. <code>class.getByKey(field_name, field_value)</code>