const jwt = require('jsonwebtoken')


const isAuth = async (req , res, next) =>{
    const headerObj = req.headers;
    const token = headerObj?.authorization?.split(" ")[1];

    const verifyToken = jwt.verify(token, "spendlykey", (err,decoded)=>{
        if (err) {
            return false;
        } else {
            return decoded;
            
        }
    });
    if (verifyToken) {
        req.user = verifyToken.Id;
        next()
        
    } else {
        const err = new Error("Token Expierd, try login again")
        
    }

}