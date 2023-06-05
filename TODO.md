# Required Dependencies
- react-native-qrcode-scanner
- react-native-camera
- react-native-permissions
- @react-navigation/drawer
- @react-navigation/native

# Functions
### Administrator
- Manage and view resources, including the following data:
  - QR code
  - Resource name
  - Inventory/components (if relevant)
  - Current user
  - Checkout history
- Manage users
- Verify resource checkout upon receiving a request

### User
- Check out resources
  - Scan QR code
  - View inventory list and report whether anything is missing
  - Place request for checkout which must be approved by administrator

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
  - For an admin, it shows any pending requests and alerts, and it lists all resources checked out
- [User] Scan Code:
  - Brings up a QR code scanner, which allows the user to check out a resource
  - If the resource is already checked out, an error message will be shown; the user is given an option to report this to the admins
  - [Labkit] Before checking out, a list of the kit's components is shown, asking the user if all parts are present
  - Answering no will send an alert to the admins, requiring them to look over the kit
  - Answering yes will send a request for checkout to the admins, requiring approval before usage
- [Admin] List Resources
  - Shows a list of all resources for the classroom, with options to sort and filter
  - A button is present in the top right corner to add a resource
- [Admin] Resource Information
  - Displays relevant information on the selected resource, including checkout history
  - Includes buttons to edit or delete
  - Deleting will bring up a prompt, and is not possible while a resource is checked out
- [Admin] List Users
  - Shows a list of all users, with a button to add one
- [Admin] User Information
  - Displays relevant information on the selected user, including current checkouts and history
  - Includes buttons to edit or delete
  - Deleting will bring up a prompt, and is not possible while the user has a resource checked out
