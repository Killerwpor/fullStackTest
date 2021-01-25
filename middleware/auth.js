module.exports.validateToken = function (req,res,next) {
    const token = req.headers['authorization']
    console.log(token);
    if (token) {
        //Make sure the token is valid[...]
        next()
    }else {
        return res.status(401).send({
            message: 'Missing token',
            success: false
        })
    } 
}