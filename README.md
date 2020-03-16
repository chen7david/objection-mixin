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
The sycn method can only be called where a ManyToManyRelation has been defined on the class.
This method takes three arguments. The first two are required, and the last one is optional.
e.g. <code>instance.$sync('relation-name', [1,2,3,4], 'name of id_field in relation_table')