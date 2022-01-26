const Model = require("./Model.js")

class Applicant extends Model{
    static get tableName(){
        return ("applicants")
    }


    static get relationMappings(){
        const Pets = require("./Pets.js")
        const Application = require("./Application.js")

        return {
            pets:{
                relation: Model.ManyToManyRelation,
                modelClass: Pets,
                join:{
                    from: "applicants.id",
                    through: {
                        from: "applications.applicantId",
                        to: "applications.petId"
                    },
                    to: "pets.id"
                }
            },
            applications: {
                relation: Model.HasManyRelation,
                modelClass: Application,
                join: {
                    from: "applicants.id",
                    to: "applications.applicantId"
                }


            }
        }
    }

    static get jsonSchema(){
        return {
            type: "object",
            required: ["name"],
            properties: {
                name: {type:"string"}
            }
        }
    }

}

module.exports = Applicant