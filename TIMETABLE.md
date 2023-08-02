# Timetable
### 2023-08-02
- Changed format of image URI in resource data
- Created resource list
  - Pressable items navigate to resource details
- Created basic resource details page

### 2023-07-31
- Tweaked UI components (e.g. changed form order)
- Implemented Firebase cloud storage
- Added submit functionality to form, which will...
  - Upload an image to the cloud storage
  - Add a record to the realtime database

### 2023-07-28
- Switched to a different camera package to implement cropping
- Implemented image preview for the taken photo
- Added minor function to scroll to bottom of component list when adding an item

### 2023-07-27
- Installed camera package, used for the following:
  - Taking a picture of the resource to be added or edited
  - (Later) Scanning a QR code to check in a resource
- Added button to open camera to resource management screen

### 2023-07-26
- Added component list to form as separate modal
  - Includes buttons to add a new component, cancel the modification, or update the list
- Added functionality to each component list item
  - Input field to update the component name
  - Buttons to move each item up or down on the list
  - Button to delete the item

### 2023-07-25
- Created resource creation/edit form
- Added name and description field to form

### 2023-07-20
- Began to flesh out components for resource management

### 2023-07-19
- Fixed app-crashing bug that occurs during Azure authentication

### 2023-07-11
- Added nested stack navigator for resource management
- Added screens to said navigator

### 2023-07-10
- Moved authentication data to separate .env file
  - This is included in the .gitignore file, so it isn't visible on the repository
- Merged Azure authentication branch with main
- Created basic UI components
- Created blank components for resource management
- Started database development
  - Installed package and created Axios function file
  - Added cloud storage to Firebase (for images)

### 2023-07-05
- Added RegEx validation to distinguish user role

### 2023-07-03
- Reverted to former Azure authentication package
- Fixed Azure authentication (again)
- Implemented logout functionality with react-native-cookies

### 2023-06-30
- Switched from Expo-managed to bare workflow

### 2023-06-29
- Attempted to fix Azure authentication

### 2023-06-28
- [NOTHING]

### 2023-06-27
- [NOTHING]

### 2023-06-26
- Fixed Azure authentication

### 2023-06-22
- Researched Microsoft Azure authentication
- Attempted to add Azure authentication
  - Not fully functional yet, pending further research

### 2023-06-21
- Met with client to discuss progress

### 2023-06-20
- [ABSENT]

### 2023-06-16
- Moved logout button into sidebar
- Consolidated drawers into single component

### 2023-06-15
- Finished sample authentication
- Created separate drawers for user and admin roles
- Added logout button

### 2023-06-14
- Added sample authentication
- Created authentication context with token and user level

### 2023-06-13
- Created main screens
- Set up sample layout

### 2023-06-12
- Finished and submitted project proposal
- Submitted course timeline
- Initialized Expo project folder

### 2023-06-08
- Finished sample QR code scanner
- Met with endorser to discuss project needs
- Filled out project proposal

### 2023-06-07
- Researched QR code scanning implementation

### 2023-06-06
- Added more documentation, including a categorized to-do list and a timetable
- Created realtime database in Firebase
- Started development of a sample QR code scanner for research purposes

### 2023-06-05
- Created GitHub repository
- Created TODO.md (now OUTLINE.md), a list of plans for the app