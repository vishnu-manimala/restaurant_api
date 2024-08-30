const Review = require('../models/review.model');

const listReview = async(req, res) =>{
    try{
        const listingId = req.params.id;
        if(!listingId) return res.status(400).json({ status:'error', message: "List id is empty" });

        //Retrieving reviews and replays along with the user data
        const reviews = await Review.aggregate([
            { $match: { _id: listingId }},
            {
                $lookup:{
                    from:'user',
                    localField:'userId',
                    foreignField:'_id',
                    as: 'user'
                }
            },
            { $unwind: '$user' },
            { 
                $project:{
                    _id: 1,
                    rating: 1,
                    comment: 1,
                    createdAt: 1,
                    user:{
                        _id: 1,
                        name: 1,
                        email: 1
                    },
                    replies:{
                        $map:{
                            input:'$reply',
                            as: 'reply',
                            v: {
                                $lookup: {
                                    form: 'user',
                                    localField: 'userId',
                                    foreignField: '_id',
                                    as: 'replyUser'
                                }
                            }
                        }
                    }
                }
            }
        ]);

        if(!reviews) return res.status(404).json({status:"error", message:"document not found."});
            
        console.log("reviews>>",reviews)
        return res.status(201).json({ status:'success', message: ' data fetched successfully', reviews: reviews});

    }catch(err){
        console.log(err.message);
        return res.status(500).json({ status:"error", message:"Internal server error"});
    }
}

const createReview = async(req, res) => {
    try{
        const listingId = req.params.id;

        // Checking for comment data and id of the business the will be added.
        if(!listingId) return res.status(400).json({ status:'error', message: "List id is empty" });
        if(!req.body) return res.status(400).json({ status:'error', message: "Request body is empty" });

        const { rating, comment } = req.body;// destructuring comment data

        // Save comment to db
        const newReview = new Review({
            userId: req.userId,
            listingId: listingId,
            rating: rating,
            comment: comment
        });

        await newReview.save();

        res.status(201).json({ status:'success', message: 'Comment added successfully'});

    }catch(err){
        console.log(err.message);
        return res.status(500).json({ status:"error", message:err.message});
    }
}

const deleteReview = async(req, res) =>{

    try{
        // checking the id of the review to be deleted in params
        const reviewId = req.params.id;
        if(!reviewId) return res.status(400).json({ status:'error', message: "Review id is empty" });

        //Deleting review from db
        const deletedReview =  await Review.findOneAndDelete({ _id: reviewId });

        //If above query cant find the review using id then it will return null-checking for that case.
        if(!deleteReview) return res.status(404).json({status:"error", message:"document not found."});

        res.status(200).json({ status:'success', message: 'Comment deleted successfully'});

    }catch(err){
        console.log(err.message);
        return res.status(500).json({ status:"error", message:"Internal server error"});
    }
    
}
    
const updateReview = async(req, res) =>{
    try{
        const reviewId = req.params.id;

        // checking the id of the review to be deleted in params
        if(!reviewId) return res.status(400).json({ status:'error', message: "Review id is empty" });

        const data =  req.body;
        if(!data) return res.status(400).json({ status:'error', message: "Update data is empty" });

        const updatedData = await Review.findOneAndUpdate({ _id: reviewId}, data, { new: true });

        //If above query cant find the review using id then it will return null-checking for that case.
        if(!updatedData)  return res.status(404).json({status:"error", message:"document not found."});

        return res.status(200).json({status:"success", message:"updated successfully", updatedData:updatedData})

    } catch(err){
        console.log(err.message);
        return res.status(500).json({ status:"error", message:"Internal server error"});
    }

}
    
    
const addReply = async(req, res) =>{
    try{

        const reviewId = req.params.id;

        // checking the id of the review to be deleted in params
        if(!reviewId) return res.status(400).json({ status:'error', message: "Review id is empty" });

        const message =  req.body.reply;
        if(!data) return res.status(400).json({ status:'error', message: "Update data is empty" });

        const replyData = { userId: req.userId, message: message };
        const savedReply = Review.findOneAndUpdate({ _id: reviewId }, { $push: { reply: replyData}}, { new: true });

        if(!savedReply) return res.status(404).json({status:"error", message:"document not found."});

        return res.status(200).json({status:"success", message:"updated successfully", review:savedReply });

    }catch(err){
        console.log(err.message);
        return res.status(500).json({ status:"error", message:"Internal server error"});
    }

}

const deleteReply = async(req, res) => {
    try{
        const reviewId = req.params.id;
        const replyId  = req.body.id;
        if(!reviewId) return res.status(400).json({ status:'error', message: "Review id is required!" });
        if(!replyId) return res.status(400).json({ status:'error', message: "Reply id is required!" });

        const deletedReply = Review.findOneAndUpdate({ _id: reviewId },{ $pull:{ _id: replyId}}, { new: true });
        
        if(!deletedReply) return res.status(404).json({status:"error", message:"document not found."});

        return res.status(200).json({status:"success", message:"Reply deleted successfully" });

    }catch(err){
        console.log(err.message);
        return res.status(500).json({ status:"error", message:"Internal server error"});
    }
   

}

module.exports = {
    createReview,
    deleteReview,
    updateReview,
    listReview,
    addReply,
    deleteReply
}