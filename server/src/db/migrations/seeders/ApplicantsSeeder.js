import {Pets, Applicant, Application, Species} from "../../../models/index.js"

class ApplicantsSeeder{
    static async seed(){
        console.log("Seeding applicants...")
        const ohad = await Applicant.query().insert({name:"Ohad Porat"})
        const nick = await Applicant.query().insert({name:"Nick Alberts"})
        const nana = await Pets.query().findOne("name", "Nana")

        console.log(nana)
        console.log(ohad)

        const reptiles = await Species.query().findOne("name", "Reptiles")
        console.log(reptiles)

        await ohad.$relatedQuery("pets").insert({name:"Snake", available: true, weight: 200, speciesId: reptiles.id})
        //await nana.$relatedQuery("applicants").relate(ohad)

        //await Application.query().insert({ petId: nana.id, applicantId: nick.id })
    }
}

export default ApplicantsSeeder