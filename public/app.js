var map = L.map('map').setView([45.75, 21.23], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const landmarks = [
  {
    name: "Union Square",
    coordinates: [45.756, 21.229],
    description: "A historical square in Timisoara with Baroque architecture."
  },
  {
    name: "Victory Square",
    coordinates: [45.755, 21.227],
    description: "A central square showcasing the Romanian Revolution."
  }
];

landmarks.forEach(landmark => {
  const marker = L.marker(landmark.coordinates).addTo(map);

  const popupContent = `
    <h3>${landmark.name}</h3>
    <p>${landmark.description}</p>
    <div id="model-container">
      <a-scene embedded style="width: 100%; height: 200px;">
        <a-assets>
          <img id="ground" src="assets/cobble.jpg">
          <img id="ground-NRM" src="assets/cobble-nrm.jpg">
          <img id="sky" src="assets/sky.jpg">
          <a-asset-item id="block" src="assets/models/pillar.glb"></a-asset-item>
        </a-assets>

        <!-- sky and ground -->
        <a-sky src="#sky"></a-sky>
        <a-plane src="#ground" repeat="10 10" 
                 normal-map="#ground-NRM" normal-texture-repeat="10 10" 
                 shader="flat" scale="50 50 1" rotation="-90 0 0">
        </a-plane>

        <!-- camera --> 
        <a-entity id="rig" movement-controls="controls: gamepad,keyboard">
          <a-entity position="-10 0 10">
            <a-camera user-height="1.6" look-controls="pointerLockEnabled: true"></a-camera>
          </a-entity> 
        </a-entity>

        <!-- object -->
        <a-entity scale="0.5 0.5 0.5" gltf-model="#block"></a-entity>
      </a-scene>
    </div>
    <a href="ar-viewer.html" target="_blank">Back in time</a>
  `;

  marker.bindPopup(popupContent);
});
