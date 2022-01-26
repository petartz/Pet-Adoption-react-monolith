/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable("applications", (table) => {
      table.bigIncrements("id")
      table
        .bigInteger("petId")
        .unsigned()
        .notNullable()
        .index()
        .references("pets.id")
      table
        .bigInteger("applicantId")
        .unsigned()
        .notNullable()
        .index()
        .references("applicants.id")
      table
        .timestamp("createdAt")
        .notNullable()
        .defaultTo(knex.fn.now())
      table
        .timestamp("updatedAt")
        .notNullable()
        .defaultTo(knex.fn.now())
    })
}

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  return knex.schema.dropTableIfExists("s")
}
