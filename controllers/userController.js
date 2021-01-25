//Requires
const jwt = require('jsonwebtoken');
const {User}=require('../dbConfig')
const config = require('../configs/config');



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
               const payload = {
                    check:  true
                   };
                   const token = jwt.sign(payload, config.key, {
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
       
     
    
         
        
   
