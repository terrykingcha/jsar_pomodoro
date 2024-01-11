
let openHandler: () => void;
let closeHandler: () => void;

spatialDocument.addEventListener('handtracking', (event: any) => {
  console.log('handtracking - ' + event.inputData.Gesture);

  if (event.inputData.Gesture === 1) { // 握拳
    closeHandler?.();
  } else if (event.inputData.Gesture === 2) { // 手掌
    openHandler?.();
  }
});

export function onOpen(handler: () => void) {
  openHandler = handler;
}

export function onClose(handler: () => void) {
  closeHandler = handler;
}