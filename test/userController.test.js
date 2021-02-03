require("mysql2/node_modules/iconv-lite").encodingExists("foo");
const httpMocks = require("node-mocks-http");
const controlador = require("../controllers/userController");
const controladorCoin = require("../controllers/coinController");
const db = require("../dbConfig");

afterAll(() => {
  //Se cierra la conexión de la BD para que JEST no se quedé colgado
  db.sequelize
    .sync({
      force: false,
      logging: false,
    })
    .then(async () => {
      await db.sequelize.close();
    });
});

test("Guardar usuario exitoso", async (done) => {
  const userName = "Test" + Math.random();
  const req = httpMocks.createRequest({
    method: "POST",
    url: "/some/url",
    body: {
      userName: userName,
      nombre: "nombre",
      apellido: "apellido",
      password: "02345678",
      monedaPreferida: "Bitcoin",
    },
  });
  var res = httpMocks.createResponse({
    eventEmitter: require("events").EventEmitter,
  });
  var respuesta;
  res.on("end", async () => {
    var resultadoEsperado = {
      userName: userName,
      nombre: "nombre",
      apellido: "apellido",
      password: "02345678",
    };
    respuesta = await JSON.parse(res._getData());
    expect(respuesta).toMatchObject(resultadoEsperado);
    done();
  });
  await controlador.guardarUsuario(req, res);
});

test("Login exitoso", async (done) => {
  const req = httpMocks.createRequest({
    method: "POST",
    url: "/some/url",
    body: {
      userName: "1",
      password: "02345678",
    },
  });
  var res = httpMocks.createResponse({
    eventEmitter: require("events").EventEmitter,
  });
  var respuesta;
  res.on("end", async () => {
    respuesta = await JSON.parse(res._getData());
    expect(respuesta).toMatchObject({
      message: "Autenticación correcta",
    });
    done();
  });
  await controlador.login(req, res);
});

test("Listar monedas sin permiso", async (done) => {
  const req = httpMocks.createRequest({
    method: "POST",
    url: "/some/url",
    body: {
      userName: "1",
      password: "02345678",
    },
  });
  const authHeader = req.headers["authorization"];
  var res = httpMocks.createResponse({
    eventEmitter: require("events").EventEmitter,
  });
  var respuesta;
  res.on("end", async () => {
    respuesta = await JSON.parse(res._getData());
    let res2 = httpMocks.createResponse({
      eventEmitter: require("events").EventEmitter,
    });

    res2.on("end", async () => {
      let respuesta2 = await res2._getData();
      expect(respuesta2).toBe("No tiene permiso");
      done();
    });

    const req2 = httpMocks.createRequest({
      method: "POST",
      url: "/some/url",
      headers: {
        authorization: respuesta.token,
      },
      body: {
        userName: "1",
        password: "02345678",
      },
    });
    await controlador.listarMonedas(req2, res2);
  });

  await controlador.login(req, res);
});
