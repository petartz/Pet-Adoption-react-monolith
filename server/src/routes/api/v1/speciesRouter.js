import express from "express"
import { Species } from "../../../models/index.js"
import speciesPetRouter from "./speciesPetRouter.js"

const speciesRouter = new express.Router()

speciesRouter.use("/:speciesId/pets", speciesPetRouter)

speciesRouter.get("/", async (req,res) =>{
    try{
        const species = await Species.query()
        return res.status(200).json({species})
    }catch(error){
        return res.status(500).json({errors:error})
    }
})

speciesRouter.get("/:id", async (req, res) =>{
    const { id } = req.params
    try{
        const species = await Species.query().findById(id)
        console.log(species)
        species.pets = await species.$relatedQuery("pets")

        return res.status(200).json({species})

    }catch (error){
        return res.status(500).json({errors:error})
    }
})


export default speciesRouter