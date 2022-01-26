import React, { useState } from "react"

const NewPetForm = ({ postPet }) => {
  const [newPet, setNewPet] = useState({
    name: "",
    available: "",
    weight: "",
    estimatedAge: ""
  })

  const handleInputChange = event => {
    setNewPet({
      ...newPet,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    postPet(newPet)
    clearForm()
  }

  const clearForm = () => {
    setNewPet({
      name: "",
      available: "",
      weight: "",
      estimatedAge: ""
    })
  }

  return (
    <div className="callout">
      <h1>Add a Pet of this Species</h1>
      <form onSubmit={handleSubmit} >
        <label>
          Name:
          <input
            type="text"
            name="name"
            onChange={handleInputChange}
            value={newPet.name}
          />
        </label>

        <div>
          <p>This pet is available for adoption:</p>
          <input
            type="radio"
            name="available"
            value="true"
            checked={newPet.available === "true"}
            onChange={handleInputChange}
          />
          <label>True</label>

          <input
            type="radio"
            name="available"
            value="false"
            checked={newPet.available === "false"}
            onChange={handleInputChange}
          />
          <label>False</label>
        </div>

        <label>
          Weight:
          <input
            type="text"
            name="weight"
            onChange={handleInputChange}
            value={newPet.weight}
          />
        </label>

        <label>
          Estimated Age:
          <input
            type="text"
            name="estimatedAge"
            onChange={handleInputChange}
            value={newPet.estimatedAge}
          />
        </label>

        <div className="button-group">
          <input className="button" type="submit" value="Submit" />
        </div>
      </form>
    </div>
  )
}

export default NewPetForm
