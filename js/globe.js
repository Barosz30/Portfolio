/**
 * WebGL Earth globe (Three.js)
 */
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.172.0/build/three.module.js';

const TEX = 'https://cdn.jsdelivr.net/npm/three-globe@2.31.1/example/img';

const sceneEl = document.getElementById('globeScene');
const canvas = document.getElementById('globeCanvas');

if (sceneEl && canvas && !sceneEl.dataset.globeInit) {
  sceneEl.dataset.globeInit = '1';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cities = [
    { lat: 52.7, lon: 21.15, label: 'Polska' },
  ];

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  const threeScene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0, 2.75);

  const globeGroup = new THREE.Group();
  threeScene.add(globeGroup);

  const loader = new THREE.TextureLoader();

  function latLonToVector3(lat, lon, radius = 1.035) {
    const phi = THREE.MathUtils.degToRad(90 - lat);
    const theta = THREE.MathUtils.degToRad(lon + 180);
    return new THREE.Vector3(
      -radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    );
  }

  function addCityMarker(lat, lon) {
    const pos = latLonToVector3(lat, lon, 1.018);
    const marker = new THREE.Group();
    marker.position.copy(pos);
    // Orient marker so local +Z points outward from globe center
    marker.lookAt(pos.clone().multiplyScalar(2));

    const glow = new THREE.Mesh(
      new THREE.CircleGeometry(0.045, 24),
      new THREE.MeshBasicMaterial({
        color: 0x00d4aa,
        transparent: true,
        opacity: 0.28,
        side: THREE.FrontSide,
        depthWrite: false,
      })
    );
    marker.add(glow);

    const dot = new THREE.Mesh(
      new THREE.CircleGeometry(0.018, 20),
      new THREE.MeshBasicMaterial({
        color: 0x00f0c8,
        side: THREE.FrontSide,
        depthTest: true,
        depthWrite: false,
      })
    );
    dot.position.z = 0.001;
    marker.add(dot);

    marker.renderOrder = 10;
    globeGroup.add(marker);
  }

  cities.forEach(({ lat, lon }) => addCityMarker(lat, lon));

  // Atmosphere glow
  const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(1.14, 32, 32),
    new THREE.MeshBasicMaterial({
      color: 0x5eb3ff,
      transparent: true,
      opacity: 0.11,
      side: THREE.BackSide,
    })
  );
  globeGroup.add(atmosphere);

  // Sun + fill
  threeScene.add(new THREE.AmbientLight(0x404860, 0.55));
  const sun = new THREE.DirectionalLight(0xffffff, 1.35);
  sun.position.set(5, 2, 4);
  threeScene.add(sun);

  const loaderPromise = Promise.all([
    loader.loadAsync(`${TEX}/earth-blue-marble.jpg`),
    loader.loadAsync(`${TEX}/earth-topology.png`),
  ]).then(([colorMap, bumpMap]) => {
    colorMap.colorSpace = THREE.SRGBColorSpace;

    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(1, 48, 48),
      new THREE.MeshPhongMaterial({
        map: colorMap,
        bumpMap: bumpMap,
        bumpScale: 0.06,
        specular: new THREE.Color(0x1a3355),
        shininess: 14,
      })
    );
    globeGroup.add(earth);
  }).catch(() => {
    // Fallback if textures fail to load
    globeGroup.add(new THREE.Mesh(
      new THREE.SphereGeometry(1, 48, 48),
      new THREE.MeshPhongMaterial({
        color: 0x1a4a7a,
        emissive: 0x0a1a2a,
        specular: 0x4488cc,
        shininess: 18,
      })
    ));
  });

  // Start with Europe / Poland facing the camera
  let rotX = THREE.MathUtils.degToRad(48);
  let rotY = THREE.MathUtils.degToRad(-12);
  let isDragging = false;
  let lastX = 0;
  let lastY = 0;
  let autoRotate = !reduceMotion;
  let isInView = false;
  let isPageVisible = !document.hidden;
  let rafId = null;

  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.bottom > 0 && rect.top < window.innerHeight;
  }

  function shouldRender() {
    return isInView && isPageVisible;
  }

  function renderFrame() {
    if (!isDragging && autoRotate) rotY += 0.003;
    globeGroup.rotation.x = rotX;
    globeGroup.rotation.y = rotY;
    renderer.render(threeScene, camera);
  }

  function tick() {
    rafId = null;
    if (!shouldRender()) return;
    renderFrame();
    scheduleFrame();
  }

  function scheduleFrame() {
    if (rafId !== null || !shouldRender()) return;
    rafId = requestAnimationFrame(tick);
  }

  function startLoop() {
    if (!shouldRender()) return;
    renderFrame();
    scheduleFrame();
  }

  function stopLoop() {
    if (rafId === null) return;
    cancelAnimationFrame(rafId);
    rafId = null;
  }

  function resize() {
    const size = Math.min(sceneEl.clientWidth, 300) || 300;
    renderer.setSize(size, size, false);
    camera.aspect = 1;
    camera.updateProjectionMatrix();
  }

  resize();
  window.addEventListener('resize', resize);

  sceneEl.addEventListener('pointerdown', (e) => {
    isDragging = true;
    autoRotate = false;
    lastX = e.clientX;
    lastY = e.clientY;
    sceneEl.classList.add('is-dragging');
    sceneEl.setPointerCapture(e.pointerId);
    if (shouldRender()) startLoop();
  });

  sceneEl.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    rotY += dx * 0.005;
    rotX = THREE.MathUtils.clamp(rotX + dy * 0.005, -1.05, 1.05);
    lastX = e.clientX;
    lastY = e.clientY;
    if (shouldRender()) {
      renderFrame();
      scheduleFrame();
    }
  });

  const endDrag = (e) => {
    if (!isDragging) return;
    isDragging = false;
    sceneEl.classList.remove('is-dragging');
    if (!reduceMotion) {
      setTimeout(() => { autoRotate = true; }, 2000);
    }
    try { sceneEl.releasePointerCapture(e.pointerId); } catch (_) {}
  };

  sceneEl.addEventListener('pointerup', endDrag);
  sceneEl.addEventListener('pointercancel', endDrag);

  const visibilityObserver = new IntersectionObserver(
    (entries) => {
      isInView = entries.some((entry) => entry.isIntersecting);
      if (shouldRender()) startLoop();
      else stopLoop();
    },
    { rootMargin: '80px 0px', threshold: 0 }
  );
  visibilityObserver.observe(sceneEl);

  document.addEventListener('visibilitychange', () => {
    isPageVisible = !document.hidden;
    if (shouldRender()) startLoop();
    else stopLoop();
  });

  isInView = isElementInViewport(sceneEl);
  if (shouldRender()) startLoop();

  loaderPromise.catch(() => {});
}
