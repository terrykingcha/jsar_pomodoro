import { AbstractMesh, Color3, PBRMaterial } from "babylonjs";

const scene = spatialDocument.scene;

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

const frameRate = 60;

const greenColor = new BABYLON.Color3(0.239216, 0.882353, 0.513726);
const redColor = new BABYLON.Color3(1, 0.226634, 0.307138);

let biggerOrSmaller: 'bigger' | 'smaller' = 'bigger';
let workTimeCount: number = 0;
let breakTimeCount: number = 0;

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

function changeTime(time: number) {
  const m = Math.floor(time / 60);
  const s = time % 60;

  changeDigit(m1, (Math.floor(m / 10)).toString());
  changeDigit(m2, (m % 10).toString());
  changeDigit(sp, 'sp');
  changeDigit(s1, (Math.floor(s / 10)).toString());
  changeDigit(s2, (s % 10).toString());
}

function changeColor(color: Color3) {
  m1.getChildMeshes().forEach((mesh: AbstractMesh) => {
    const mat: PBRMaterial = mesh.material as PBRMaterial;    
    mat.albedoTexture = null;
    mat.albedoColor = color;
    mat.ambientColor = color;
    mat.emissiveColor = color;
  });

  m2.getChildMeshes().forEach((mesh: AbstractMesh) => {
    const mat: PBRMaterial = mesh.material as PBRMaterial;
    mat.albedoTexture = null;
    mat.albedoColor = color;
  });
  sp.getChildMeshes().forEach((mesh: AbstractMesh) => {
    const mat: PBRMaterial = mesh.material as PBRMaterial;
    mat.albedoTexture = null;
    mat.albedoColor = color;
  });
  s1.getChildMeshes().forEach((mesh: AbstractMesh) => {
    const mat: PBRMaterial = mesh.material as PBRMaterial;
    mat.albedoTexture = null;
    mat.albedoColor = color;
  });
  s2.getChildMeshes().forEach((mesh: AbstractMesh) => {
    const mat: PBRMaterial = mesh.material as PBRMaterial;
    mat.albedoTexture = null;
    mat.albedoColor = color;
  });
}

function initAnimation() {
  const scalingAnimation = new BABYLON.Animation(
    'scalingAnimation',
    'scaling',
    frameRate,
    BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
    BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE
  );
  
  scalingAnimation.setKeys([
    {
      frame: 0,
      value: new BABYLON.Vector3(1, 1, 1)
    },
    {
      frame: frameRate * 0.3,
      value: new BABYLON.Vector3(0.05, 0.05, 0.05)
    }
  ]);
  
  const offsetAnimation = new BABYLON.Animation(
    'offsetAnimation',
    'position',
    frameRate,
    BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
    BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE
  );
  
  offsetAnimation.setKeys([
    {
      frame: 0,
      value: new BABYLON.Vector3(-2.5, 0, -10)
    },
    {
      frame: frameRate * 0.3,
      value: new BABYLON.Vector3(-10, -5, 0)
    }
  ]);
  
  timer.animations = [scalingAnimation, offsetAnimation];
}

function initWorkTimer() {
  beSmaller();
  changeColor(greenColor);
}

function initBreakTimer() {
  beBigger();
  changeColor(redColor);
}

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

export function change(time: number, type: 'work' | 'break') {
  changeTime(time);
  changeColor(type === 'work' ? greenColor : redColor);
}

export function init() {
  initAnimation();
  // change(0, 'work');
}

export function beBigger() {
  if (biggerOrSmaller === 'bigger') {
    return;
  }

  biggerOrSmaller = 'bigger';
  scene.beginAnimation(timer, frameRate * 0.3, 0, false, 1);
}

export function beSmaller() {
  if (biggerOrSmaller === 'smaller') {
    return;
  }

  biggerOrSmaller = 'smaller';
  scene.beginAnimation(timer, 0, frameRate * 0.3, false, 1);
}

export async function start(workTime: number, breakTime: number, handler: (isWorking: boolean) => void) {
  workTimeCount = workTime;
  breakTimeCount = breakTime;

  initWorkTimer();
  handler(true);
  await startWork();

  initBreakTimer();
  handler(false);
  await startBreak();

  start(workTime, breakTime, handler);
}