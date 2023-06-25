# City-SSPS-API

### This application takes in environmental problems in a community forexample if someone has a water or security problem, they simply addd there adress and what their complaint is about

## Installation

- clone the repository
- Navigate to the project directory using commandline
- Run the following command to install the dependencies:
  `npm install`

## Usage

1. Ensure you have completed the installation
2. Run the following command to start the API server:
   `npm start`

## configuration

### The configuration file for the Node API is located in the `config` directory. You can modify the configuration options according to your requirements. The default configuration is `config/dev.env`

## Endpoints

### The following endpoint are available in the API:

- `GET /api/resource` - Retrieve a specific resource.
- `POST /api/resource` - Create a new resource.
- `PUT /api/resource/:id` - Update an existing resource.
- `DELETE /api/resource/:id` - Delete resource

## Dependencies

### The Node API relies on the following dependencies:

1. Express: Fast, unopinionated, minimalist web framework for Node.js.
2. Mongoose: MongoDB object modeling tool.

- You can find the complete list of dependencies in the package.json file.
