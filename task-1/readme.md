## Task description

#### Database Design Challenge

Imagine you're building a system to manage enterprises and users. Users can belong to multiple enterprises.
User has the following attributes: Email, First Name, Last Name, Phone Number.
Enterprise has the following attributes: Name, Tax ID, Address.

- Please, design the database structure for this case
- Show how the tables are connected and briefly explain how it should work
- Please, prepare SQL query to get all users from enterprise with selected Tax ID
- Please, prepare SQL query to get all users registered after 10.02.2024


## Solution
1. User (Table):
- id (Primary Key)
- email
- first_name
- last_name
- phone_number
- enterprise_id (Foreign Key referencing Enterprise.id)
- created_at (Immutable)
- updated_at

```
CREATE TABLE Users (
    id INT PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    phone_number VARCHAR(20) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

2. Enterprise (Table):
- id (Primary Key)
- name
- tax_id (VARCHAR OR BIGINT)
- address

```
CREATE TABLE Enterprises (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    tax_identifier VARCHAR(20) UNIQUE,
    address VARCHAR(255)
);
```

3. UsersEnterprises (Table):
- user_id
- enterprise_id
- user_id (Foreign Key)
- enterprise_id (Foreign Key)
- user_id and enterprise_id (Primary Key)

```
CREATE TABLE UsersEnterprises (
    user_id INT,
    enterprise_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (enterprise_id) REFERENCES Enterprises(id),
    PRIMARY KEY (user_id, enterprise_id)
);
```

#### Users Table:
> Each user record in the Users table can be associated with one or more enterprises through the enterprise_id foreign key.

> The enterprise_id column in the Users table references the id column in the Enterprises table, indicating which enterprise(s) the user belongs to.
#### Enterprises Table:
> Each enterprise record in the Enterprises table can have multiple users associated with it through the Users table.

> There is no direct foreign key relationship from Enterprises to Users, as the relationship is mediated through the UsersEnterprises table.
####  UsersEnterprises Table:
> This table acts as a bridge table between Users and Enterprises, establishing a many-to-many relationship.

> The user_id column references the id column in the Users table, and the enterprise_id column references the id column in the Enterprises table.

> The combination of user_id and enterprise_id forms the composite primary key, ensuring that each user can be associated with multiple enterprises, and each enterprise can have multiple users.

#### SQL query to get all users from the enterprise with a selected Tax ID:
```
SELECT Users.*
FROM Users
JOIN UsersEnterprises ON Users.id = UsersEnterprises.user_id
JOIN Enterprises ON UsersEnterprises.enterprise_id = Enterprises.id
WHERE Enterprises.tax_identifier = 'selected_tax_id';
```

#### SQL query to get all users registered after 10.02.2024:
```
SELECT Users.*
FROM Users
WHERE created_at > '2024-02-10';
```