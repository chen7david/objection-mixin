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
            const relId = customId ? customId : 
                pluralize.singular(relation) + '_id'
            
            await this
                .$relatedQuery(relation)
                .relate(add)
            await this
                .$relatedQuery(relation)
                .unrelate()
                .whereIn(relId, remove)
        }

        $beforeInsert(){
            this.created_at = timestamp()
            this.updated_at = timestamp()
        }

        $beforeUpdate(){
            this.updated_at = timestamp() 
        }

    }
    
    return BaseModel
}