import { execSync } from 'child_process';
import fs from 'fs';

const chrome = '"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"';

console.log('Capturing desktop...');
execSync(`${chrome} --headless --disable-gpu --screenshot=desktop_hero.png --window-size=1440,900 --virtual-time-budget=6000 https://theatinternational.com/`);
console.log('Desktop captured! File size:', fs.statSync('desktop_hero.png').size);

console.log('Capturing mobile...');
execSync(`${chrome} --headless --disable-gpu --screenshot=mobile_hero.png --window-size=390,844 --virtual-time-budget=6000 https://theatinternational.com/`);
console.log('Mobile captured! File size:', fs.statSync('mobile_hero.png').size);
