const Model = require("./Model.js")

class Application extends Model{
    static get tableName(){
        return ("applications")
    }


    static get relationMappings(){
        const Pets = require("./Pets.js")
        const Applicant = require("./Application.js")

        return {
            pet:{
                relation: Model.BelongsToOneRelation,
                modelClass: Pets,
                join:{
                    from: "applications.petId",
                    to: "pets.id"
                }
            },
            applicant: {
                relation: Model.BelongsToOneRelation,
                modelClass: Applicant,
                join: {
                    from: "applications.applicantId",
                    to: "applicants.id"
                }


            }
        }
    }

}

module.exports = Application