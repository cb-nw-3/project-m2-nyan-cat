class ResetButton{

    constructor (root, newYpos)
    {

        this.internalButton = document.createElement('button');
        this.internalButton.innerText = "Click to Play Again!";
        this.internalButton.style.backgroundColor = "hotPink";
        this.internalButton.style.color = "white";
    
        this.yPos = newYpos;
        this.internalButton.style.position = 'absolute';
        this.internalButton.style.left = `${GAME_WIDTH/2-75}px`;
    
        this.internalButton.style.top = `${newYpos+20}px`;
        this.internalButton.style.font = `bold 20px Impact`;
        this.internalButton.style.padding = '10px';
        this.internalButton.style.borderRadius =  "9px";
        this.internalButton.style.border =  "0px";
    
        this.internalButton.style.zIndex = '40';
        this.internalButton.id = 'helloDave';
        this.internalButton.addEventListener('click', ()=> {this.resetGame()});
        this.internalButton.style.visibility = 'hidden';
        root.appendChild(this.internalButton);

    }



}