# DTC-Lab-Scanner
An app used for checking out lab kits and other resources from the Cybersecurity and Software Development classrooms.

# Capstone Documentation
- [Project Outline](https://github.com/SafetyFlux/DTC-Lab-Scanner/blob/main/OUTLINE.md)
- [To-Do List](https://github.com/SafetyFlux/DTC-Lab-Scanner/blob/main/TODO.md)
- [Timetable](https://github.com/SafetyFlux/DTC-Lab-Scanner/blob/main/TIMETABLE.md)

# Setup Guide
### Description
This section describes the process needed to pick up development for this app. While most required files are present, some have not been included for security reasons. If I missed anything (i.e. the app doesn't run properly), please contact me with the issue.

### Firebase App
A portion of the app involves integration with Firebase, involving both cloud storage and a realtime database. While Firebase doesn't need to be used, it is what the program is currently built for. A more clear guide for this process can be found here: [Firebase - Getting Started](https://rnfirebase.io/)

After that's set up, a few more portions of the code need to be changed to match your own Firebase app. Attempting to keep this the same won't yield any results, as my security rules will block any read/write attempts.
- http.js, line 4: BACKEND_URL variable => Your realtime DB URL

### Azure Authentication
Login uses a package that connects to an Azure app within the Davis Technical College active directory. The following steps are required to create this app:
1. Log into Microsoft using your DTC email (if you are a student, this should be your student ID following by '@davistech.edu').
2. Navigate to the Davis Technical College AD overview page and select 'App Registrations' from the sidebar on the left.
3. Select 'New Application' to create a new Azure app
   - The name must be something other than DTC-Lab-Scanner
   - Under 'Support account types', select the second option: 'Accounts in any organizational directory (Any Azure AD directory - Multitenant)'
   - Under 'Redirect URI', add a new URI by selecting 'Web' and enter 'https://login.microsoftonline.com/common/oauth2/nativeclient'
4. Upon creation, navigate to 'Certificates & secrets', then create a new secret. This can be named anything, but MAKE SURE YOU COPY THIS IMMEDIATELY. You will only have access to the value directly after the secret is generated.
5. In the 'Authentication' tab, add a second redirect URI under 'Web': 'https://localhost:3000'
6. Modify the following lines in the code:
   - .env, line 1: CLIENT_ID => Application (client) ID for your Azure app, shown in the overview
   - .env, line 2: CLIENT_SECRET => The secret you just generated
   - Login.js, line 39 (optional): If you are a student and wish to have admin access DURING TESTING, replace the email with your own. It is not advised to keep this block of code in the release


# Student 2: James Sales
I picked this project up in an attempt to finish it but the project was unable to launch due to some outdated node modules and without knowing which versions worked where I was unable to get it to work the way it was. The main issues causing the app to be broken was the previous authentication workflow utilizing a node package which was broken. The second part broken was the workflow to submit and read data from the database, specifically the photo portion of the application.


## Progress I have made:
The project was broken when I started. I had to prune a bunch of node modules to get it to launch. The main ones were the auth package and the ones associated with the interface for the Firebase RTDB.  I have been working on going through all of the packages trying to find one that worked for Azure (which is now Entra ID) but none of them worked out. I ended up swapping to a generic HTTP request and just getting a token back through that method but I keep running into different errors saying my username or password is incorrect. (see definition of insanity)... 


I also tried to get a test user as I have had to reset my password around 20 times in testing this. I would highly recommend asking for this again and seeing if you can convince the IT department to make it have zero securities as far as locking up and requiring a password reset. It doesn't need to have any permissions besides being an active user in the Entra ID service.
