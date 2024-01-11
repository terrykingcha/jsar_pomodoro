import * as menu from './menu';
import * as setting from './setting';
import * as timer from './timer';
import * as breakbg from './breakbg';
import * as hand from './hand';
import * as res from './res';

spatialDocument.watchInputEvent();

const titleMenuItem = menu.createMenuItem('titleMenuItem', res.titleImg, {
  width: 500,
  height: 150,
  left: 250,
  top: 150
});

const settingWorkTimeTitleMenuItem = menu.createMenuItem('settingWorkTimeTitleMenuItem', res.settingWorkTimeTitleImg, {
  width: 400,
  height: 100,
  left: 300,
  top: 200,
  fontSize: 40,
  color: 'white',
});

const settingBreakTimeTitleMenuItem = menu.createMenuItem('settingBreakTimeTitleMenuItem', res.settingBreakTimeTitleImg, {
  width: 400,
  height: 100,
  left: 300,
  top: 200,
  fontSize: 40,
  color: 'white',
});

const startMenuBtn = menu.createMenuButton('startMenuBtn', res.startBtnImg, {
  width: 150,
  height: 75,
  left: 250,
  top: 700
});

const settingMenuBtn = menu.createMenuButton('settingMenuBtn', res.settingBtnImg, {
  width: 150,
  height: 75,
  left: 650,
  top: 700
});

const prevSettingMenuBtn = menu.createMenuButton('prevSettingMenuBtn', res.prevSettingImg, {
  width: 150,
  height: 75,
  left: 650,
  top: 700
});

const nextSettingMenuBtn = menu.createMenuButton('nextSettingMenuBtn', res.nextSettingImg, {
  width: 150,
  height: 75,
  left: 650,
  top: 700
});

const workTimeChoosePrevBtn = menu.createMenuButton('workTimeChoosePrevBtn', res.prevOptionImg, {
  width: 60,
  height: 180,
  left: 50,
  top: 420
});

const workTimeChooseNextBtn = menu.createMenuButton('workTimeChooseNextBtn', res.nextOptionImg, {
  width: 60,
  height: 180,
  left: 900,
  top: 420
});

const breakTimeChoosePrevBtn = menu.createMenuButton('breakTimeChoosePrevBtn', res.prevOptionImg, {
  width: 60,
  height: 180,
  left: 50,
  top: 420
});

const breakTimeChooseNextBtn = menu.createMenuButton('breakTimeChooseNextBtn', res.nextOptionImg, {
  width: 60,
  height: 180,
  left: 900,
  top: 420
});

function hideAllMenuItem() {
  titleMenuItem.hide();
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

  startRandomTimer();
}

function SettingWithWorkTime() {
  hideAllMenuItem();
  startMenuBtn.show();
  settingWorkTimeTitleMenuItem.show();
  nextSettingMenuBtn.show();
  workTimeChooseNextBtn.show();

  stopRandomTimer();
  timer.change(setting.getWorkTime(), 'work');
}

function SettingWithBreakTime() {
  hideAllMenuItem();
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

  timer.start(
    setting.getWorkTime(),
    setting.getBreakTime(),
    (isWorking: boolean) => {
      if (isWorking) {
        breakbg.hide();
      } else {
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


