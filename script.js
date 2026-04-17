// Requiere: npm install seedrandom
const seedrandom = require('seedrandom');

const SEED = 1763519;
const N = 1000000;
const rng = seedrandom(SEED);

const nums = new Int32Array(N);
for (let i = 0; i < N; i++) nums[i] = rng.int32();

// 1. Positivos y negativos
let positivos = 0, negativos = 0;
for (let i = 0; i < N; i++) {
  if (nums[i] > 0) positivos++; else if (nums[i] < 0) negativos++;
}
console.log('1. Positivos:', positivos, '| Negativos:', negativos);

// 2. Resto al dividir en 7 sea 0, 3, 5 o 6
let resto7 = 0;
const restosValidos = new Set([0,3,5,6]);
for (let i = 0; i < N; i++) {
  const r = ((nums[i] % 7) + 7) % 7;
  if (restosValidos.has(r)) resto7++;
}
console.log('2. Cantidad con resto 0,3,5,6 en 7:', resto7);

// 3. Contadores por anteúltimo dígito
const contadores = new Array(10).fill(0);
for (let i = 0; i < N; i++) {
  const abs = Math.abs(nums[i]);
  const anteultimo = Math.floor(abs / 10) % 10;
  contadores[anteultimo]++;
}
console.log('3. Contadores:', contadores.map((v,k)=>k+':'+v).join(', '));

// 4. Mínimo: valor y posición (desde 1)
let minVal = nums[0], minPos = 1;
for (let i = 1; i < N; i++) {
  if (nums[i] < minVal) { minVal = nums[i]; minPos = i + 1; }
}
console.log('4. Mínimo valor:', minVal, '| Posición:', minPos);

// 5. Mismo signo que el anterior
let mismoSigno = 0;
for (let i = 1; i < N; i++) {
  if ((nums[i] > 0 && nums[i-1] > 0) || (nums[i] < 0 && nums[i-1] < 0)) mismoSigno++;
}
console.log('5. Mismo signo que anterior:', mismoSigno);
// 6. Promedio entero de números con exactamente 6 dígitos
let suma6 = 0, count6 = 0;
for (let i = 0; i < N; i++) {
  const abs = Math.abs(nums[i]);
  if (abs >= 100000 && abs <= 999999) { suma6 += nums[i]; count6++; }
}
const prom6 = count6 > 0 ? Math.round(suma6 / count6) : 0;
console.log('6. Promedio 6 dígitos:', prom6, '(sobre', count6, 'números)');