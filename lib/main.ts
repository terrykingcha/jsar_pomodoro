import * as ui from './ui';
import * as timer from './timer';
import * as breakbg from './breakbg';

ui.onStart((workTime: number, breakTime: number) => {
  timer.start(workTime, breakTime,  isWorking => {
    if (isWorking) {
      breakbg.hide();
    } else {
      breakbg.show();
    }
  });
});