require("mysql2/node_modules/iconv-lite").encodingExists("foo");
const controlador = require("../controllers/coinController");
const monedasPrueba = ["Bitcoin", "Ethereum", "Litecoin"];
const db = require("../dbConfig");

afterAll(() => {
  //Se cierra la conexión de la BD para que JEST no se quede colgado
  db.sequelize
    .sync({
      force: false,
      logging: false,
    })
    .then(async () => {
      await db.sequelize.close();
    });
});

test("Retorna info para cada moneda", async () => {
  const monedas = await controlador.obtenerInfoMonedas(monedasPrueba);
  expect(monedas).toHaveLength(3);
});

test("Retorna la info que es", async () => {
  const monedas = await controlador.obtenerInfoMonedas(monedasPrueba);
  expect(monedas).toContainEqual(
    {
      id: "f1ff77b6-3ab4-4719-9ded-2fc7e71cff1f",
      name: "Bitcoin",
      symbol: "BTC",
    },
    {
      id: "e991ba77-d384-48ff-b0a4-40e95ef6b7d6",
      name: "Ethereum",
      symbol: "ETH",
    },
    {
      id: "e0c280b3-b4cf-4012-9e08-14a816ef2c9c",
      name: "Litecoin",
      symbol: "LTC",
    }
  );
});

test("Trae el numero de precios correctos conversión monedas", async () => {
  const monedaFavorita = ["Bitcoin"];
  const conversionMonedas = await controlador.conversionMonedas(
    monedasPrueba,
    monedaFavorita
  );
  expect(conversionMonedas).toHaveLength(3);
}, 8000);

test("Obtiene un token", async () => {
  const token = await controlador.getToken();
  expect(token).toEqual(expect.any(String));
});
