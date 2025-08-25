addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const API_URL = 'https://monitor.woskitech.com/sensors.json';

  try {
    console.log(`📡 Obteniendo datos de sensores en: ${API_URL}`);
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    console.log(`✅ Respuesta: ${response.status}`);

    if (!response.ok) {
      throw new Error(`⚠️ Error en la petición: ${response.statusText}`);
    }

    const data = await response.json();

    const headers = new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });

    console.log('📤 Enviando respuesta final al cliente...');
    return new Response(JSON.stringify({
      sensors: data
    }), { headers });

  } catch (error) {
    console.error('❌ Error en el Worker:', error);
    return new Response(JSON.stringify({ error: 'Error al obtener datos de sensores' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
