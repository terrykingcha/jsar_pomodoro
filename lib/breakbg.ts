import * as res from './res';
import { createRawTexture } from "./createRawTexture";

const scene = spatialDocument.scene;

const plane = BABYLON.MeshBuilder.CreatePlane('plane', {
  width: 192,
  height: 108,
  sideOrientation: BABYLON.Mesh.DOUBLESIDE,
  frontUVs: new BABYLON.Vector4(1, 1, 0, 0),
  backUVs: new BABYLON.Vector4(1, 1, 0, 0),
}, scene);
plane.scaling = new BABYLON.Vector3(0, 0, 0);
plane.position.z = -11;
plane.position.y = 0;

const mat = new BABYLON.StandardMaterial('break-bg', scene);
plane.material = mat;

createRawTexture(res.breakBgTexture).then((texture) => {
  mat.diffuseTexture = texture;
});

export function show() {
  plane.scaling = new BABYLON.Vector3(1, 1, 1);
}

export function hide() {
  plane.scaling = new BABYLON.Vector3(0, 0, 0);
}

