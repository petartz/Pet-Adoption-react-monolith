import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { hot } from "react-hot-loader/root"

import "../assets/scss/main.scss"

import SpeciesList from "./SpeciesList"
import SpeciesShow from "./SpeciesShow"
import PetShow from "./PetShow"

const App = props => {
  return(
    <BrowserRouter>
      <Switch>
        <Route exact path="/species" component={SpeciesList} />
        <Route exact path="/species/:id" component={SpeciesShow} />
        <Route exact path="/pets/:id" component={PetShow} />
      </Switch>
    </BrowserRouter>
  )
}

export default hot(App)
