## Task description

#### Node.js Backend Endpoint Refactoring

You have the base of the existing Node.js endpoint for adding users to an enterprise. It uses the addUsers function from enterprisesService that includes all the logic for adding a user to the enterprise.  addUsers requires such parameters:

- userHashes - array of strings, which identifies users in system
- taxId - unique enterprise identifier
- permissions -  array of strings, that represents a list of permissions that should be added to the user.

Your task is to refactor the code and complete missing fragments such as passing parameters, parameter validation, error handling and sending of response status codes.

```
app.post('/enterprise/users/add', async (req, res) => {
  await enterprisesService.addUsers(
    userHashes,
    taxId,
    permissions
  )
})
```
