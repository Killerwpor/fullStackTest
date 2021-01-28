//Requires
const jwt = require("jsonwebtoken");
const { User, Coin, CoinUser } = require("../dbConfig");
const dotenv = require("dotenv");
const axios = require("axios").default;
const coinController = require("../controllers/coinController");

exports.traerUsuarios = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};

exports.guardarUsuario = async (req, res) => {
  let monedaFavorita = [req.body.monedaPreferida];
  const infoMoneda = await coinController.obtenerInfoMonedas(monedaFavorita); //Se busca si la moneda que mandó el usuario si existe
  if (infoMoneda.length != 0) {
    //Guardar usuario
    const user = User.create(req.body)
      .then(function (model) {
        console.log("Usuario guardado exitosamente");
        //Guardar moneda
        const coin = Coin.create(infoMoneda[0])
          .then(function (model) {
            console.log("Moneda guardada exitosamente");
          })
          .catch(function (e) {
            console.log(e.message);
          });
        //Guardar relación usuario-moneda
        const infoCoinMoneda = {
          CoinId: infoMoneda[0].id,
          UserUserName: req.body.userName,
          favorita: true,
        };
        const coinUser = CoinUser.create(infoCoinMoneda)
          .then(function (model) {
            console.log("Relación usuario-moneda guardada exitosamente");
          })
          .catch(function (e) {
            console.log(e.message);
          });
        res.json(model);
      })
      .catch(function (e) {
        res.send(e.message);
      });
  } else {
    //Si no existe se le indica
    res.send("Moneda favorita no existe");
  }
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
  // //Comprobar si esta guardando a su usuario
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const user = await User.findByPk(req.body.userName);
  if (user.token != null && user.token == token) {
    //Listar monedas
    var monedas = await Coin.findAll({
      raw: true,
      attributes: ["id", "name", "symbol"],

      include: [
        {
          model: User,
          attributes: [],
          where: { userName: req.body.userName },
          through: {
            attributes: [],
          },
        },
      ],
    });
    // En monedas se tiene el array de monedas
    // Ahora a hacer la conversión y mostrar el precio

    const monedaFavorita = await CoinUser.findOne({
      attributes: ["CoinId"],
      where: {
        UserUserName: req.body.userName,
        favorita: true,
      },
    });
    //console.log(monedas.length);
    const precioEnMonedaFavorita = await coinController.conversionMonedas(
      monedas,
      monedaFavorita.CoinId
    );

    //Ya se tienen los precios en la monedad favorita del usuario, ahora a organizarlos y mostrarlos
    for (i in monedas) {
      monedas[i].precio = precioEnMonedaFavorita[i];
    }
    //Se muestra el resultado
    res.send(monedas);
  } else {
    res.send("No tiene permiso");
  }
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
