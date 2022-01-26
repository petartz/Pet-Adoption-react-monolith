const Model = require("./Model.js")
// const uniqueFactory = require("objection-unique")

// const unique = uniqueFactory({
//     fields: ["name"],
//     identifiers: ["id"]
// })

class Species extends Model{

    static get tableName(){
        return("species")
    }

    static get relationMappings(){
        const Pets = require("./Pets")
        return {
            pets:{
                relation: Model.HasManyRelation,
                modelClass: Pets,
                join:{
                    from:"species.id",
                    to:"pets.speciesId"
                }
            }
        }
    }

    static get jsonSchema(){
        return {
            type: "object",
            required: ["name"],
            properties: {
                name: {type: "string", minLength:1}
            }
        }
    }
}

module.exports = Species