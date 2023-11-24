![Dark Skies website header](/banner.png)
## Concept

Dark Skies is a localized directory for stargazing locations, connecting users with verified dark sky reserves in their area.  The app uses multiple web API's, along with the user's location, to provide useful information including travel directions, local weather, and satellite flyovers.  Users can find the nearest spots, see how to get there, and what to expect (primarily in Tennessee and surrounding states, as the database is still growing :)

## Features

- Built on React.js and Javascript ES6, with full CRUD functionality
- Users can filter locations by state OR search radius
- Users can add their own locations to the directory with the New Location form
- Users can edit or delete any location they have added
- If a user wants to save a specific location, they can add and remove locations to their list of favorites
- After sharing their location, users can see the local forecast or travel directions on any given location details page
- With the Spot The Station widget, users can learn when and where exactly the International Space Station will next be flying over their location

## Video Walkthrough

## ERD
![Dark Skies ERD](/darkskiesERD.png)

## Testing Instructions
1. Start a JSON server for the database, with the [instructions found here](https://github.com/LukeTHardy/dark-skies-api).
2. Clone this repo in your workspace:

   ```
   git clone git@github.com:LukeTHardy/dark-skies.git
   ```
3. Navigate to repo directory:
   
   ```
   cd dark-skies
   ```
4. Install npm and start the app!

   ```
   npm install
   npm start
   ```
