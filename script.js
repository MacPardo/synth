const keyOffset = {
  'A': 0,
  'W': 1,
  'S': 2,
  'E': 3,
  'D': 4,
  'F': 5,
  'T': 6,
  'G': 7,
  'Y': 8,
  'H': 9,
  'U': 10,
  'J': 11,
  'K': 12,
  'O': 13,
  'L': 14,
  'P': 15,
};

const offsetClass = {
  0: '.c.natural',
  1: '.c.sharp',
  2: '.d.natural',
  3: '.d.sharp',
  4: '.e.natural',
  5: '.f.natural',
  6: '.f.sharp',
  7: '.g.natural',
  8: '.g.sharp',
  9: '.a.natural',
  10: '.a.sharp',
  11: '.b.natural',
  12: '.c.natural.octave',
}

const C0 = 16.35;
var octave = 4;
const noteFrequency = noteOffset => C0 * Math.pow(2, octave + noteOffset / 12);

const oscillatorMap = {};
const audioContext = new AudioContext();

const playNote = (noteOffset) => {
  if (!(noteOffset in oscillatorMap)) {
    const freq = noteFrequency(noteOffset);
    console.log(`freq: ${freq}`);
    const osc = audioContext.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, audioContext.currentTime);
    osc.connect(audioContext.destination);
    osc.start();
    oscillatorMap[noteOffset] = osc;

    document.querySelector(offsetClass[noteOffset]).classList.add('pressed');
  }
}

const stopNote = (noteOffset) => {
  if (noteOffset in oscillatorMap) {
    oscillatorMap[noteOffset].stop();
    delete oscillatorMap[noteOffset];
    document.querySelector(offsetClass[noteOffset]).classList.remove('pressed');
  }
}

document.addEventListener('keydown', (e) => {
  const key = e.key.toUpperCase();
  if (key === 'Z') {
    octave--;
  } else if (key === 'X') {
    octave++;
  } else if (key in keyOffset) {
    playNote(keyOffset[key]);
  }
});

document.addEventListener('keyup', (e) => {
  const key = e.key.toUpperCase();
  if (key in keyOffset) {
    stopNote(keyOffset[key]);
  }
});
