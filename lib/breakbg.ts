const scene = spatialDocument.scene;

let bgIndex = 0;
const bg = [
  'https://ooo.0x0.ooo/2023/12/19/OKxMac.jpg',
  'https://ooo.0x0.ooo/2023/12/19/OKk3yv.jpg',
  'https://ooo.0x0.ooo/2023/12/19/OKkCsq.jpg'
]

const plane = BABYLON.MeshBuilder.CreatePlane('plane', {
  width: 1920,
  height: 1080,
  sideOrientation: BABYLON.Mesh.DOUBLESIDE,
  frontUVs: new BABYLON.Vector4(1, 1, 0, 0),
  backUVs: new BABYLON.Vector4(1, 1, 0, 0),
}, scene);
plane.scaling = new BABYLON.Vector3(0, 0, 0);
plane.position.z = 0;
plane.position.y = 0;

const mat = new BABYLON.StandardMaterial('', scene);
plane.material = mat;

export function show() {
  plane.scaling = new BABYLON.Vector3(0.015, 0.015, 0.015);
  mat.diffuseTexture = new BABYLON.Texture(bg[bgIndex], scene);
  bgIndex += 1;
}

export function hide() {
  plane.scaling = new BABYLON.Vector3(0, 0, 0);
}

