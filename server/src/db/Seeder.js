/* eslint-disable no-console */
import { connection } from "../boot.js"
import SpeciesSeeder from "./migrations/seeders/SpeciesSeeder.js"
import PetsSeeder from "./migrations/seeders/PetsSeeder.js"
import ApplicantsSeeder from "./migrations/seeders/ApplicantsSeeder.js"

class Seeder {
  static async seed() {
    console.log("Species Seeding...")
    await SpeciesSeeder.seed()

    console.log("Pets Seeding...")
    await PetsSeeder.seed()

    console.log("Applicants Seeding")
    await ApplicantsSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder