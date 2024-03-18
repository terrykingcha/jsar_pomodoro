import { createRawTexture } from './createRawTexture';
import * as audio from './audio';

const scene = spatialDocument.scene;
const gui = spaceDocument.getSpatialObjectById('gui').shadowRoot;

const guiMesh = scene.getMeshById('gui');
setTimeout(() => {
  guiMesh.scaling = new BABYLON.Vector3(102.5, 102.5, 102.5);
}, 0);

const menu = scene.getTransformNodeById('menu');
menu.scaling = new BABYLON.Vector3(1, 1, 1);

const frameRate = 60;

class MenuItem {
  protected mesh: BABYLON.Mesh;
  protected text: HTMLDivElement;
  protected textFont: number;
  protected isShown: boolean;

  constructor (mesh: BABYLON.Mesh, text: HTMLDivElement) {
    this.mesh = mesh;
    if (text) {
      this.text = text;
      this.textFont = parseInt(text?.style.fontSize ?? '0');
    }
    this.hide();
  }

  public show() {
    this.mesh.scaling = new BABYLON.Vector3(1, 1, 1);
    if (this.text) {
      this.text.style.fontSize = `${this.textFont}px`;
    }
    this.isShown = true;
  }

  public hide() {
    this.mesh.scaling = new BABYLON.Vector3(0, 0, 0);
    if (this.text) {
      this.text.style.fontSize = '0px';
    }
    this.isShown = false;
  }
}

class MenuButton extends MenuItem {

  constructor (mesh: BABYLON.Mesh, text: HTMLDivElement) {
    super(mesh, text);
    this.onHover(() => {
      audio.hover.then(play => play());
    });

    this.onClick(() => {
      audio.click.then(play => play());
    });
  }

  public onHover(cb: (isHover: boolean) => void) {
    let isHover = false;

    this.text.addEventListener('mouseenter', () => {
      if (!this.isShown) {
        return;
      }

      if (isHover) {
        return;
      }

      isHover = true;

      scene.beginAnimation(this.mesh, 0, frameRate * 0.3, false, 1, () => {
        cb(true);
      });
    });

    this.text.addEventListener('mouseleave', () => {
      if (!this.isShown) {
        return;
      }

      if (!isHover) {
        return;
      }

      isHover = false;

      scene.beginAnimation(this.mesh, frameRate * 0.3, 0, false, 1);
    });

    return this;
  }

  public onClick(cb: () => void) {
    let isStartClick = false;
  
    this.text.addEventListener('mousedown', () => {
      if (!this.isShown) {
        return;
      }

      isStartClick = true;
    });
  
    this.text.addEventListener('mouseup', () => {
      if (!this.isShown) {
        return;
      }
      
      if (isStartClick) {
        cb();
      }
      isStartClick = false;
    });

    return this;
  }
}

interface CreateOptions {
  width: number;
  height: number;
  left: number;
  top: number;
  fontSize?: number;
  color?: string;
}

function createAnimations() {
  const btnScalingAnim = new BABYLON.Animation(
    'btn-scaling',
    'scaling',
    frameRate,
    BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
    BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE
  );

  btnScalingAnim.setKeys([
    {
      frame: 0,
      value: new BABYLON.Vector3(1, 1, 1),
    },
    {
      frame: frameRate * 0.3,
      value: new BABYLON.Vector3(1.1, 1.1, 1.1),
    }
  ]);

  return [btnScalingAnim];
}



let nodeZ = 0.000001;
function createNode(name: string, texture: ArrayBuffer | string, {
  width, height, left, top, fontSize, color,
}: CreateOptions): [BABYLON.Mesh, HTMLDivElement] {
  const img = BABYLON.MeshBuilder.CreatePlane(name, {
    width: width / 10,
    height: height / 10,
    sideOrientation: BABYLON.Mesh.DOUBLESIDE,
    frontUVs: new BABYLON.Vector4(1, 1, 0, 0),
    backUVs: new BABYLON.Vector4(1, 1, 0, 0),
  });

  const x = 50 - (left + width / 2) / 10;
  const y = 50 - (top + height / 2) / 10;

  img.position.x = x;
  img.position.y = y;
  img.position.z = nodeZ;

  nodeZ += 0.000001;

  
  const mat = new BABYLON.StandardMaterial(`${name}-mat`, scene);
  mat.transparencyMode = BABYLON.Material.MATERIAL_ALPHATESTANDBLEND;
  mat.alphaMode = BABYLON.Engine.ALPHA_COMBINE;
  mat.alphaCutOff = 0;

  if (typeof texture === 'string') {
    mat.diffuseTexture = new BABYLON.Texture(texture, scene);
  } else {
    createRawTexture(texture).then((rawTexture) => {
      mat.diffuseTexture = rawTexture;
    });
  }

  img.material = mat;
  img.setParent(menu, true, true);


  const [text] = gui.querySelectorAll(`.${name}`) as unknown as HTMLDivElement[];
  if (text) {
    text.style.cssText = `position: absolute; width: ${width}px; height: ${height}px; color: ${color}; font-size: ${fontSize}px; margin-left: ${left}px; margin-top:${top}px;`;
  }

  return [img, text];
}

export function createMenuItem(name: string, texture: ArrayBuffer | string, options: CreateOptions) {
  const [img, text] = createNode(name, texture, options);
  return new MenuItem(img, text);
}

export function createMenuButton(name: string, texture: ArrayBuffer | string, options: CreateOptions) {

  const [img, text] = createNode(name, texture, options);

  const animations = createAnimations();
  img.animations.push(...animations);
  
  return new MenuButton(img, text);
}