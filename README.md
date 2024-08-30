# RESTAURANT LISTING API

## introduction
   
    There is a restaurant listing platform that provides information about various restaurants and
    has features such as restaurant menus, images, addresses, features, pricing, book a table, call 
    for ordering, user-reviews, etc.
    It also helps customers to book a table for dining or call the restaurant for ordering, basically 
    an interaction between businesses (vendors) and users (customers)

  Objective:- 
    a. task is to Design and Implement a Web application for the same.
    b. The application should include user authentication, CRUD operation for Business listings and review.

## Installation

    1. clone the github repo - 
        git clone https://github.com/vishnu-manimala/restaurant_api.git

    2. run the command to install dependency packages -  
        cd restaurant_api
        npm install

## Running the application

    1. Start the server

        npm start

    2. Access the application use

        http://localhost:3000/

## Configuration

    1. Environment variables

        Sample: 

            PORT = 3000

            MONGO_DB_URL = mongodb://localhost:27017/restaurent

            PRIVATE_KEY = /* your secret key */

## How to use this API

    This app includes 3 Tasks.

        1. User Authentication
        2. Listing Management
        3. Review Management


 API URL :  http://localhost:3000/api

    1. User Authentication:- http://localhost:3000/api/auth

        # Register - 
            This api gets you registered in our app. When sending request make sure that you send all the data mentioned 
            below in request body.

            #Request: 

                api     :  http://localhost:3000/api/auth/register
                method  :  POST
                Data    :   name:  string
                            email: string
                            password: string
                            role: 'Admin' | 'User' | 'BusinessOwner'

            #Response: 

                1. Success- 

                    201 - Created
                    status:'success', 
                    message: 'User registered successfully'

                2. Error

                    400 - Bad request
                    status:'error', 
                    message: "Request body is empty"

                    409 - conflict
                    status:'error', 
                    message: "user already exists"

                    500 - Internal server error
                    status:'error', 
                    message: ' Internal server error'

        # Login - 
            
            This api lets you logging in our app. When sending request make sure that you send all the data mentioned 
            below in request body.if the login in is successful then it will send access token and refresh token as 
            response.

            #Request: 

                api     :  http://localhost:3000/api/auth/login
                method  :  POST
                Data    :   email: string
                            password: string

            #Response: 

                1. Success- 

                    200 - Ok
                    status:"success", message:"Successfully logged in.", accessToken: string, 
                    refreshToken: string, 
                    user: {
                           _id: string,
                            name: string,
                            email: string
                            role: string,
                            __v: 0,
                            createdAt: Date
                    }

                2. Error

                    400 - Bad request
                    status:'error', 
                    message: "Request body is empty" 

                    401 - unAuthorized
                    status:'error', 
                    message: "User doesn't exists"| "Invalid username or password"

                    500 - Internal server error
                    status:'error', 
                    message: ' Internal server error'

        #Refresh token 

            when access token is expired, this api is used to refresh the access token. send the refresh token in body, 
            it will verify it and if its valid , will generate a new token otherwise you have to login again.

            #request

                api: http://localhost:3000/api/auth/refreshToken
                method: POST
                Data: 
                    refreshToken: string

            #response:

                 1. Success- 

                    201 - Created
                    status:"success", 
                    message:"New access token generated", accessToken: string

                2. Error

                    400 - Bad request
                    status:'error', 
                    message: "Request body is empty" 

                    401 - unAuthorized
                    status:'error', 
                    message: "invalid refresh token, login again"

                    500 - Internal server error
                    status:'error', 
                    message: ' Internal server error'


    2. Listing Management:- http://localhost:3000/api/listing

        # Create -

            this API is for business owners or admins to create restaurant list. Normal users are forbidden from accessing it.
            To create a list you have to send the below mentioned data in the as multipart/form-data. images should be added as files.you can add multiple files in the form.

            #Request: 

                api     :  http://localhost:3000/api/listing/create
                method  :  POST
                Data    :   name: string
                            phone: string
                            street : string
                            city:string
                            state: string
                            zipCode : string
                            country: string

                            

            #Response: 

                1. Success- 

                    201 - Created
                    status:'success', 
                    message: 'Restaurant added successfully'

                2. Error

                    400 - Bad request
                    status:'error', 
                    message: "Request body is empty" | "No files found"

                    500 - Internal server error
                    status:'error', 
                    message: ' Internal server error'

        # Create -

            this API is for business owners or admins to create restaurant list. Normal users are forbidden from accessing it.
            To create a list you have to send the below mentioned data in the as multipart/form-data. images should be added as files.you can add multiple files in the form.Make sure to attach the acces token with the request in headers.

            #Request: 

                api     :  http://localhost:3000/api/listing/create
                method  :  POST
                Data    :   name: string
                            phone: string
                            street : string
                            city:string
                            state: string
                            zipCode : string
                            country: string
                Auth Type : Bearer token - access token

                            

            #Response: 

                1. Success- 

                    201 - Created
                    status:'success', 
                    message: 'Restaurant added successfully'

                2. Error

                    400 - Bad request
                    status:'error', 
                    message: "Request body is empty" | "No files found"

                    500 - Internal server error
                    status:'error', 
                    message: ' Internal server error'