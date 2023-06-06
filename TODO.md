# To-Do List
### Early Development
- Initialize a React Native project with Expo
- ~~Create Firebase database~~

### Research
- Research security rules for Firebase database
- Determine fix for Android 13 camera permission issues
- Research QR code implementation in the context of the app
  - How will one be generated?
  - How will it connect to the record in the database?

### Design
- Determine the visual layout of the app
- Determine which color scheme will be used for the app
- Determine which font(s) will be used for the app

### Functionality
- Add user creation and login functionality
- Add the drawer navigation
  - Must have a different view based on login state and user level
- Add QR code scanning functionality
- Add connections to the database
  - Limited read access on the 'resources' table for users
  - Read-write access on the 'resources' and 'users' tables for admins
  - Read access on the 'history' and 'alerts' tables for admins

### Extra (optional based on time available)
- Add settings page
  - Design the app to allow switching between light and dark modes
  - Implement a way for the user to send feedback
