import * as ui from './ui';
import * as timer from './timer';
import * as breakbg from './breakbg';

ui.onStart(() => {
  timer.start(ui.workTime, ui.breakTime,  isWorking => {
    if (isWorking) {
      breakbg.hide();
    } else {
      breakbg.show();
    }
  });
});