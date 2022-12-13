# NUSAssist
## Deployment
Check out the web application at https://nus-assist.herokuapp.com/

## Motivation
As university students we make use of multiple applications to keep track of what we need to do and what classes we have, these include timetable planning applications like NUSMods and Google calendar, as well as a task manager application like Notion. This becomes tedious and overwhelming especially when our work piles up. Thus, we would like to come up with a way to integrate all of these functionalities into one consolidated web application, NUSAssist. 
## Calendar
We have implemented a calendar interface to allow users to plan out their days and keep organised. Users are able to add events into the calendar, these events contain a title, description, start time and end time. They are then able to see these events in our calendar interface, so that they are able to keep track of what they have to do as well as what they have done previously. Upon creation of the event, the event will be displayed on the day in the calendar, with the title and the start time displayed. They are also able to remove or edit events.

![image](https://user-images.githubusercontent.com/85117239/207362066-f134f40f-41bf-4be6-8431-96b14c00c56a.png)


## Task Manager
In the task manager page, there is a button at the top that allows users to create new tasks, tasks created will have a title and an optional description. Once tasks are created, they can be viewed on the same screen, where they will be able to edit the task, delete the task or mark it as done. The tasks when displayed will be displayed with just the title. Then, by clicking anywhere on the task, 
it will be expanded to show the description as well. Users also able to also add an optional due date to their tasks

![image](https://user-images.githubusercontent.com/85117239/207362273-64e37ebb-8655-4d7b-ae4e-6838bc29196a.png)

## Authorisation
### Signing In
Users can sign in with Google or use their email. Without signing in, users are prompted to the sign-in page and are unable to access our task manager interface. Upon signing in, they will only see the tasks associated with their account, they are unable to view, edit or delete other users tasks. Since users are able to sign up with their own email, we added email verification. If a user signs in with an account that has not yet been verified, they are brought to the verification screen and are told to verify their emails via the email sent to them.

![image](https://user-images.githubusercontent.com/85117239/207362404-7167feba-1d5c-4aec-b8ac-b88da5bb2b25.png)

We made use of Firebase User Authentication through JWT tokens to do this.
### Signing out
Upon signing out, users are again unable to access our task manager or calendar interface and are brought to the sign in page.

## Tech Stack
React, Express.JS, MongoDB, Firebase
