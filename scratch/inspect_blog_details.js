import fs from 'fs';

const content = fs.readFileSync('src/Pages/Blogs.jsx', 'utf8');

// Print sections of Post 3, 4, 5
console.log('--- POST 3 (Rotary Oil Seals) ---');
const post3Match = content.match(/"id":\s*3[\s\S]*?"id":\s*4/);
if (post3Match) console.log(post3Match[0].slice(0, 1500));

console.log('\n--- POST 4 (Custom Sourcing) ---');
const post4Match = content.match(/"id":\s*4[\s\S]*?"id":\s*5/);
if (post4Match) console.log(post4Match[0].slice(0, 1500));

console.log('\n--- POST 5 (Motorcycle Sealing Failure Points) ---');
const post5Match = content.match(/"id":\s*5[\s\S]*?"id":\s*6/);
if (post5Match) console.log(post5Match[0].slice(0, 1500));
