
class SpaceBackground
{
    constructor (root)
    {
        this.spaceBackgroundYPos = 0;
        this.spaceBackground = document.createElement('div');
        this.spaceBackground.style.backgroundImage = `url('images/space999.png')`;
        this.spaceBackground.style.height = `${GAME_HEIGHT}px`;
        this.spaceBackground.style.width = `${GAME_WIDTH}px`;
        this.spaceBackground.style.position = 'absolute';
        root.appendChild(this.spaceBackground);
    
    
    
        this.starsparalaxYPos = 0;
        this.starsparalax = document.createElement('div');
        this.starsparalax.style.backgroundImage = `url('images/bigger_stars.png')`;
        this.starsparalax.style.height = `${GAME_HEIGHT}px`;
        this.starsparalax.style.width = `${GAME_WIDTH}px`;
        this.starsparalax.style.position = 'absolute';
    
        this.starsparalax.style.webkitFilter = "blur(2px)";
    
        root.appendChild(this.starsparalax);
    
        this.starsparalax2YPos = 0;
        this.starsparalax2 = document.createElement('div');
        this.starsparalax2.style.backgroundImage = `url('images/smaller_stars.png')`;
        this.starsparalax2.style.height = `${GAME_HEIGHT}px`;
        this.starsparalax2.style.width = `${GAME_WIDTH}px`;
        this.starsparalax2.style.position = 'absolute';
        root.appendChild(this.starsparalax2);
    }

    moveDownSpaceBackgrouds = (timeDiff) => {

        this.spaceBackgroundYPos = this.spaceBackgroundYPos + timeDiff * 0.1;
        this.spaceBackground.style.backgroundPositionY = `${this.spaceBackgroundYPos}px`;
    
    
        this.starsparalaxYPos = this.starsparalaxYPos + timeDiff * 0.15;
        this.starsparalax.style.backgroundPositionY = `${this.starsparalaxYPos}px`;
    
    
        this.starsparalax2YPos = this.starsparalax2YPos + timeDiff * 0.3;
        this.starsparalax2.style.backgroundPositionY = `${this.starsparalax2YPos}px`;
    

    }


}