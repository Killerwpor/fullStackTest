const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');
// get config vars
dotenv.config();

module.exports.validateToken = function (req,res,next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401) // if there isn't any token
    console.log(process.env.TOKEN_SECRET);
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {      
            if (err) {
                console.log(err)
              return res.json({ mensaje: 'Token invalido' });    
            } else {
              req.decoded = decoded;    
              next();
            }
          });
    }
}

