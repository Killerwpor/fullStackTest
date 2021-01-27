//Requires
const { User, Coin } = require("../dbConfig");
const axios = require("axios").default;

exports.traerMonedas = async (req, res) => {
  // if (coins.User.token == token) {
  //   res.json(coins);
  // }
};

exports.guardarMoneda = async (req, res) => {
  // //Comprobar si esta guardando a su usuario
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const user = await User.findByPk(req.body.uid);
  // // const user = await User.findOne({
  // //   where: {
  // //     uid: req.body.userName,
  // //   },
  // //   include: { model: User },
  // // });
  if (user.token == token) {
    const coin = Coin.create(req.body)
      .then(function (model) {
        res.json(model);
      })
      .catch(function (e) {
        res.send(e.message);
      });
  } else {
    res.send("No tiene permiso");
  }
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
