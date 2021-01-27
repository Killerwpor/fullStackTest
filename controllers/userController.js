//Requires
const jwt = require("jsonwebtoken");
const { User, Coin } = require("../dbConfig");
const dotenv = require("dotenv");
const axios = require("axios").default;

exports.traerUsuarios = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};

exports.guardarUsuario = (req, res) => {
  const user = User.create(req.body)
    .then(function (model) {
      res.json(model);
    })
    .catch(function (e) {
      res.send(e.message);
    });
};

exports.login = async (req, res) => {
  User.findOne({
    where: {
      username: req.body.userName,
    },
    attributes: ["password"],
  })
    .then(function (response) {
      if (response.password == req.body.password) {
        // get config vars
        dotenv.config();
        console.log(process.env.TOKEN_SECRET);

        const payload = {
          check: true,
        };
        const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
          expiresIn: 600,
        });
        try {
          User.update(
            { token: token },
            { where: { username: req.body.userName } }
          );
        } catch (err) {
          console.log(err);
        }
        res.json({
          message: "Autenticación correcta",
          token: token,
        });
      } else {
        res.json({
          message: "Usuario o contraseña incorrecta",
        });
      }
    })
    .catch(function (e) {
      if (e.message == "Cannot read property 'password' of null")
        res.json({
          message: "Usuario o contraseña incorrecta",
        });
      else
        res.json({
          message: e.message,
        });
    });
};

exports.listarMonedas = async (req, res) => {
  var monedas = req.body.monedas;
  ids = await obtenerIdMonedas(monedas); //Estan listos los id de las criptomonedas para operar con ellos después
  res.json(ids);
};

exports.guardarMoneda = async (req, res) => {
  //Comprobar si esta guardando a su usuario
  const coin = Coin.create(req.body)
    .then(function (model) {
      res.json(model);
    })
    .catch(function (e) {
      res.send(e.message);
    });
};

function obtenerIdMonedas(monedas) {
  return new Promise((resolve, reject) => {
    var options = {
      method: "GET",
      url: "https://bravenewcoin.p.rapidapi.com/asset",
      params: { status: "ACTIVE" },
      headers: {
        "x-rapidapi-key": "79127b6bebmsh025591152333adep107f80jsn114492576aa0",
        "x-rapidapi-host": "bravenewcoin.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        let ids = new Array();
        for (i in monedas) {
          let obj = response.data.content.find((o, k) => {
            if (o.name === monedas[i]) {
              ids.push(o.id);
              return true; // Para de buscar
            }
          });
        }
        resolve(ids);
      })
      .catch(function (error) {
        reject(response.data.content);
      });
  });
}
