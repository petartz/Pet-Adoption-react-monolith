import express from "express"
import Pets from "../../../models/Pets.js"

const petsRouter = new express.Router()

petsRouter.get("/:id", async (req, res) =>{
    const id = req.params.id
    try{
        const pet = await Pets.query().findById(id)

        pet.applicants = await pet.$relatedQuery("applicants")

        return res.status(200).json({ pet })
    }catch (error){
        return res.status(500).json({errors:error})
    }
})

export default petsRouter