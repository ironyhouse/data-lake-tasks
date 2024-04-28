## Task description

#### Unit Testing

Now it's time to write unit tests to ensure the reliability of this functionality.

- Please, write the all required tests for our endpoint. The endpoint /enterprise/users/add requires the next parameters:

```
{
   taxId: "7162828483",
   userHashes:['0xHash1', '0xHash2'],
   permissions: ['read', 'perm1']
}
```

- To get enterprise users we can use the /enterprise/users endpoint with query parameter taxId.