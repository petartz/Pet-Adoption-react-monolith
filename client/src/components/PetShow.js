import React, { useState, useEffect } from "react"

const PetShow = props => {
  const [pet, setPet] = useState({
    name: "",
    available: "",
    weight: "",
    estimatedAge: "",
    applicants: []
  })

  const getPet = async () => {
    const petId = props.match.params.id
    try {
      const response = await fetch(`/api/v1/pets/${petId}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const body = await response.json()
      debugger
      setPet(body.pet)
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    getPet()
  }, [])

  // const applicantListItems = pet.applicants.map(applicantObject => {
  //   return(
  //     <li>{applicantObject.firstName} {applicantObject.lastName}</li>
  //   )
  // })

  const applicantListItems = pet.applicants.map(applicantObject => {
    return(
      <li>{applicantObject.name}</li>
    )
  })


  let availabilitySection, weightSection, estimatedAgeSection
  if(pet.available) {
    availabilitySection = <p>{pet.name} is available!</p>
  } else {
    availabilitySection = <p>{pet.name} has already been adopted.</p>
  }
  if(pet.weight) {
    weightSection = <p>Weight: {pet.weight} lbs</p>
  }
  if(pet.estimatedAge) {
    estimatedAgeSection = <p>Estimated Age: {pet.estimatedAge}</p>
  }

  return(
    <div>
      <h1>{pet.name}</h1>
      {availabilitySection}
      {weightSection}
      {estimatedAgeSection}
      <hr />
      <h4>Applicants:</h4>
      <ul>
        {applicantListItems}
      </ul>
    </div>
  )
}

export default PetShow
