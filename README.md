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
- Interface names include a capital 'I' as a prefix, to better identify them (also applied to existant interfaces)
- Resources such as services, interfaces and constants now have an index.ts file grouping them to better organize them and improve the readabilty of the import paths
- Existing unit tests were fixed to work again. No aditional testing was added to pre-existing unit tests, only because I don't currently have enough time to dedicate to that task. In a real working environment, this is not an excuse, the entire app should have it's unit tests working as intended, and testing real functionality, not just if a component is truthy.
- Some functionality has minor bugs, such as the date picker from Angular Material, not correctly implementing the minimumDate (you are allowed to pick December 31th, 1999, when the minimum year should be 2000). This might be related to timezone conflicts, with the Date javascript class. Maybe using Moment could fix it, but I decided to leave it as it is, otherwise I would have to dedicate some more time debugging and trying different solutions
- As of last year, I've been starting using helper tools such as Codeium (VSCode extension that integrates ChatGPT-3 capabilites) and Google Bard, to improve my code and generate boilerplates. It's not perfect, but it can be quite useful when you're blocked.

## Month generation

In reality, the Frontend shouldn't be generating anything, this month would be requested to the backend via an API call, which would retrieve it from the database
(the only valid source of truth).
For the purposes of demonstrating how the app works, I've created a helper function that generates a calendar month, based on two arguments: the desired Month, and the desired Year.

I like to explain how structures work directly in the code when absolutely necessary, it's faster for other developers to understand what does what (I try to make my code as self explanatory as possible, but still, comments were added in this case, just to clarify some things for the challenge)

## Data saving

Again, in reality, we would be uploading the data changes (creation, deletion, updates) through a service, to a real API. For the purposes of demonstrating the functionality of the app, we are using LocalStorage as a "fake" database.

## Weather Api and key

For this excercise, the Visual Crossing API was used. In order to make valid API calls, the following API key is necessary (already integrated): GDEZ82XJYC68QEVAZHGW6Q428
The service request the correspondant weather to the provided city, date and time of the day.
There is currently no City name validation in place, which means that entering invalid names when creating/editing a reminder, will result in an error when trying to retrieve the correspondant weather.
To fix this, I've decided to not show any climate icons in the expanded card modal when that happens, just the city name.

## MonthPickerComponent

A brand new component was created to handle switching months and years. Because it exists as a child component of CalendarComponent, an Output EventEmitter was used to update the selected Date. An argument could be made about using a Subject instead to allow subscription from any other component in the app. To do this, a new Subject would be created in the calendar service, and the MonthPickerComponent would emit a new value each time the Date changed. CalendarComponent would be listening to the Subject, re-rendering the calendar accordingly. But, for the purpose of this excercise, and being MonthPickerComponent a component only being used inside CalendarComponent, an Output EventEmitter was enough.

## Overflow handling

In order to deal with overflow, I've decided to hide any overflowing at all, until you hover over a day in the calendar. That allows to scroll in the Y axis. To see the full reminder, you need to click on a specific day, which opens a new modal, that contains the reminders that belong to that day, in full detail

## CSS Styling

Almost all components were created by me from scratch (with the exception of the material modal being used to render the ReminderFormComponent, but I did create the actual component). The idea was to apply a clean and modern design, with round edges and light shadows.

## Final notes

Given my available time this week, I had to leave a lot of stuff aside to focus on the task at hand. Having said that, there is a lot of room for improvements, this are just some examples:

- creating a color picker to choose the reminder background color
- validating the city input field through a city/state/country API
- adding NgRx to better handle the calendar data in a more reactive way
- optimizing the design for mobile screens
- creating an error handling strategy to give visual feedback to the user about what's going on behind the scenes with the reminders
- replacing the ReminderFormComponent html structure with an actual Form (I personally like using reactive forms in general), and adding some validators to the text and city fields

...and many more things

My hope is that this excercise show you a bit of what I can do.
