import * as menu from './menu';
import * as setting from './setting';
import * as timer from './timer';
import * as breakbg from './breakbg';
import * as hand from './hand';
import * as audio from './audio';
import * as res from './res';

spatialDocument.watchInputEvent();

const titleMenuItem = menu.createMenuItem('titleMenuItem', res.titleTexture, {
  width: 700,
  height: 210,
  left: 150,
  top: 150
});

const settingWorkTimeTitleMenuItem = menu.createMenuItem('settingWorkTimeTitleMenuItem', res.settingWorkTimeTexture, {
  width: 500,
  height: 125,
  left: 250,
  top: 200
});

const settingBreakTimeTitleMenuItem = menu.createMenuItem('settingBreakTimeTitleMenuItem', res.settingBreakTimeTexture, {
  width: 500,
  height: 125,
  left: 250,
  top: 200
});

const tipsMenuItem = menu.createMenuItem('tipsMenuItem', res.tipsTexture, {
  width: 700,
  height: 58,
  left: 150,
  top: 800
});

const startMenuBtn = menu.createMenuButton('startMenuBtn', res.startBtnTexture, {
  width: 300,
  height: 150,
  left: 150,
  top: 600
});

const settingMenuBtn = menu.createMenuButton('settingMenuBtn', res.settingBtnTexture, {
  width: 300,
  height: 150,
  left: 550,
  top: 600
});

const prevSettingMenuBtn = menu.createMenuButton('prevSettingMenuBtn', res.prevSettingTexture, {
  width: 300,
  height: 150,
  left: 550,
  top: 600
});

const nextSettingMenuBtn = menu.createMenuButton('nextSettingMenuBtn', res.nextSettingTexture, {
  width: 300,
  height: 150,
  left: 550,
  top: 600
});

const workTimeChoosePrevBtn = menu.createMenuButton('workTimeChoosePrevBtn', res.prevOptionTexture, {
  width: 100,
  height: 200,
  left: 120,
  top: 160
});

const workTimeChooseNextBtn = menu.createMenuButton('workTimeChooseNextBtn', res.nextOptionTexture, {
  width: 100,
  height: 200,
  left: 800,
  top: 160
});

const breakTimeChoosePrevBtn = menu.createMenuButton('breakTimeChoosePrevBtn', res.prevOptionTexture, {
  width: 100,
  height: 200,
  left: 120,
  top: 160
});

const breakTimeChooseNextBtn = menu.createMenuButton('breakTimeChooseNextBtn', res.nextOptionTexture, {
  width: 100,
  height: 200,
  left: 800,
  top: 160
});

function hideAllMenuItem() {
  titleMenuItem.hide();
  tipsMenuItem.hide();
  settingWorkTimeTitleMenuItem.hide();
  settingBreakTimeTitleMenuItem.hide();
  startMenuBtn.hide();
  settingMenuBtn.hide();
  nextSettingMenuBtn.hide();
  prevSettingMenuBtn.hide();
  workTimeChoosePrevBtn.hide();
  workTimeChooseNextBtn.hide();
  breakTimeChoosePrevBtn.hide();
  breakTimeChooseNextBtn.hide();
}

let randomTimerId: number = null;
function startRandomTimer() {
  timer.init();
  randomTimerId = setInterval(() => {
    const random = Math.floor(Math.random() * 3600);
    timer.change(random, 'work');
  }, 300);
}

function stopRandomTimer() {
  if (randomTimerId !== null) {
    clearInterval(randomTimerId);
    randomTimerId = null;
  }
}

function Main() {
  hideAllMenuItem();
  titleMenuItem.show();
  startMenuBtn.show();
  settingMenuBtn.show();
  tipsMenuItem.show();

  startRandomTimer();
}

function SettingWithWorkTime() {
  hideAllMenuItem();
  tipsMenuItem.show();
  startMenuBtn.show();
  settingWorkTimeTitleMenuItem.show();
  nextSettingMenuBtn.show();
  workTimeChooseNextBtn.show();

  stopRandomTimer();
  timer.change(setting.getWorkTime(), 'work');
}

function SettingWithBreakTime() {
  hideAllMenuItem();
  tipsMenuItem.show();
  startMenuBtn.show();
  settingBreakTimeTitleMenuItem.show();
  prevSettingMenuBtn.show();
  breakTimeChooseNextBtn.show();

  stopRandomTimer();
  timer.change(setting.getBreakTime(), 'break');
}

function Start() {
  hideAllMenuItem();
  stopRandomTimer();

  let bgAudio: HTMLAudioElement;
  audio.bg.then(play => bgAudio = play(0, true));

  timer.start(
    setting.getWorkTime(),
    setting.getBreakTime(),
    (isWorking: boolean) => {
      if (isWorking) {
        if (bgAudio) {
          bgAudio.volume = 0;
        }
        breakbg.hide();
      } else {
        if (bgAudio) {
          bgAudio.currentTime = 0;
          bgAudio.volume = 0.5;
        }
        breakbg.show();
      }
    }
  );

  hand.onOpen(() => {
    timer.beBigger();
  });

  hand.onClose(() => {
    timer.beSmaller();
  });
}

Main();

startMenuBtn.onClick(Start);
settingMenuBtn.onClick(SettingWithWorkTime);

function checkWorkTime() {
  if (setting.isWorkTimeFirstOption()) {
    workTimeChoosePrevBtn.hide();
  } else {
    workTimeChoosePrevBtn.show();
  }

  if (setting.isWorkTimeLastOption()) {
    workTimeChooseNextBtn.hide();
  } else {
    workTimeChooseNextBtn.show();
  }

  timer.change(setting.getWorkTime(), 'work');
}

workTimeChoosePrevBtn.onClick(() => {
  setting.chooseWorkTimePre();
  checkWorkTime();
});

workTimeChooseNextBtn.onClick(() => {
  setting.chooseWorkTimeNext();
  checkWorkTime();
});

function checkBreakTime() {
  if (setting.isBreakTimeFirstOption()) {
    breakTimeChoosePrevBtn.hide();
  } else {
    breakTimeChoosePrevBtn.show();
  }

  if (setting.isBreakTimeLastOption()) {
    breakTimeChooseNextBtn.hide();
  } else {
    breakTimeChooseNextBtn.show();
  }

  timer.change(setting.getBreakTime(), 'break');
}

breakTimeChoosePrevBtn.onClick(() => {
  setting.chooseBreakTimePre();
  checkBreakTime();
});

breakTimeChooseNextBtn.onClick(() => {
  setting.chooseBreakTimeNext();
  checkBreakTime();
});

nextSettingMenuBtn.onClick(SettingWithBreakTime);
prevSettingMenuBtn.onClick(SettingWithWorkTime);


