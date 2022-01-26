There are so many good pets out in the world, and we want to be able to see them all (and bring them all home)! Let's build a site where we can view pets that are up for adoption, and those people who have applied to adopt each pet.

## Introduction

You'll be building a website that helps us categorize our pets by species, view and add new pets for adoption, and keep track of who has applied for adoption of a particular pet!

This challenge is primarily focused on various aspects of Objection and Express backends, and the end result will be a full-fledged, database-backed web application with associated tables!

### Getting Started

When tackling any sizable body of work, it's important to break down that work into manageable chunks. To guide your progress, we've split out the work into three parts, with each part focusing on a different aspect of database associations and API endpoints.

Be sure to review the lessons on the relevant topics before diving into the work itself, and reference them as you go along.

To get started, run:

```no-highlight
et get pet-adoption-with-objection
cd pet-adoption-with-objection
createdb pet_adoptions_development
yarn install
yarn run dev
```

Your React frontend has been provided for you, and should not need to be updated.

### A Guide to Each Day

To start each step, read through all of the core user stories and instructions for that step to learn about what the app should do once the step is completed.

For each user story, you will want to think about how to design and set up the schema for the app. You will need to plan out what tables you need, and what columns each one should have. Use a tool like [draw.io](https://www.draw.io/) to create/update an ER diagram for your schema.

When your ER diagram is finished for the step, create the migrations required to set up your database. Create a related model for each table you add to your database, and then build out the required API endpoint for your React frontend to interact with.

Your ER diagram may need to be updated over time.

## Core User Stories

Each section contains user stories, acceptance criteria, and implementation details, with further instructions at the bottom of the section.

### Step One

#### Viewing Species

```no-highlight
As an employee at an adoption agency
I want to view a list of all species we have up for adoption
So that I can begin to track each of the available pets
```

**Acceptance Criteria**

- On the species index page at `/species`, I should see the name of each species.
- Each of the species should be retrieved from the database.

**Implementation Details**

- Create a migration for the "species" table. Each species should have a required name.
  - Remember to run your migration!
- Create a `Species` model with the necessary validations.
  - Once you've migrated and created your model, seed some species using either the Objection console or a seeder.
- Create an API endpoint at "/api/v1/species" which lists all of the species from your database.

\*\*Hint: Note that "species" is the same word, whether it's singular or plural. As such, keep that in mind when creating both singular and plural names: e.g., both your table and your model will be called "Species" with an `s`!

#### Viewing Pets

```no-highlight
As a potential pet adopter
I want to view the pets of a particular species
So that I can see what pets are looking for a home
```

**Acceptance Criteria**

- On the species index page, the name of each species should be a link to the species' show page.
- On the show page, I should see the name of the species, as well as a list of all of the pets of that species up for adoption.

**Implementation Details**

- Create a migration for "pets". Each pet should have a required name (string), required "available" status (boolean), optional weight (integer), optional estimated age (integer), and `speciesId` to connect it to its associated species.
  - Remember to run your migration!
- Create a `Pet` model with the necessary validations.
- Add the necessary `relationMappings` to your `Species` and `Pet` models to set up your associations.
  - Once you've migrated and finished up your models, seed some pets using either the Objection console or a seeder.
- Create an API endpoint at "/api/v1/species/:id" which lists the species information, including all related pets, from your database.

### Step Two

#### Adding Pets

```no-highlight
As an employee at an adoption agency
I want to be able to add a pet to the list of available pets
So that I can track the new pets that come in
```

**Acceptance Criteria**

- On the species show page at "/species/:id", I should see the name of the species, as well as a list of all of the pets of that species up for adoption.
- For each pet, I should see all provided details on the page.
- If I submit the form with the required information, the new pet is added to my page and the form is cleared.
- If I submit the form without required information, I see helpful error messages on my page.

**Implementation Details**

- Create a POST API endpoint at "/api/v1/species/:speciesId/pets". Be sure to nest and namespace your API routers appropriately!
- This API endpoint should take the form data and create a new pet which is associated with the proper species.
- The API endpoint should also handle validation errors appropriately, to send error messages to the frontend for display.

#### Seeing Adoption Applicants

```no-highlight
As an employee at an adoption agency
I want to see who has applied to adopt a pet
So I can start to find them a forever home
```

**Acceptance Criteria**

- On the species show page, the name of each pet should be a link to the pet's show page.
- On the pet show page at "/pets/:id", I should see all of the details for the pet, and a list of the first and last name of the applicants who would like to adopt this pet.

**Implementation Details**

- Create a migration for "applicants". Each applicant should have a required string of first name and last name.
- Create a migration for an "applications" join table as well, to join the applicant with a particular pet.
  - Remember to run your migrations!
- Create an `Applicant` and `Application` model with the necessary validations.
- Add the necessary `relationMappings` to any necessary models to set up your many-to-many associations.
  - Once you've migrated and finished up your models, seed some applicants and applications using either the Objection console or a seeder.
- Create an API endpoint at "/api/v1/pets/:id" which lists the pet's information, including all related applicants, from your database.

### Step Three

#### Cleaning Up Your API Endpoints

```no-highlight
As a software developer
I want to implement serializers for my API endpoints
So that I can organize and speed up my backend code
```

**Implementation Details**

- Update your "/api/v1/species/:id" endpoint to use a `SpeciesSerializer` with a `showDetails` method.
- Only the attributes of `id` and `name` should be allowed for each species - timestamps should be disallowed.
- The related `pets` should be nested under the species via this serializer as well.
- Similarly, your "/api/v1/pets/:id" endpoint should use a `PetSerializer` `showDetails` method to disallow timestamps and nest related applicants.

## BONUS User Stories 

### New Applicant Form

```no-highlight
As someone wanting to adopt a pet
I want to fill in a signup form 
So that I can more easily apply to adopt a pet
```

**Implementation Details**

- Building off of your `Applicant` model and migration, create a new page for signing up to be an applicant. Add a `NavBar` component to your application that contains a link to the `/species` page (text: "Species for Adoption"), and another link "Become Applicant" that brings the user to a `NewApplicantForm` component. 
- This `NewApplicantForm` should allow a user to fill in their first and last name, submit the form to create a new Applicant entry, and should redirect the user to the `/species` path when complete.
- Investigate a way to display a message of "Account Created" on the species index page only AFTER filling out the new applicant form. There are numerous ways to get this functionality working. You decide to pass data using the `Redirect` component, or by creating some state ABOVE your React Router routes that is updated with a notification message just before your redirect. 

### User Authentication with Sessions

**Due to the difficulty of this story, you may wish to skip this story and return to it later**

```no-highlight
As someone wanting to browse this website
Once I've signed up as an applicant
I want the website to remember that I am logged in
```

**Implementation Details**

Note: this step is a bit of a beast (or more appropriately, an undomesticated pet). If you would like, you may decide to look into a pattern that uses Passport.js for authentication (not recommended). However, you may find this easier and more worthwhile to roll your own authentication pattern. Ensure that you have read lessons on Express middlewares and Express sessions before continuing.

- Upon filling out the `NewApplicantForm`, the new application's id is stored in a session. Make sure to verify that the id is being correctly stored before moving on. 
- After being redirected upon submission of the `NewApplicantForm` the full name of the application should appear in the `NavBar`. You'll need to have a `getCurrentApplicant` fetch function called in this `NavBar` component in order to retrieve the new Applicants name from your backend session. This state will be stored above most of your routes. 
- You may need to update your `server/src/app.js` file with the correct middlwares (e.g. cookieparser, cookieSession, dotenv) to get this working. 

### Applying for a Pet

```no-highlight
As a logged in applicant
I wish to apply for a pet
So that I can bring my friendly creature home!
```

**Implementation Details**

Note: you do not need to finish the story on User Authentication for this step.

- On the pet show page, a button should display "Apply to Adopt This Pet". Clicking on this button should toggle a new form on the same page. 
- One input field should appear in the dropdown form called "Application Details" where an applicant can describe the qualities that would make them an excellent pet owner.

If you have not completed the "user authentication" story:
- Submitting this form should create an `Application` record that joins the pet and the LAST applicant in the database. 
- A list of applicants for this pet should appear on the pet show page. 

If you have completed the "user authentication" story:
- Submitting this form should create an `Application` record that joins the pet and the applicant that is currently stored in the session. 
- If the applicant stored in the current session has already applied for this pet, the "Apply tp Adopt This Pet" button should be grayed out, unclickable, and should instead read "You Have Applied for This Pet!"
- You will need to ensure that you either check for the current applicant in the session with your existing fetch request for pet state, or pass down the information about the current applicant from `NavBar` to your React Router routes. The later option will require you to implement the Route for your `PetShow` component differently, such that the `PetShow` component can receive custom props. 
