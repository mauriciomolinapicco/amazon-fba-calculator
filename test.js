const baseURL = 'https://sellingpartnerapi-na.amazon.com/sales/v1/orderMetrics';

// Definir el ASIN y el intervalo de tiempo (último mes)
const asin = 'B0792R1RSN'; // Ejemplo de ASIN
const today = new Date();
const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
const interval = `${lastMonth.toISOString()}--${today.toISOString()}`;

const url = `${baseURL}?marketplaceIds=ATVPDKIKX0DER&interval=${interval}&granularity=Total&asin=${asin}`;

fetch(url, {
  headers: {
    'Authorization': 'Bearer tu_token_de_acceso', // Reemplazar con tu token de acceso
  }
})
  .then(response => response.json())
  .then(data => {
    // Procesar la respuesta JSON
    console.log('Datos de ventas:', data);
    // Aquí puedes trabajar con los datos recibidos como unitCount, orderItemCount, etc.
  })
  .catch(error => {
    console.error('Error al obtener datos de ventas:', error);
  });
