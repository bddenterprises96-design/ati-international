import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';

const chrome = '"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"';

const html = (objectPos, minHClass) => `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-[#f7f9fb] m-0 p-0 overflow-x-hidden">
  <!-- Desktop Navbar -->
  <header class="fixed top-0 left-0 right-0 z-50 bg-white/95 border-b border-[#c5c6cd] shadow-xs">
    <div class="flex justify-between items-center h-20 px-4 max-w-[1440px] mx-auto">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 rounded-xl border border-[#005691]/20 flex items-center justify-center text-[#005691] font-bold bg-[#005691]/10">
          <span class="material-symbols-outlined text-2xl">globe</span>
        </div>
        <span class="text-xl font-bold tracking-tight text-[#005691]">AT International</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-sm font-semibold text-[#005691] px-3 py-1 bg-blue-50 rounded-lg">Home</span>
        <span class="text-sm font-semibold text-gray-600 px-3 py-1">Products</span>
        <span class="text-sm font-semibold text-gray-600 px-3 py-1">Why ATI?</span>
        <span class="text-sm font-semibold text-gray-600 px-3 py-1">Contact Us</span>
        <span class="text-sm font-semibold text-gray-600 px-3 py-1">Blogs</span>
        <span class="text-sm font-semibold text-gray-600 px-3 py-1">FAQs</span>
        <button class="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold px-4 py-2 rounded-lg text-sm">Request a Quote</button>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="relative -mt-20 ${minHClass} pt-48 pb-20 flex items-center overflow-hidden bg-[#005691]">
    <!-- Video background -->
    <div class="absolute top-20 inset-x-0 bottom-0 overflow-hidden">
      <video
        autoplay
        loop
        muted
        playsinline
        class="w-full h-full object-cover pointer-events-none"
        style="object-position: ${objectPos};"
        src="https://res.cloudinary.com/ybne3lvu/video/upload/v1795156605/WhatsApp_Video_2026-11-20_at_11.34.58_AM11111_xok9fw.mp4"
      ></video>
    </div>
    
    <!-- Gradient overlay -->
    <div class="absolute inset-0 bg-gradient-to-r from-[#005691] via-[#005691]/50 to-[#005691]/00 pointer-events-none"></div>

    <!-- Hero Content -->
    <div class="relative z-10 max-w-[1440px] mx-auto px-8 w-full">
      <div class="max-w-2xl">
        <div class="mb-4">
          <span class="inline-block px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded uppercase tracking-widest backdrop-blur-xs">
            GLOBAL REACH • TRUSTED SUPPLY
          </span>
        </div>
        <h1 class="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight tracking-tight">
          Global Sourcing <br />Partner
        </h1>
        <div class="flex items-center gap-2.5 text-white text-xl font-bold mb-6 tracking-tight">
          <span class="w-8 h-[2.5px] bg-white inline-block flex-shrink-0"></span>
          <span>Keep Your World Moving.</span>
        </div>
        <p class="max-w-xl text-white/90 text-base mb-8 leading-relaxed">
          Quality-verified parts sourced in China and delivered to businesses across 40+ countries.
        </p>
        <div class="flex flex-wrap items-center gap-3 mb-8">
          <button class="px-5 py-2 rounded-full border border-white/35 bg-white/15 text-white text-sm font-medium">Motorcycle Parts</button>
          <button class="px-5 py-2 rounded-full border border-white/35 bg-white/15 text-white text-sm font-medium">E-Bike Parts</button>
          <button class="px-5 py-2 rounded-full border border-white/35 bg-white/15 text-white text-sm font-medium">Industrial Sealing</button>
        </div>
        <div class="flex flex-row gap-4">
          <button class="bg-white text-[#005691] px-8 py-3.5 font-bold rounded-xl flex items-center justify-center gap-1.5 text-sm shadow-md">
            <span>Explore Catalog</span>
            <span class="material-symbols-outlined text-base">north_east</span>
          </button>
          <button class="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold px-8 py-3.5 rounded-xl flex items-center justify-center gap-1.5 text-sm shadow-md">
            <span>Get a Quote</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</body>
</html>
`;

// Test 1: Current styling at 980px viewport (object-center, min-h-[840px])
fs.writeFileSync('src/test_desk_current.html', html('center center', 'min-h-[840px]'));
// Test 2: object-right or right-center
fs.writeFileSync('src/test_desk_right.html', html('right center', 'min-h-[840px]'));
// Test 3: 75% center with min-h-[600px] sm:min-h-[700px] lg:min-h-[840px]
fs.writeFileSync('src/test_desk_opt3.html', html('85% center', 'min-h-[640px] lg:min-h-[840px]'));

const p1 = path.resolve('src/test_desk_current.html').replace(/\\/g, '/');
const p2 = path.resolve('src/test_desk_right.html').replace(/\\/g, '/');
const p3 = path.resolve('src/test_desk_opt3.html').replace(/\\/g, '/');

const out1 = path.resolve('public/assets/desk_current.png').replace(/\\/g, '/');
const out2 = path.resolve('public/assets/desk_right.png').replace(/\\/g, '/');
const out3 = path.resolve('public/assets/desk_opt3.png').replace(/\\/g, '/');

execSync(`${chrome} --headless --disable-gpu --window-size=980,800 --screenshot="${out1}" "file:///${p1}"`);
execSync(`${chrome} --headless --disable-gpu --window-size=980,800 --screenshot="${out2}" "file:///${p2}"`);
execSync(`${chrome} --headless --disable-gpu --window-size=980,800 --screenshot="${out3}" "file:///${p3}"`);

console.log('done');
