//Requires
const jwt = require('jsonwebtoken');
const {User}=require('../dbConfig')
const config = require('../configs/config');
const dotenv = require("dotenv");




exports.funcionPrueba = async (req, res) => {   
res.send("Hello world from userControllers");
     };

exports.traerUsuarios= async (req, res) => {   
const users= await User.findAll();
res.json(users);
     };

exports.guardarUsuario = (req, res) => {        
          const user= User.create(req.body).then(function(model) {
               res.json(model);
       }).catch(function(e) {
        res.send(e.message);
  });
}

  exports.login = async (req, res) => {        
     User.findOne({
          where: {
            username: req.body.userName
          },
          attributes: ['password']
        }).then(function(response) {
          if(response.password==req.body.password){
// get config vars
dotenv.config();
console.log(process.env.TOKEN_SECRET);

               const payload = {
                    check:  true
                   };
                   const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
                    expiresIn: 1440
                   });
                   res.json({   
                    message: "Autenticación correcta",                
                    token: token
                   });
          }
          else{
               res.json({                   
                    message: "Usuario o contraseña incorrecta"    
                   });
          }
  }).catch(function(e) {
   res.send(e.message);
});
  }
       
     
    
         
        
   
