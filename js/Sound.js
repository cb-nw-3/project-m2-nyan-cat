class Sound
{
    constructor(root, source)
    {
    
        this.source = source;
        this.sound = document.createElement("audio");
        this.sound.src = source[0];

        this.sound.style.display = "none";
        root.appendChild(this.sound);

    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }
      

    play = () => {
        this.sound.pause();

        console.log (this.source);
        let sounds_without = this.source.filter((sound) => 
        {
            if (sound !== this.sound.src)
            {
                return 1;
            }
            else
            {
                return -1;
            }

        })
        console.log (sounds_without);

        let randomSoundArrayElement = this.getRandomInt(sounds_without.length);
        this.sound.src = sounds_without[randomSoundArrayElement];

        this.sound.play();
    }

    setVolume =(level) => {

        this.sound.volume = level;

    }

    setPlayBackSpeed = (speed) =>
    {
        this.sound.playbackRate = speed;
    }

}