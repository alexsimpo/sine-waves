import * as dat from 'dat.gui';


window.addEventListener('load', function() {
  animate();
});

window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  animate();
});

const gui = new dat.GUI();
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const wave = {
  y: canvas.height / 2,
  length: 0.01,
  amplitude: 100,
  frequency: 0.01
};

const strokeColor = {
  h: 50,
  s: 50,
  l: 50
}

const bgColor = {
  r: 0,
  g: 0,
  b: 0,
  a: 0.01
}

const waveFolder = gui.addFolder('wave');
waveFolder.add(wave, 'y', 0, canvas.height);
waveFolder.add(wave, 'length', -0.01, 0.01);
waveFolder.add(wave, 'amplitude', -300, 300);
waveFolder.add(wave, 'frequency', -0.01, 0.01);

const strokeFolder = gui.addFolder('stroke');
strokeFolder.add(strokeColor, 'h', 0, 255);
strokeFolder.add(strokeColor, 's', 0, 100);
strokeFolder.add(strokeColor, 'l', 0, 100);

const bgFolder = gui.addFolder('background');
bgFolder.add(bgColor, 'r', 0, 255);
bgFolder.add(bgColor, 'g', 0, 255);
bgFolder.add(bgColor, 'b', 0, 255);
bgFolder.add(bgColor, 'a', 0, 1);

let increment = wave.frequency;

function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = `rgba(${bgColor.r}, ${bgColor.g}, ${bgColor.b}, ${bgColor.a}`;
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.beginPath();

  c.moveTo(0, canvas.height / 2);

  for (let i = 0; i < canvas.width; i++) {
      c.lineTo(i, wave.y + Math.sin(i * wave.length + increment) *  wave.amplitude * Math.sin(0.01 + increment));
  }

  c.strokeStyle = `hsl(${Math.abs(strokeColor.h * Math.sin(increment))}, ${strokeColor.s}%, ${strokeColor.l}%)`;
  c.stroke();
  increment += wave.frequency;
}