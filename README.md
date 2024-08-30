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
                Body    :   name:  string
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
                Body    :   email: string
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
                Body: 
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
            To create a list you have to send the below mentioned data in the as multipart/form-data. images should be added as files.you can 
            add multiple files in the form.

            #Request: 

                api     :  http://localhost:3000/api/listing/create
                method  :  POST
                Body    :   name: string
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
                    restaurantData :   { _id: string
                                        ownerId: string,
                                        name: string,
                                        phone:number,
                                        images: Array,
                                        street : string,
                                        city: string,
                                        state: string,
                                        zipCode : string,
                                        country: string,
                                        isDeleted:boolean
                                        createdAt: Date
                                        }
                2. Error

                    400 - Bad request
                    status:'error', 
                    message: "Request body is empty" | "No files found"

                    500 - Internal server error
                    status:'error', 
                    message: ' Internal server error'

        # Update -

            this api allows to update the fields of the saved restaurant.To add and delete images we have separate APIs. Add the desired field 
            and its value in the body from the data given below. Make sure to attach the access token with the request in headers.

            #Request: 

                api     :  http://localhost:3000/api/listing/update/:listId  
                method  :  PATCH
                Body    :   name: string
                            phone: string
                            street : string
                            city:string
                            state: string
                            zipCode : string
                            country: string
                Auth Type : Bearer token - access token

                            

            #Response: 

                1. Success- 

                    200 - OK
                    status:'success', 
                    message: 'Updated successfully'
                    updatedList:  { _id: string
                                        ownerId: string,
                                        name: string,
                                        phone:number,
                                        images: Array,
                                        street : string,
                                        city: string,
                                        state: string,
                                        zipCode : string,
                                        country: string,
                                        isDeleted:boolean
                                        createdAt: Date
                                        }

                2. Error

                    400 - Bad request
                    status:'error', 
                    message: "List id is not available" | "No data provided to update"

                    404 - Not found
                    status: "error",
                    message: "document not found."

                    500 - Internal server error
                    status:'error', 
                    message: ' Internal server error'


        # Delete restaurant

            This API allows you to delete a restaurant details saved in the db. Here we are using soft delete.

            #Request: 

                api     :  http://localhost:3000/api/listing/delete/:listId  
                method  :  DELETE
                Auth Type : Bearer token - access token

                            

            #Response: 

                1. Success- 

                    200 - Ok
                    status:'success', 
                    message: 'List successfully deleted.'
                    
                2. Error

                    400 - Bad request
                    status:'error', 
                    message: "List id is not found" 

                    404 - Not found
                    status: "error",
                    message: "document not found."

                    500 - Internal server error
                    status:'error', 
                    message: ' Internal server error'

        # Delete image from a restaurant data

            This API allows you to delete an image added in restaurant details saved in the db.

            #Request: 

                api     :  http://localhost:3000/api/listing/deleteImage/:listId  
                method  :  DELETE
                Body    : imageName: string

                Auth Type : Bearer token - access token

                            

            #Response: 

                1. Success- 

                    200 - Ok
                    status:'success', 
                    message: 'Image successfully deleted'
                    
                2. Error

                    400 - Bad request
                    status:'error', 
                    message: "List id is not found" | "Image name is not found"

                    404 - Not found
                    status: "error",
                    message: "document not found."

                    500 - Internal server error
                    status:'error', 
                    message: ' Internal server error'

        # Add A new image to restaurant 

            This API allows you to add a new image to restaurant details saved in the db. Sends image as file in multipart/form-data.

            #Request: 

                api     :  http://localhost:3000/api/listing/updateImage/:listId  
                method  :  PATCH
                Body    : files

                Auth Type : Bearer token - access token

                            

            #Response: 

                1. Success- 

                    200 - Ok
                    status:'success', 
                    message: 'Image successfully added'
                    
                2. Error

                    400 - Bad request
                    status:'error', 
                    message: "List id is not found" | "No files found."

                    404 - Not found
                    status: "error",
                    message: "document not found."

                    500 - Internal server error
                    status:'error', 
                    message: ' Internal server error'

        # List all restaurants

            This API allows you to access all
            #Request: 

                api     :  http://localhost:3000/api/listing/lists  
                method  :  GET
                
                Auth Type : Bearer token - access token

                            

            #Response: 

                1. Success- 

                    200 - Ok
                    status:'success', 
                    message: 'Data found',
                    data : Array of Object
                            {
                                _id: string,
                                name: string,
                                phone: string,
                                images: [],
                                street:string,
                                city: string,
                                state: string,
                                zipCode: string,
                                country: string,
                                isDeleted: boolean,
                                createdAt: Date
                                owner: {
                                    _id: string
                                    name: string
                                    email: string
                                    role: string
                                },
                                reviews: [
                                    {
                                        _id: string,
                                        userId: string,
                                        listingId: string,
                                        rating: number,
                                        comment: string,
                                        createdAt: Date
                                        reply: [
                                            {
                                                userId: string,
                                                userEmail: string,
                                                userName: string,
                                                message: string,
                                                _id: string,
                                                createdAt: Date
                                            }
                                        ],
                                        __v: number
                                    },
                                ],
                                averageRating: number,
                                totalReviews: number
                            }
                2. Error
                                       
                    404 - Not found
                    status: "error",
                    message: "No data found."

                    500 - Internal server error
                    status:'error', 
                    message: ' Internal server error'

        #List single restaurants

            This API allows you to access a specific restaurant data. Send restaurant id with the url as param.
            #Request: 

                api     :  http://localhost:3000/api/listing/list/:listingId  
                method  :  GET
                
                Auth Type : Bearer token - access token

                            

            #Response: 

                1. Success- 

                    200 - Ok
                    status:'success', 
                    message: 'Data found',
                    data : {
                                _id: string,
                                name: string,
                                phone: string,
                                images: [],
                                street:string,
                                city: string,
                                state: string,
                                zipCode: string,
                                country: string,
                                isDeleted: boolean,
                                createdAt: Date
                                owner: {
                                    _id: string
                                    name: string
                                    email: string
                                    role: string
                                },
                                reviews: [
                                    {
                                        _id: string,
                                        userId: string,
                                        listingId: string,
                                        rating: number,
                                        comment: string,
                                        createdAt: Date
                                        reply: [
                                            {
                                                userId: string,
                                                userEmail: string,
                                                userName: string,
                                                message: string,
                                                _id: string,
                                                createdAt: Date
                                            }
                                        ],
                                        __v: number
                                    },
                                ],
                                averageRating: number,
                                totalReviews: number
                            }
                2. Error

                    400 - Bad request
                    status:'error', 
                    message: "List id not found"

                    404 - Not found
                    status: "error",
                    message: "No data found."

                    500 - Internal server error
                    status:'error', 
                    message: ' Internal server error'

    3. Review Management:- http://localhost:3000/api/review

        # Create Review -

         This api helps you to create a review for a business that is listed in this app. Only user or admin can write a review. so it's forbidden for Business owners.

            #Request: 

                api     :  http://localhost:3000/api/review/create/:listId
                method  :  POST
                Body    :   rating: number,
                            comment: string,
                Auth Type : Bearer token - access token
                            

            #Response: 

                1. Success- 

                    201 - Created
                    status:'success', 
                    message: 'Comment added successfully'
                    
                2. Error

                    400 - Bad request
                    status:'error', 
                    message: "List id is not found." | "Request body is empty."
"

                    500 - Internal server error
                    status:'error', 
                    message: ' Internal server error'

        # Delete Review -

         This api helps you to delete a review for a business that is listed in this app. Only user or admin can delete a review which they created. so it's forbidden for Business owners.

            #Request: 

                api     :  http://localhost:3000/api/review/delete/:reviewId
                method  :  DELETE
                
                Auth Type : Bearer token - access token
                            

            #Response: 

                1. Success- 

                    200 - OK
                    status:'success', 
                    message: 'Comment Deleted successfully'
                    
                2. Error

                    400 - Bad request
                    status:'error', 
                    message: "Review id is empty."

                    404 - Not found
                    status:'error', 
                    message: "Document not found."

                    500 - Internal server error
                    status:'error', 
                    message: ' Internal server error'

        # Update Review -

         This api helps you to delete a review for a business that is listed in this app. Only user or admin can delete a review which they created. so it's forbidden for Business owners.

            #Request: 

                api     :  http://localhost:3000/api/review/update/:reviewId
                method  :  PATCH
                
                Auth Type : Bearer token - access token
                            

            #Response: 

                1. Success- 

                    200 - OK
                    status:'success', 
                    message: 'Comment Deleted successfully',
                    updatedData: {
                                    _id: string,
                                    userId: string,
                                    listingId: string,
                                    rating: number,
                                    comment: string,
                                    createdAt: Date,
                                    reply: [
                                        {
                                            userId: string,
                                            userEmail: string,
                                            userName: string,
                                            message: string,
                                            _id: string,
                                            createdAt: string 
                                        }
                                    ],
                                    __v: number
                                }
                    
                2. Error

                    400 - Bad request
                    status:'error', 
                    message: "Review id is empty."

                    404 - Not found
                    status:'error', 
                    message: "Document not found."

                    500 - Internal server error
                    status:'error', 
                    message: ' Internal server error'

    # Add Reply -

         This api helps you to add a reply to a  review. 

            #Request: 

                api     :  http://localhost:3000/api/review/addReply/:reviewId
                method  :  POST
                
                Auth Type : Bearer token - access token
                            

            #Response: 

                1. Success- 

                    201 - Created
                    status:'success', 
                    message: 'Reply saved successfully',
                    review: {
                                    _id: string,
                                    userId: string,
                                    listingId: string,
                                    rating: number,
                                    comment: string,
                                    createdAt: Date,
                                    reply: [
                                        {
                                            userId: string,
                                            userEmail: string,
                                            userName: string,
                                            message: string,
                                            _id: string,
                                            createdAt: string 
                                        }
                                    ],
                                    __v: number
                                }
                    
                2. Error

                    400 - Bad request
                    status:'error', 
                    message: "Review id is empty." | "Reply data is empty"

                    500 - Internal server error
                    status:'error', 
                    message: ' Internal server error'

    # Delete Reply -

         This api helps you to delete a reply from a  review. 

            #Request: 

                api     :  http://localhost:3000/api/review/deleteReply/:reviewId
                method  :  DELETE
                Body: 
                        replyId: string

                Auth Type : Bearer token - access token
                            

            #Response: 

                1. Success- 

                    200 - OK
                    status:'success', 
                    message: 'Reply deleted successfully',
                    
                    
                2. Error

                    400 - Bad request
                    status:'error', 
                    message: "Review id is required." | "Reply id is required"

                    404 - Not Found
                    status:'error', 
                    message: "document not found"

                    500 - Internal server error
                    status:'error', 
                    message: ' Internal server error'

    # Get Reviews -

         This api helps you to get all reviews. 

            #Request: 

                api     :  http://localhost:3000/api/review/review/:reviewId
                method  :  GET
                                            

            #Response: 

                1. Success- 

                    200 - OK
                    status:'success', 
                    message: 'data fetched successfully',
                    reviews:  [
                                {
                                    _id: string,
                                    rating: number,
                                    comment: string,
                                    createdAt: Date,
                                    reply: [
                                        {
                                            userId: string,
                                            userEmail: string,
                                            userName: string,
                                            message: string,
                                            _id: string,
                                            createdAt: Date
                                        },
                                    ],
                                    user: {
                                        _id: string,
                                        name: string,
                                        email: string
                                    } 
                                }                               
                            ]
                    
                2. Error
                 
                    404 - Not Found
                    status:'error', 
                    message: "document not found"

                    500 - Internal server error
                    status:'error', 
                    message: ' Internal server error'