import * as THREE from 'https://esm.sh/three@0.152.0';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);
document.getElementById('galaxy').appendChild(renderer.domElement);

const geo = new THREE.BufferGeometry();
const positions = [];
const colors = [];
for (let i = 0; i < 8000; i++) {
  positions.push((Math.random() - 0.5) * 150, (Math.random() - 0.5) * 150, (Math.random() - 0.5) * 150);
  const c = new THREE.Color();
  c.setHSL(Math.random(), 1, 0.7);
  colors.push(c.r, c.g, c.b);
}
geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

const mat = new THREE.PointsMaterial({
  size: 0.2,
  vertexColors: true,
  blending: THREE.AdditiveBlending
});
const points = new THREE.Points(geo, mat);
scene.add(points);

camera.position.z = 50;

function animate() {
  requestAnimationFrame(animate);
  points.rotation.y += 0.0005;
  const t = Date.now() * 0.0002;
  camera.position.x = Math.sin(t) * 20;
  camera.lookAt(scene.position);
  renderer.render(scene, camera);
}
animate();

addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});