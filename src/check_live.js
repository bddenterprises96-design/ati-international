import https from 'https';

https.get('https://theatinternational.com/', (res) => {
  let data = '';
  res.on('data', (d) => data += d);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    const matches = data.match(/src="([^"]+)"/g) || [];
    console.log('Asset matches:', matches);
  });
}).on('error', (e) => console.error(e));
