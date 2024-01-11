const workTimeOptions = [1, 25, 30];
const breakTimeOptons = [0.5, 5, 10];
let workTime: number = workTimeOptions[0];
let breakTime: number = breakTimeOptons[0];

export function chooseWorkTimePre() {
  const index = workTimeOptions.indexOf(workTime);
  if (index === 0) {
    return false;
  } else {
    workTime = workTimeOptions[index - 1];
    return true;
  }
}

export function chooseWorkTimeNext() {
  const index = workTimeOptions.indexOf(workTime);
  if (index === workTimeOptions.length - 1) {
    return false;
  } else {
    workTime = workTimeOptions[index + 1];
    return true;
  }
}

export function isWorkTimeFirstOption() {
  return workTimeOptions.indexOf(workTime) === 0;
}

export function isWorkTimeLastOption() {
  return workTimeOptions.indexOf(workTime) === workTimeOptions.length - 1;
}

export function chooseBreakTimePre() {
  const index = breakTimeOptons.indexOf(breakTime);
  if (index === 0) {
    return false;
  } else {
    breakTime = breakTimeOptons[index - 1];
    return true;
  }
}

export function chooseBreakTimeNext() {
  const index = breakTimeOptons.indexOf(breakTime);
  if (index === breakTimeOptons.length - 1) {
    return false;
  } else {
    breakTime = breakTimeOptons[index + 1];
    return true;
  }
}

export function isBreakTimeFirstOption() {
  return breakTimeOptons.indexOf(breakTime) === 0;
}

export function isBreakTimeLastOption() {
  return breakTimeOptons.indexOf(breakTime) === breakTimeOptons.length - 1;
}

export function getWorkTime() {
  return workTime * 60;
}

export function getBreakTime() {
  return breakTime * 60;
}