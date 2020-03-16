const { pluralize, timestamp, notIn } = require('funx-js')

module.exports = (Model) => {

    class BaseModel extends Model {

        static get tableName() {
            return pluralize(this.name.toLowerCase())
        }

        static async getById(id){
            return await this.getByKey('id', id)
        }

        static async getByKey(key, value){
            return await this
                .query()
                .where(key, value)
                .first()
        }

        async sync(relation, target, customId){
            const related = await this.$relatedQuery(relation)
            const original = related.map(el => el.id)
            const add = notIn(target, original)
            const remove = notIn(original, target)
            if(add.length + remove.length == 0) return false
            const relId = customId ? customId : 
                pluralize.singular(relation) + '_id'
            
            const added = await this
                .$relatedQuery(relation)
                .relate(add)
            const removed = await this
                .$relatedQuery(relation)
                .unrelate()
                .whereIn(relId, remove)
            return added + removed > 0
        }

        async verifyPassword(password){
            return await bcrypt.compare(password, this.password)    
        }

        async $beforeInsert(){
            if(this.password) this.password = await bcrypt
                .hash(this.password, BCRYPT_ROUNDS)
            this.created_at = timestamp()
            this.updated_at = timestamp()
        }

        async $beforeUpdate(){
            this.updated_at = timestamp() 
        }

    }

    return BaseModel
}