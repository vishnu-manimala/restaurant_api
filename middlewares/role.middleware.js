const isAdmin = async (req, res, next ) =>{
   const role = req.role;
   if(role !== 'Admin') return res.status(403).json({ status:"Forbidden", message: "route is forbidden" });

   next();
}

const isBusinessOwner = async (req, res, next ) =>{
    const role = req.role;
    if(role !== 'BusinessOwner') return res.status(403).json({ status:"Forbidden", message: "route is forbidden" });
 
    next();
 }