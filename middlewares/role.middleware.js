const isAdmin = async (req, res, next ) =>{
   const role = req.role;
   if(role !== 'Admin') return res.status(403).json({ status:"Forbidden", message: "route is forbidden" });

   next();
}

const isNotBusinessOwner = async (req, res, next ) =>{
    const role = req.role;
    console.log(role);
    if(role === 'BusinessOwner') return res.status(403).json({ status:"Forbidden", message: "route is forbidden" });
 
    next();
 }

 const isNotUser = async(req, res, next) =>{
    const role = req.role;
    if( role === 'User') return res.status(403).json({ status:"Forbidden", message: "route is forbidden" });

    next();
 }

module.exports = {
   isAdmin,
   isNotBusinessOwner,
   isNotUser
}