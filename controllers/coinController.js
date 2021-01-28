//Requires
const { User, Coin, CoinUser } = require("../dbConfig");
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
  const user = await User.findByPk(req.body.userName);
  // // const user = await User.findOne({
  // //   where: {
  // //     uid: req.body.userName,
  // //   },
  // //   include: { model: User },
  // // });
  if (user.token != null && user.token == token) {
    let moneda = [req.body.moneda];
    const infoMoneda = await exports.obtenerInfoMonedas(moneda); //Se busca si la moneda que mandó el usuario si existe
    console.log(infoMoneda);
    if (infoMoneda.length != 0) {
      //Guardar moneda
      const coin = await Coin.create(infoMoneda[0])
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
      };
      const coinUser = CoinUser.create(infoCoinMoneda)
        .then(function (model) {
          res.send("Done");
          console.log("Relación usuario-moneda guardada exitosamente");
        })
        .catch(function (e) {
          res.json(e.message);
          console.log(e.message);
        });
    } else {
      //Si no existe se le indica
      res.send("Moneda no existe");
    }
  } else {
    res.send("No tiene permiso");
  }
};

exports.obtenerInfoMonedas = (monedas) => {
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
              let info = {
                id: o.id,
                name: o.name,
                symbol: o.symbol,
              };
              ids.push(info);
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
};

exports.conversionMonedas = async (monedas, monedaFavorita) => {
  const token = await getToken();
  return new Promise((resolve, reject) => {
    var options = {
      method: "GET",
      url: "https://bravenewcoin.p.rapidapi.com/market-cap",
      params: { assetId: monedaFavorita },
      headers: {
        authorization: "Bearer " + token,
        "x-rapidapi-key": "79127b6bebmsh025591152333adep107f80jsn114492576aa0",
        "x-rapidapi-host": "bravenewcoin.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        const precioMonedaFavorita = response.data.content[0].price;

        var precios = new Array();
        for (i in monedas) {
          var options = {
            method: "GET",
            url: "https://bravenewcoin.p.rapidapi.com/market-cap",
            params: { assetId: monedas[i].id },
            headers: {
              authorization: "Bearer " + token,
              "x-rapidapi-key":
                "79127b6bebmsh025591152333adep107f80jsn114492576aa0",
              "x-rapidapi-host": "bravenewcoin.p.rapidapi.com",
            },
          };

          axios
            .request(options)
            .then(function (response) {
              precios.push(
                precioMonedaFavorita / response.data.content[0].price
              );
              if (precios.length == monedas.length) resolve(precios);
            })
            .catch(function (error) {
              console.error(error);
            });
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  });
};

function getToken() {
  return new Promise((resolve, reject) => {
    var options = {
      method: "POST",
      url: "https://bravenewcoin.p.rapidapi.com/oauth/token",
      headers: {
        "content-type": "application/json",
        "x-rapidapi-key": "79127b6bebmsh025591152333adep107f80jsn114492576aa0",
        "x-rapidapi-host": "bravenewcoin.p.rapidapi.com",
      },
      data: {
        audience: "https://api.bravenewcoin.com",
        client_id: "oCdQoZoI96ERE9HY3sQ7JmbACfBf55RY",
        grant_type: "client_credentials",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        resolve(response.data.access_token);
      })
      .catch(function (error) {
        reject(error);
        console.error(error);
      });
  });
}

// async function obtenerInfoMonedas(nombreMoneda) {
//   const moneda = [nombreMoneda];
//   const idMoneda = await exports.obtenerInfoMonedas(moneda);
//   console.log(idMoneda[0]);
//   return new Promise((resolve, reject) => {
//     var options = {
//       method: "GET",
//       url: "https://bravenewcoin.p.rapidapi.com/asset/" + idMoneda,
//       headers: {
//         "x-rapidapi-key": "79127b6bebmsh025591152333adep107f80jsn114492576aa0",
//         "x-rapidapi-host": "bravenewcoin.p.rapidapi.com",
//       },
//     };

//     axios
//       .request(options)
//       .then(function (response) {
//         resolve(response.data);
//       })
//       .catch(function (error) {
//         console.error(error);
//       });
//   });
// }
