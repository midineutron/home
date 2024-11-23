import * as Tone from 'tone';

class AudioManager {
  audioSrc: string;
  analyser: Tone.Analyser | null;
  player: Tone.Player| null;
  audioBuffer: Tone.ToneAudioBuffer | null;
  constructor(audioSrc: string) {
    this.audioSrc = audioSrc;
    this.analyser = null;
    this.player = null;
    this.audioBuffer = null;
  }

  // Setup function for audio (loading, connecting analyser, etc.)
  async setup() {
    await Tone.start(); // Unlock audio context
    this.audioBuffer = new Tone.ToneAudioBuffer(this.audioSrc, async (audioBuffer) => {
      this.player = new Tone.Player(audioBuffer)
        .toDestination();

      this.player.loop = true;
      this.player.autostart = false;

      this.analyser = new Tone.Analyser('fft', 512); // Set up FFT analyser
      this.player.connect(this.analyser); // Connect the player to the analyser
      
      const loopEnd = 167; // Length of the audio (in seconds)
      Tone.getTransport().loopEnd = `${loopEnd}`; // Set the loop end point to match the audio length
      Tone.getTransport().loop = true; // Enable looping
      
      this.player.sync().start(0);
      Tone.getTransport().start();
    });
  }

  // Start the audio and transport
  startAudio() {
    Tone.loaded().then(() => {
      if (this.player) {
        Tone.getTransport().start();
      }
    });
  }

  // Stop the audio and transport
  stopAudio() {
    Tone.getTransport().pause();
  }

  // Reset the audio (if needed)
  resetAudio() {
    this.stopAudio();
    // this.player.stop(); // Reset player state
    Tone.getTransport().position = 0; // Reset the transport to the beginning
  }

  // Get the current frequency data from the analyser
  getFrequencyData() {
    if (this.analyser) return this.analyser.getValue();
    else -1;
  }
}

export default AudioManager;