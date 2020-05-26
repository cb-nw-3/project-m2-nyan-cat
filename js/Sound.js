class Sound
{
    constructor(root, source)
    {
        this.sound = root.document.createElement("audio");
        this.sound.src = source;

        this.domElement = document.createElement('img');
        this.sound.style.display = "none";

    }

    play = () => {
        this.sound.play();
    }

}