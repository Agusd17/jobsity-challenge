<div align="center">
    <img src="https://storage.googleapis.com/public-jobsity-bucket/jobsity_logo_small.png"/>
</div>

# Angular Challenge

## Description

This project is designed to test your knowledge of front-end web technologies and assess your ability to create front-​end UI products with attention to details, cross-browser compatibility, standards, and  reusability.

## Assignment

The goal of this exercise is to create a demo calendar application using Angular.

You should start by rendering a single month view of a calendar for the current month, along the lines of the illustration below:
<div align="center">
    <img src="https://raw.githubusercontent.com/Jobsity/ReactChallenge/main/src/assets/CalendarSample.png"/>
</div>

## Mandatory features
 - Ability to add "*reminders*" (max. 30 characters) for a day and time specified by the user. Also, include a city.
 - Ability to edit reminders - including changing text, city, day and time.
 - Add a weather service call from [Visual Crossing](https://www.visualcrossing.com/weather/weather-data-services#) and get the weather forecast (e.g. Rain) for the date of the calendar reminder based on the city.

## Bonus (Optional)

- Expand the calendar to support more than the current month or year.
- Properly handle overflow when multiple reminders appear on the same date.
- Unit test the functionality: *Ability to add "*reminders*" (max. 30 characters) for a day and time specified by the user. Also, include a city.*

## Considerations

 - The project is completely focused on Front-end. Ignore the Back-end.
 - Create your Calendar using the route `/calendar`
 - Feel free to use small helper libraries for:
 -- UI Elements.
 -- Date/Time handling.
 - **You must create the calendar component yourself**. Do not user calendar libraries like FullCalendar or Bootstrap Calendar.
 - Provide working API keys to any external API you use.
 - Show us your capabilities on CSS and styling, if possible.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


-----------------------------------------------------------------------------------

### Challenge done by Agustin D'llano
# Documentation

## Some considerations

- The default 'ng serve' command was modified to include the optional '-o' and '-port' flags, for convenience (even when declaring port 4200 is redundant)
- Private properties were renamed to include '_' as a prefix, to better identify them in the code
- Public properties had the 'public' declaration attached to them, to improve code readability
- Both variable and method declarations are now ordered, having public declarations first and private ones after
- resources such as services, interfaces and constants now have an index.ts file grouping them to better organize them and improve the readabilty of the import paths
- existing unit tests were fixed to work again. No aditional testing was added to existing unit tests that aren't part of my code, only because I don't currently have enough time to dedicate to that task. In a real working environment, this is not an excuse, the entire app should have it's unit tests working as intended, and testing real functionality, not just if a component is truthy.

## Month generation

In reality, the Frontend shouldn't be generating anything, this month would be requested to the backend via an API call, which would retrieve it from the database
(the only valid source of truth).
For the purposes of demonstrating how the app works, I've created a helper function that generates a calendar month, based on two arguments: the desired Month, and the desired Year.

I like to explain how structures work directly in the code when absolutely necessary, it's faster for other developers to understand what does what (I try to make my code as self explanatory as possible, but still, comments were added in this case, just to clarify some things for the challenge)

## Data saving

Again, in reality, we would be uploading the data changes (creation, deletion, updates) through a service, to a real API. For the purposes of demonstrating the functionality of the app, we are using LocalStorage as a "fake" database.
