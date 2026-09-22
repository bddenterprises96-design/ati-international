import fs from 'fs';

const content = fs.readFileSync('src/Pages/Blogs.jsx', 'utf8');

function showPost(id) {
  const reg = new RegExp(`"id":\\s*${id},[\\s\\S]*?(?="id":\\s*${id+1}|\\n\\];)`,'g');
  const m = content.match(reg);
  if (m) {
    console.log(`==================== POST ${id} ====================`);
    console.log(m[0]);
  }
}

showPost(3);
showPost(4);
showPost(5);
