async function createAudioPlayer(name: string) {
  const arrayBuffer = await import(`../resources/${name}`);
  const blob = new Blob([arrayBuffer], { type: 'audio/mpeg' });
  const objectUrl = URL.createObjectURL(blob);

  return (volume: number = 1, loop: boolean = false) => {
    const audio = new Audio(objectUrl);
    audio.autoplay = false;
    audio.volume = volume;
    audio.loop = loop;
    audio.play();
    return audio;
  }
}

export const bg = createAudioPlayer('bg.mp3');

export const click = createAudioPlayer('click.wav');

export const hover = createAudioPlayer('hover.wav');