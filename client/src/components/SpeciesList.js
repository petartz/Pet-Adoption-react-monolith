import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const SpeciesList = props => {
  const [species, setProject] = useState([])

  const getSpecies = async () => {
    try {
      const response = await fetch(`/api/v1/species`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const body = await response.json()
      setProject(body.species)
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    getSpecies()
  }, [])

  const speciesListItems = species.map(speciesItem => {
    return(
      <li key={speciesItem.id}>
        <Link to={`/species/${speciesItem.id}`}>
          {speciesItem.name}
        </Link>
      </li>
    )
  })

  return(
    <div>
      <h1>All Pet Species</h1>
      <ul>
        {speciesListItems}
      </ul>
    </div>
  )
}

export default SpeciesList
