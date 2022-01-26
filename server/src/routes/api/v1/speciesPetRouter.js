import express from "express"
import objection from "objection"
const { ValidationError } = objection

import Pets from "../../../models/Pets.js"
import cleanUserInput from "../../../services/cleanUserInput.js"

const speciesPetRouter = new express.Router({ mergeParams: true })

speciesPetRouter.post("/", async (req, res) => {
  const { body } = req
  const formInput = cleanUserInput(body)
  const { name, available, weight, estimatedAge } = formInput
  const { speciesId } = req.params

  try {
    const newPet = await Pets.query().insertAndFetch({ name, available, weight, estimatedAge, speciesId })

    return res.status(201).json({ pet: newPet })
  } catch (error){
    console.log(error)
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

export default speciesPetRouter