import { Pets } from "../../../models/index.js"

class PetSeeder{
    static async seed(){
        const petData = [
            {name: "Joey", available:true, estimatedAge:45, speciesId:1},
            {name: "Nana", available:false, weight:400, speciesId:2}
        ]

        for (const singlePet of petData){
            const currentPet = await Pets.query().findOne({name: singlePet.name})
            if(!currentPet){
                await Pets.query().insert(singlePet)
            }

        }

    }
}

export default PetSeeder
