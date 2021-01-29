require('mysql2/node_modules/iconv-lite').encodingExists('foo');
const controlador = require("../controllers/coinController");

test('nombre del test', async () => {

  const monedasPrueba=["Bitcoin","Ethereum","Litecoin"];
  // const monedas=await controlador.obtenerInfoMonedas(monedasPrueba);
  // console.log(monedas);
  const monedas=await  controlador.obtenerInfoMonedas(monedasPrueba);
  expect(monedas).toHaveLength(3);

   
  })