## Objective

Your task is to create a basic health tracking application using TypeScript for both the backend and frontend. You will use Node.js for the backend, React for the web frontend, and React Native for the mobile frontend. The application should allow users to enter and view their daily health metrics.

## Brief

1. **Set up the Server**
   - Using Node.js and TypeScript, set up a basic server that can handle GET and POST requests.

2. **Create a Health Record Model**
   - In TypeScript, create a `HealthRecord` model with the following fields: userId (this can be a static value for now), date, steps, and hours of sleep.

3. **Create the Web Front End**
   - Using React with TypeScript, create a web application that allows users to:
     - Input their daily metrics
     - View their past metrics in a table

4. **Create the Mobile Front End**
   - Using React Native with TypeScript, create a mobile application that has the same functionality as the web application:
     - Input daily metrics
     - View past metrics

5. **Connect the Frontend and Backend**
   - Create endpoints in the server that allow the frontend to:
     - Add health records for a user
     - Retrieve a user's health records
   - Modify the frontend applications to make requests to these endpoints as necessary.

6. **Testing Requirements**
   - Write unit tests for the server, endpoints, and frontend applications using any testing framework you prefer. Ensure that your tests cover all the basic functionalities: adding health records, and retrieving health records.

### Evaluation Criteria

- Code quality and clarity
- Proper use of TypeScript
- Consistency between the web and mobile frontends
- Functionality of the application
- Completeness of the application

### CodeSubmit 

Please organize, design, test, and document your code as if it were going into production - then push your changes to the master branch.

Have fun coding! 🚀

The IndeHealth Team
