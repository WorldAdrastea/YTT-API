[![Node.js](https://img.shields.io/badge/Node.js-18-green?logo=node.js)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4-blue?logo=express)](https://expressjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-latest-green?logo=mongodb)](https://www.mongodb.com/)

# YTT API
YTT API is a Node.js, Express, TypeScript, and MongoDB-powered API that allows users to create accounts, log in, explore different YTT (Your Talent Tube) covers, and upload their own covers with options to delete and update them.

## Table of Contents
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Creating an Account](#creating-an-account)
  - [Logging In](#logging-in)
  - [Exploring YTT Covers](#exploring-ytt-covers)
  - [Uploading a Cover](#uploading-a-cover)
  - [Deleting a Cover](#deleting-a-cover)
  - [Updating a Cover](#updating-a-cover)
- [Contributing](#contributing)

## Features

- **Account Management:** Create a new account and log in securely.
- **Explore YTT Covers:** Browse through a collection of YTT covers.
- **Cover Management:** Upload your own covers with options to delete and update them.
- **Secure Authentication:** Ensure user authentication and authorization.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) v18.15.0
- [npm](https://www.npmjs.com/) (Node.js package manager) 9.5.0
- [MongoDB](https://www.mongodb.com/) (Ensure MongoDB is running on your machine or provide a connection string)

### Installation
**Installing dependencies:**
Clone the repository and then install dependencies with:
```
cd /your-directory/ytt-api 
npm install 
```


**Configure environment variables:**
Create a .env file in the project root and set your variables.

**Start the application:**
```npm start```
The API should be running on 'http://localhost:8080' by default but you can change this accordingly within the src/index.ts file

## Usage
### Creating an account
Use the following endpoint to create an new user account:
``` POST /auth/register ```
### Logging In
Use the following endpoint to login:
``` POST /auth/login ```
Provide the necessary details in the request body. This has been tested by POSTMAN.
### Exploring YTT Covers
Explore YTT covers using the following endpoint:
``` GET /uploads ```
### Uploading a new Cover
To upload a new cover, use the following endpoint:
``` POST /uploads ```
Include the cover details in the request body such as:
- title:
- description:
- coveredBy:
- uploadedBy:
### Deleting a Cover
Delete a cover using the following endpoint:
``` DELETE /uploads/:id ```
Please use the id of the upload.
### Update the information of a Cover
Update a cover using the following endpoint:
``` PATCH /uploads/:id ```
Please user the id of the upload and include the cover details in the request body such as:
- title:
- description:
- coveredBy:
- uploadedBy:

## Contributing

I'm but a singular potato so feel free to contribute by opening issues or submitting pull requests.

