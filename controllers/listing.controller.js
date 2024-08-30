const mongoose = require('mongoose');
const Listing = require('../models/listing.model');

const listRestaurants = async (req, res) =>{
    try{
        // Aggregating to get listing data with listed user and review, it also includes average review and total reviews
        const ListingDatas = await Listing.aggregate([
            {
                $match: { isDeleted: false },
            },
            {
                $lookup:{
                    from: 'users',
                    localField: 'ownerId',
                    foreignField: '_id',
                    as: 'owner',
                },
            },
            { $unwind: '$owner'},
            {
                $lookup: {
                    from: 'reviews',
                    localField:'_id',
                    foreignField: 'listingId',
                    as: 'reviews',
                },
            },
            {
                $addFields:{
                    averageRating: {
                        $avg: '$reviews.rating',
                    },
                    totalReviews:{
                        $size: '$reviews',
                    }
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    phone: 1,
                    images: 1,
                    street: 1,
                    city: 1,
                    state: 1,
                    zipCode: 1,
                    country: 1,
                    isDeleted: 1,
                    createdAt: 1,
                    owner: {
                        _id: 1,
                        name: 1,
                        email: 1,
                        role: 1,
                    },
                    reviews: 1,
                    averageRating: 1,
                    totalReviews: 1,
                }
            }
        ]);

        console.log("list", ListingDatas)
        if(ListingDatas.length === 0) return res.status(404).json({ status:'error', message: "No data found" }); 

        return res.status(200).json({status:"success", message:"Data found", data: ListingDatas });

    }catch(err){
        console.log(err.message);
        res.status(500).json({ status:'error', message: ' Internal server error' })
  
    }
}

const singleRestaurant = async (req, res)=>{
    try{

    //Checks if the listing Id is available in params or not
     const listId = req.params.id;
     if(!listId) return res.status(400).json({ status:'error', message: "List id not found" }); 
     
     //retrieving list form db 
    const listData = await Listing.aggregate([
        {
            $match: {
                $and:[
                    { _id:new mongoose.Types.ObjectId(listId)}, 
                    {isDeleted: false }
                ],
            },
        },
        {
            $lookup:{
                from: 'users',
                localField: 'ownerId',
                foreignField: '_id',
                as: 'owner',
            },
        },
        { $unwind: '$owner'},
        {
            $lookup: {
                from: 'reviews',
                localField:'_id',
                foreignField: 'listingId',
                as: 'reviews',
            },
        },
        {
            $addFields:{
                averageRating: {
                    $avg: '$reviews.rating',
                },
                totalReviews:{
                    $size: '$reviews',
                }
            }
        },
        {
            $project: {
                _id: 1,
                name: 1,
                phone: 1,
                images: 1,
                street: 1,
                city: 1,
                state: 1,
                zipCode: 1,
                country: 1,
                isDeleted: 1,
                createdAt: 1,
                owner: {
                    _id: 1,
                    name: 1,
                    email: 1,
                    role: 1,
                },
                reviews: 1,
                averageRating: 1,
                totalReviews: 1,
            }
        }
    ]);

     if(listData.length === 0) return res.status(404).json({ status:'error', message: "List not found" }); 
     console.log(listData)
     return res.status(200).json({ status: "success", message:"List found", list:listData});

    }catch(err){
        console.log(err.message);
        res.status(500).json({ status:'error', message: ' Internal server error' })
    }
}

const createListing = async (req, res) =>{
    try{
        if(!req.body) return res.status(400).json({ status:'error', message: "Request body is empty" });
        if(!req.files) return res.status(400).json({ status:'error', message: "No files found" });
        console.log(req.body);

        const listData = req.body;
        const userId = req.userId;
        const imageArray = req.files.map(element => element.filename);
        
        const list = new Listing({
            ownerId: userId,
            name:listData.name,
            phone:listData.phone,
            images: imageArray,
            street : listData.street,
            city: listData.city,
            state: listData.state,
            zipCode : listData.zipCode,
            country: listData.country
        })

        await list.save();

        res.status(201).json({ status:'success', message: 'Restaurant added successfully', restaurantData: list });

    }catch(err){
        console.log(err.message);
        res.status(500).json({ status:'error', message: err.message })
    }
}

const updateListing = async (req, res) =>{
    try{

        //Checks for list id send as param.
        const listId = req.params.id;
        if(!listId) return res.status(400).json({ status:'error', message: "List id is not available" });

        //checks for data to be updates send as body.
        const data = req.body
        if(!data) return res.status(400).json({ status:'error', message: "No data provided to update" });

        //updates collection with the data. it will return null if it cant find the document with the id.
        const updatedList = await Listing.findOneAndUpdate({ _id: listId}, data,{ new: true});
        if(!updatedList)  return res.status(404).json({status:"error", message:"document not found."});

        return res.status(200).json({status:"success", message:"updated successfully", updatedList:updatedList})

    }catch(err){
        console.log(err.message);
        res.status(500).json({ status:'error', message: ' Internal server error' })
    }
}


const deleteListing  = async (req, res) =>{
    try{
        const listId = req.params.id;
        if(!listId) return res.status(400).json({ status:'error', message: "List id is not found" });

        //Instead of deleting the file here it soft deletes the data.
        const deletedList = await Listing.findOneAndUpdate({_id:listId}, {$set:{isDeleted:true}}, {new: true});
        
        //checks if the list to be deleted is found or not
        if(!deletedList) return res.status(404).json({status:"error", message:"document not found."});

        return res.status(200).json({ status:"success", message:"List successfully deleted."});

    }catch(err){
        console.log(err.message);
        res.status(500).json({ status:'error', message: ' Internal server error' })
    }
}

const deleteImage = async(req, res) => {
    try{
        const listId = req.params.id;
        const imageName = req.body.image;
        console.log(imageName);
        //Checking the data for updating is available or not.
        if(!listId) return res.status(400).json({ status:'error', message: "List id is not found" });
        if(!imageName) return res.status(400).json({ status:'error', message: "Image name is not found" });

        //delete image by pull
        const updatedList = await Listing.findOneAndUpdate({ _id: listId}, { $pull:{ images: imageName }}, { new: true });

        // If the above update request returns empty then document is not found.
        if(!updatedList) return res.status(404).json({status:"error", message:"document not found."});

        return res.status(200).json({ status:"success", message:"Image successfully deleted."});
    
    }catch(err){
        console.log(err.message);
        res.status(500).json({ status:'error', message: ' Internal server error' })
    }

}

const updateImage = async(req, res) =>{
    try{
        const listId = req.params.id;
        console.log(listId);

        //Checking the data for updating is available or not.
        if(!listId) return res.status(400).json({ status:'error', message: "List id is null" });
        if(!req.files) return res.status(400).json({ status:'error', message: "No files found." });

        //store the image names to array
        const imageArray = req.files.map( element => element.filename );
        console.log(imageArray);
        const updatedList = await Listing.findOneAndUpdate({ _id: listId}, { $addToSet: { images: { $each: imageArray}}}, { new: true});
       
        // If the above update request returns empty then document is not found.
        if(!updatedList) return res.status(404).json({status:"error", message:"document not found."});

        return res.status(200).json({ status:"success", message:"Image successfully added."});

    }catch(err){
        console.log(err.message);
        res.status(500).json({ status:'error', message: ' Internal server error' })
    }
}

module.exports = {
    listRestaurants,
    singleRestaurant,
    createListing,
    updateListing,
    deleteListing,
    deleteImage,
    updateImage,
}