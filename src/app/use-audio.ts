import { Howl } from "howler";

const clickSound = new Howl({
  src: ["/assets/click.mp3"],
  volume: 1,
  rate: 1,
});

const playClickSound = () => {
  clickSound.play();
};

export default playClickSound;