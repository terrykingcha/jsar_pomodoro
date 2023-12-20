export let workTime = 1;
export let breakTime = 0.5;

let startHandler;
export function onStart(cb) {
  startHandler = cb;
}

function onHover(el: HTMLElement, cb: (isHover: boolean) => void) {
  el.addEventListener('mouseenter', () => {
    cb(true);
  });
  el.addEventListener('mouseleave', () => {
    cb(false);
  });
}

function onClick(el: HTMLElement, cb: () => void) {
  let interval = 3000;
  let timeId: number;
  el.addEventListener('mouseenter', () => {
    timeId = setTimeout(cb, interval);
  });
  el.addEventListener('mouseleave', () => {
    clearTimeout(timeId);
  });
}

const scene = spaceDocument.scene;
const gui = spatialDocument.getSpatialObjectById('gui').shadowRoot;

const settingList = gui.querySelectorAll('.setting');

const settingStyle = `
  display: flex;
  flex-direction: column;
  align-items: center;
`;

settingList.forEach((setting: HTMLDivElement) => {
  setting.style.cssText = settingStyle;
});

const titleList = gui.querySelectorAll('.title');

const titleStyle = `
  width: 100%;
  height: 100px;
  font-size: 50px; 
`;

titleList.forEach((title: HTMLDivElement) => {
  title.style.cssText = titleStyle;
});

const buttonStyle = `
  width: 300px;
  height: 60px;
  font-size: 40px;
  border: 2px solid #000;
  margin-bottom: 20px;
`;

const activeButtonStyle = `
  width: 300px;
  height: 60px;
  font-size: 40px;
  border: 2px solid rgb(0, 181, 120);
  margin-bottom: 20px;
  background-color: rgb(0, 181, 120);
  color: white;
`;

const hoverButtonStyle = `
  width: 300px;
  height: 60px;
  font-size: 40px;
  border: 4px solid rgb(0, 181, 120);
  margin-bottom: 20px;
`;

const [work30Button] = (gui.querySelectorAll('.work_30') as unknown) as HTMLDivElement[];
const [work45Button] = (gui.querySelectorAll('.work_45') as unknown) as HTMLDivElement[];
const [work60Button] = (gui.querySelectorAll('.work_60') as unknown) as HTMLDivElement[];
const [break5Button] = (gui.querySelectorAll('.break_5') as unknown) as HTMLDivElement[];
const [break10Button] = (gui.querySelectorAll('.break_10') as unknown) as HTMLDivElement[];
const [break15Button] = (gui.querySelectorAll('.break_15') as unknown) as HTMLDivElement[];

work30Button.style.cssText = activeButtonStyle;
work45Button.style.cssText = buttonStyle;
work60Button.style.cssText = buttonStyle;
break5Button.style.cssText = activeButtonStyle;
break10Button.style.cssText = buttonStyle;
break15Button.style.cssText = buttonStyle;

onHover(work30Button, (isHover) => {
  if (workTime === 1) return;
  work30Button.style.cssText = isHover ? hoverButtonStyle : buttonStyle;
});

onHover(work45Button, (isHover) => {
  if (workTime === 25) return;
  work45Button.style.cssText = isHover ? hoverButtonStyle : buttonStyle;
});

onHover(work60Button, (isHover) => {
  if (workTime === 30) return;
  work60Button.style.cssText = isHover ? hoverButtonStyle : buttonStyle;
});

onHover(break5Button, (isHover) => {
  if (breakTime === 0.5) return;
  break5Button.style.cssText = isHover ? hoverButtonStyle : buttonStyle;
});

onHover(break10Button, (isHover) => {
  if (breakTime === 5) return;
  break10Button.style.cssText = isHover ? hoverButtonStyle : buttonStyle;
});

onHover(break15Button, (isHover) => {
  if (breakTime === 10) return;
  break15Button.style.cssText = isHover ? hoverButtonStyle : buttonStyle;
});

onClick(work30Button, () => {
  if (workTime === 1) return; 
  workTime = 1;
  work30Button.style.cssText = activeButtonStyle;
  work45Button.style.cssText = buttonStyle;
  work60Button.style.cssText = buttonStyle;
});

onClick(work45Button, () => {
  if (workTime === 25) return; 
  workTime = 25;
  work30Button.style.cssText = buttonStyle;
  work45Button.style.cssText = activeButtonStyle;
  work60Button.style.cssText = buttonStyle;
});

onClick(work60Button, () => {
  if (workTime === 30) return; 
  workTime = 30;
  work30Button.style.cssText = buttonStyle;
  work45Button.style.cssText = buttonStyle;
  work60Button.style.cssText = activeButtonStyle;
});

onClick(break5Button, () => {
  if (breakTime === 0.5) return; 
  breakTime = 0.5;
  break5Button.style.cssText = activeButtonStyle;
  break10Button.style.cssText = buttonStyle;
  break15Button.style.cssText = buttonStyle;
});

onClick(break10Button, () => {
  if (breakTime === 5) return; 
  breakTime = 5;
  break5Button.style.cssText = buttonStyle;
  break10Button.style.cssText = activeButtonStyle;
  break15Button.style.cssText = buttonStyle;
});

onClick(break15Button, () => {
  if (breakTime === 10) return; 
  breakTime = 10;
  break5Button.style.cssText = buttonStyle;
  break10Button.style.cssText = buttonStyle;
  break15Button.style.cssText = activeButtonStyle;
});


const [submitButton] = (gui.querySelectorAll('.submit') as unknown) as HTMLDivElement[];

const submitButtonStyle = `
  width: 400px;
  height: 100px;
  background-color: rgb(22, 119, 255);
  font-size: 70px;
  color: white;
  border-radius: 10px;
`;

const submitButtonHoverStyle = `
  width: 420px;
  height: 105px;
  background-color: rgb(22, 119, 255);
  font-size: 74px;
  color: white;
  border-radius: 10px;
`;

submitButton.style.cssText = submitButtonStyle;

onHover(submitButton, (isHover) => {
  submitButton.style.cssText = isHover ? submitButtonHoverStyle : submitButtonStyle;
});

const guiMesh = scene.getMeshById('gui');
onClick(submitButton, () => {
  if (startHandler) {
    guiMesh.scaling = new BABYLON.Vector3(0, 0, 0);
    startHandler();
  }
});

spatialDocument.watchInputEvent();