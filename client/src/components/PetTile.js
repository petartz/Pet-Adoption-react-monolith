import React from "react"
import { Link } from "react-router-dom"

const PetTile = ({ id, name, available, weight, estimatedAge }) => {
  let availabilitySection, weightSection, estimatedAgeSection
  if(available) {
    availabilitySection = <p>This pet is available!</p>
  } else {
    availabilitySection = <p>This pet has already been adopted.</p>
  }
  if(weight) {
    weightSection = <p>Weight: {weight} lbs</p>
  }
  if(estimatedAge) {
    estimatedAgeSection = <p>Estimated Age: {estimatedAge}</p>
  }

  return(
    <div className="callout">
      <h5>
        <Link to={`/pets/${id}`}>
          {name}
        </Link>
      </h5>
      {availabilitySection}
      {weightSection}
      {estimatedAgeSection}
    </div>
  )
}

export default PetTile
