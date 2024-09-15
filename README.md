
# Vehicle Show Registration API

This project is an Azure Functions-based API that allows users to register their vehicles for a vehicle show meetup. It includes features for creating, updating, retrieving, and deleting vehicle registrations, as well as validating vehicle numbers.

## Features

- Create a new vehicle registration
- Retrieve vehicle registrations by ID
- Update vehicle details
- Delete a vehicle registration
- Validate if a vehicle number already exists
- Pagination support for retrieving multiple vehicle registrations

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or v16 recommended)
- [Azure Functions Core Tools](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local) (v4 or later)
- [MongoDB](https://www.mongodb.com/) for database storage

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/vehicle-show-registration-api.git
    cd vehicle-show-registration-api
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Install Azure Functions Core Tools:

    ```bash
    npm install -g azure-functions-core-tools@4 --unsafe-perm true
    ```

4. Create a `local.settings.json` file in the root of your project with the following content:

    ```json
    {
      "IsEncrypted": false,
      "Values": {
        "AzureWebJobsStorage": "UseDevelopmentStorage=true",
        "MONGO_URI": "mongodb://localhost:27017/vehicleshow",
        "FUNCTIONS_WORKER_RUNTIME": "node"
      }
    }
    ```

5. Ensure MongoDB is running locally or update the `MONGO_URI` to point to your MongoDB instance.

## Running the Project Locally

To run the Azure Functions app locally:

1. Start the Azure Functions app:

    ```bash
    func start
    ```

2. The API will be running on `http://localhost:7071`. Use Postman or cURL to interact with the API endpoints.

## API Endpoints

### Create User (Vehicle Registration)

- **URL:** `/api/CreateUser`
- **Method:** `POST`
- **Request Body:**

    ```json
    {
      "user_name": "John Doe",
      "nic": "987654321V",
      "mobile": "0712345678",
      "vehicle_no": "WPABC1234",
      "vehicle_model": "Toyota Corolla"
    }
    ```

### Get User By ID

- **URL:** `/api/GetUserById/{id}`
- **Method:** `GET`

### Get All Users with Pagination

- **URL:** `/api/GetUsers`
- **Method:** `GET`
- **Query Params:** `?page=1&limit=10`

### Update User

- **URL:** `/api/UpdateUser/{id}`
- **Method:** `PUT`
- **Request Body:** Fields to update.

### Delete User

- **URL:** `/api/DeleteUser/{id}`
- **Method:** `DELETE`

### Validate Vehicle Number

- **URL:** `/api/ValidateVehicle`
- **Method:** `POST`
- **Request Body:**

    ```json
    {
      "vehicle_no": "WPABC1234"
    }
    ```

## Testing the API

You can test the API locally using:

- [Postman](https://www.postman.com/) to send HTTP requests to your local Azure Functions.
- `cURL` from the command line.

For example, to create a user with cURL:

```bash
curl -X POST http://localhost:7071/api/CreateUser -H "Content-Type: application/json" -d '{
  "user_name": "John Doe",
  "nic": "987654321V",
  "mobile": "0712345678",
  "vehicle_no": "WPABC1234",
  "vehicle_model": "Toyota Corolla"
}'
```

## Running Swagger Locally

The project includes Swagger documentation for easy API testing.

1. Start the Azure Functions locally using the following command:

    ```bash
    func start
    ```

2. Navigate to `http://localhost:7071/api-docs` in your browser to view the Swagger UI and test the API endpoints.

## Deployment

To deploy the functions to Azure, follow these steps:

1. Sign in to Azure:

    ```bash
    az login
    ```

2. Create a new function app:

    ```bash
    az functionapp create --resource-group <resource-group> --consumption-plan-location <location> --runtime node --runtime-version 14 --functions-version 3 --name <function-app-name> --storage-account <storage-account-name>
    ```

3. Deploy your app:

    ```bash
    func azure functionapp publish <function-app-name>
    ```

## Folder Structure

```text
/vehicle-show-registration-api
├── /src
│   ├── /functions
│   │   └── CreateUser.js
│   │   └── GetUserById.js
│   │   └── GetUsers.js
│   │   └── UpdateUser.js
│   │   └── DeleteUser.js
│   │   └── ValidateVehicle.js
│   ├── /shared
│   │   └── userService.js
│   ├── /models
│   │   └── userModel.js
├── local.settings.json
├── host.json
└── package.json
```

### License

This project is licensed under the MIT License.

