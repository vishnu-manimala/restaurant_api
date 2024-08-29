const Review = require('../models/review.model');

const createReview = async(req, res) => {
    try{
        const listingId = req.params.id;
        if(!listingId) return res.status(400).json({ status:'error', message: "List id is empty" });
        if(!req.body) return res.status(400).json({ status:'error', message: "Request body is empty" });

        const { rating, comment } = req.body;

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
        return res.status(500).json({ status:"error", message:"Internal server error"});
    }
}

const deleteReview = async(req, res) =>{

    try{
        const reviewId = req.params.id;
        if(!reviewId) return res.status(400).json({ status:'error', message: "Review id is empty" });

        const deletedReview =  await Review.findOneAndDelete({ _id: reviewId });
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
        if(!reviewId) return res.status(400).json({ status:'error', message: "Review id is empty" });

        const data =  req.body;
        if(!data) return res.status(400).json({ status:'error', message: "Update data is empty" });

        const updatedData = await Review.findOneAndUpdate({ _id: reviewId}, data, { new: true });

        if(!updatedData)  return res.status(404).json({status:"error", message:"document not found."});

        return res.status(200).json({status:"success", message:"updated successfully", updatedData:updatedData})

    } catch(err){
        console.log(err.message);
        return res.status(500).json({ status:"error", message:"Internal server error"});
    }

}
    
const listReview = async(req, res) =>{

}
    
const addReply = async(req, res) =>{

}

module.exports = {
    createReview,
    deleteReview,
    updateReview,
    listReview,
    addReply,
}