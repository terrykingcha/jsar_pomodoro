import { AbstractMesh, Color3, PBRMaterial } from "babylonjs";

const scene = spaceDocument.scene;

/*
 * c1  c2  c3
 * c4      c5
 * c6      c7
 * c8  c9  c10
 * c11     c12
 * c13     c14
 * c15 c16 c17
*/
const digitMeshNames = {
  '0': ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c10', 'c11', 'c12', 'c13', 'c14', 'c15', 'c16', 'c17'],
  '1': ['c3', 'c5', 'c7', 'c10', 'c12', 'c14', 'c17'],
  '2': ['c1', 'c2', 'c3', 'c5', 'c7', 'c8', 'c9', 'c10', 'c11', 'c13', 'c15', 'c16', 'c17'],
  '3': ['c1', 'c2', 'c3', 'c5', 'c7', 'c8', 'c9', 'c10', 'c12', 'c14', 'c15', 'c16', 'c17'],
  '4': ['c1', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10', 'c12', 'c14', 'c17'],
  '5': ['c1', 'c2', 'c3', 'c4', 'c6', 'c8', 'c9', 'c10', 'c12', 'c14', 'c15', 'c16', 'c17'],
  '6': ['c1', 'c2', 'c3', 'c4', 'c6', 'c8', 'c9', 'c10', 'c11', 'c12', 'c13', 'c14', 'c15', 'c16', 'c17'],
  '7': ['c1', 'c2', 'c3', 'c5', 'c7', 'c10', 'c12', 'c14', 'c17'],
  '8': ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10', 'c11', 'c12', 'c13', 'c14', 'c15', 'c16', 'c17'],
  '9': ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10', 'c12', 'c14', 'c15', 'c16', 'c17'],
  'sp': ['c7', 'c12'],
}

const timer = scene.getTransformNodeById('timer');
const m1 = scene.getMeshById('m1');
const m2 = scene.getMeshById('m2');
const sp = scene.getMeshById('sp');
const s1 = scene.getMeshById('s1');
const s2 = scene.getMeshById('s2');

function changeDigit(mesh: AbstractMesh, type: string) {
  const meshs = mesh.getChildMeshes();
  const names = digitMeshNames[type];
  meshs.forEach((mesh) => {
    if (names.indexOf(mesh.name) > -1) {
      mesh.scaling = new BABYLON.Vector3(1, 1, 1);
    } else {
      mesh.scaling = new BABYLON.Vector3(0, 0, 0);
    }
  });
}

function changeTime(time) {
  const m = Math.floor(time / 60);
  const s = time % 60;

  changeDigit(m1, (Math.floor(m / 10)).toString());
  changeDigit(m2, (m % 10).toString());
  changeDigit(sp, 'sp');
  changeDigit(s1, (Math.floor(s / 10)).toString());
  changeDigit(s2, (s % 10).toString());
}

const greenColor = new BABYLON.Color3(0.274677, 0.799103, 0.132869);
const redColor = new BABYLON.Color3(1, 0.226634, 0.307138);
function changeColor(material: PBRMaterial, color: Color3) {
  material.albedoColor = color;
}

function initWorkTimer() {
  timer.position = new BABYLON.Vector3(-5, -5, 0);
  timer.scaling = new BABYLON.Vector3(0.05, 0.05, 0.05);
  m1.getChildMeshes().forEach((mesh: AbstractMesh) => {
    changeColor(mesh.material as PBRMaterial, greenColor);
  });
  m2.getChildMeshes().forEach((mesh: AbstractMesh) => {
    changeColor(mesh.material as PBRMaterial, greenColor);
  });
  s1.getChildMeshes().forEach((mesh: AbstractMesh) => {
    changeColor(mesh.material as PBRMaterial, greenColor);
  });
  s2.getChildMeshes().forEach((mesh: AbstractMesh) => {
    changeColor(mesh.material as PBRMaterial, greenColor);
  });
}

function initBreakTimer() {
  timer.position = new BABYLON.Vector3(0, 0, 0);
  timer.scaling = new BABYLON.Vector3(0.2, 0.2, 0.2);
  m1.getChildMeshes().forEach((mesh: AbstractMesh) => {
    changeColor(mesh.material as PBRMaterial, redColor);
  });
  m2.getChildMeshes().forEach((mesh: AbstractMesh) => {
    changeColor(mesh.material as PBRMaterial, redColor);
  });
  s1.getChildMeshes().forEach((mesh: AbstractMesh) => {
    changeColor(mesh.material as PBRMaterial, redColor);
  });
  s2.getChildMeshes().forEach((mesh: AbstractMesh) => {
    changeColor(mesh.material as PBRMaterial, redColor);
  });
}

let workTimeCount: number = 0;
let breakTimeCount: number = 0;
async function sleep() {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
}

async function startWork() {
  if (workTimeCount > 0) {
    changeTime(workTimeCount);
    await sleep();
    workTimeCount -= 1;
    await startWork();
  }
  return;
}

async function startBreak() {
  if (breakTimeCount > 0) {
    changeTime(breakTimeCount);
    await sleep();
    breakTimeCount -= 1;
    await startBreak();
  }
  return;
}

export async function start(workTime: number, breakTime: number, handler: (isWorking: boolean) => void) {
  workTimeCount = workTime * 60;
  breakTimeCount = breakTime * 60;

  initWorkTimer();
  handler(true);
  await startWork();

  initBreakTimer();
  handler(false);
  await startBreak();

  start(workTime, breakTime, handler);
}