const  jwt =require('jsonwebtoken');
const dotenv=require('dotenv');

dotenv.config();
  

exports.signToken= (id, firstName,   lastName, phoneNumber , email, isVerified, isActive, isDeleted,  role)=> {
    const key = process.env.SECRET_KEY;
    const token = jwt.sign({ id: id, firstName:firstName ,  lastName:lastName , phoneNumber:phoneNumber, email:email , isVerified: isVerified, isActive: isActive, isDeleted:isDeleted, role: role }, key, { expiresIn: '1h' });
    return token;
  }

  exports.verifyToken= (req, res, next)=> { 
    const key = process.env.SECRET_KEY;
    const token = req.headers.authorization || req.params.token;
    if (!token) {
      res.status(403).json({ status: 403, error: 'No token provided' }); 
    }else{
      jwt.verify(token, key, (error, decoded) => {
        if (error) {
          console.log(error)
          res.status(401).json({ status: 401, error: 'Unauthorized' });
        }else{
        // console.log(decoded)
        if (decoded.isActive === false) {
          console.log("User has been disabled")
          res.status(401).json({ status: 401, error: 'User has been disabled, contact the admin to enable your account' });
        }else{
          req.user = decoded;
          next();
        }
           
        }
       
      });
    }
    
  }

  
  exports.isAdmin= (req, res, next)=> { 
  
    console.log(req.user) 
        if (req.user.role[0].role === "Admin") {
         
          next();
          
        }else{
          console.log(req.user.role) 
          res.status(401).json({ status: 401, error: 'Unauthorized to access this resource' });
          
        }
    
  }
  
  
  exports.isOperative= (req, res, next)=> { 
  

   // console.log(req.user)
    console.log(req.user) 

        if (req.user.role[0].role === "Operative") {
         
          next();
          
        }else{

         // console.log(req.user.role) 

          console.log(req.user.role) 

          res.status(401).json({ status: 401, error: 'Unauthorized to access this resource' });
          
        }
    
  }

  exports.isTerminalNo= (req, res, next)=> {  
    console.log(req.headers.serialnumber)
    const serialNo = req.headers.serialnumber;
    if (!serialNo) {
      res.status(401).json({ status: 401, error: 'No terminal number provided' }); 
    }else{
      next();
    } 
    
  }

 
  
 

 
  
 

