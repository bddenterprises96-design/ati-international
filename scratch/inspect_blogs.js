import fs from 'fs';

const content = fs.readFileSync('src/Pages/Blogs.jsx', 'utf8');

// Find all post titles
const matches = content.match(/"title":\s*"([^"]+)"/g);
console.log('Found Titles:');
matches?.forEach(m => console.log(' -', m));

// Find category names
const catMatches = content.match(/"category":\s*"([^"]+)"/g);
console.log('\nFound Categories:');
catMatches?.forEach(m => console.log(' -', m));
