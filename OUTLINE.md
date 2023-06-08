# Required Dependencies
- @react-navigation/drawer
- @react-navigation/native
- axios
- expo-app-loading
- expo-sqlite
- expo-barcode-scanner

# Functions
### Administrator
- Manage and view resources
- Manage and view users
- View alerts, such as missing components

### User
- Check out resources
  - Scan QR code
  - View inventory list and report whether anything is missing

# Data
### Resources (e.g. Labkits)
- Resource ID
- QR Code
- Title
- Inventory/Components
- Current User

### Users
- User ID
- User Level (standard/admin)
- Name (first + last name, due to classroom setting)
- Email
- Student ID (if relevant)
- Password

### Check-out History
- Resource ID
- User or Student ID
- Date + Time of Check-out
- Date + Time of Check-in
- [NOTE] A record is only added once the resource has been checked in

### Alerts
- Alert ID
- Type of Alert
  - Inventory Alert (missing/damaged item)
- User or Student ID
- Resource ID

# Layout
### Basic
- Top area contains 2 buttons:
  - Drawer Toggle
  - Settings

### Drawer Buttons
- Logged in (User):
  - Overview
  - Scan Code
  - Logout
- Logged in (Admin):
  - Overview
  - List Resources
  - Resource Information
  - List Users
  - User Information
  - Logout

### Screen Descriptions
- [ALL] Overview:
  - For a standard user, it shows any resources currently checked out by the user
  - For an admin, it shows any pending alerts, and it lists all resources checked out
- [ALL] Settings:
  - Dark mode theme toggle
  - App feedback button (likely sends an email)
  - Display app version and author
- [User] Scan Code:
  - Brings up a QR code scanner, which allows the user to check out a resource
  - If the resource is already checked out, an error message will be shown; the user is given an option to report this to the admins
  - [Labkit] Before checking out, a list of the kit's components is shown, asking the user if all parts are present
  - Answering no will send an alert to the admins, requiring them to look over the kit
- [Admin] List Resources
  - Shows a list of all resources for the classroom, with options to sort and filter
  - A button is present in the top right corner to add a resource
- [Admin] Resource Information
  - Displays relevant information on the selected resource, including check-out history
  - Includes buttons to edit or delete
  - Deleting will bring up a prompt, and is not possible while a resource is checked out
- [Admin] List Users
  - Shows a list of all users, with a button to add one
- [Admin] User Information
  - Displays relevant information on the selected user, including current check-outs and history
  - Includes buttons to edit or delete
  - Deleting will bring up a prompt, and is not possible while the user has a resource checked out
