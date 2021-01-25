//Requires
const {User}=require('../dbConfig')



exports.funcionPrueba = async (req, res) => {   
res.send("Hello world from userControllers");
     };

exports.traerUsuarios= async (req, res) => {   
const users= await User.findAll();
res.json(users);
     };

exports.guardarUsuario = async (req, res) => {   
     
          const user= User.create(req.body).then(function(model) {
               res.json(model);
       }).catch(function(e) {
        res.send(e.message);
  });
       
     
    
         
        
   
};