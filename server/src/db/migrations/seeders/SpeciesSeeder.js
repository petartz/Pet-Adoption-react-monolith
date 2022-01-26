import { Species } from "../../../models/index.js"

class SpeciesSeeder{
    static async seed(){
        const speciesData = [
            {name: "Mammals"},
            {name: "Reptiles"}
        ]

        for (const singleSpecies of speciesData){
            const currentSpecies = await Species.query().findOne({name: singleSpecies.name})
            if(!currentSpecies){
                await Species.query().insertAndFetch(singleSpecies)
            }

        }

    }
}

export default SpeciesSeeder