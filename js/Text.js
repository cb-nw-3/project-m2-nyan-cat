// This class is not used in the project yet.
class Text {
  // The constructor has three parameters. Here is an example of how you would create
  // an instance of this class
  constructor(root, xPos, yPos, flashingText = false) {
    // We create a DOM element, set its CSS attributes then append it to the parent DOM element. We also
    // set the \`domElement\` property of the instance to the newly created DOM element so we can update it later
    const div = document.createElement('div');

    div.style.position = 'absolute';
    div.style.left = xPos;
    div.style.top = yPos;
    div.style.color = 'white';
    div.style.font = 'bold 30px Impact';
    div.style.zIndex = 2000;
    this.flashingText = flashingText;
    root.appendChild(div);

    this.domElement = div;

    if (flashingText === true) 
    {
      let flashing = setInterval(() => { 
        
        if (this.domElement.style.color === 'white')
        {
          this.domElement.style.color = 'red';
        } else if (this.domElement.style.color === 'red')
        {
          this.domElement.style.color = 'white';
        }
      
      }, 200);    
    }
  }

  // This method is used to update the text displayed in the DOM element
  update(txt) {
    this.domElement.innerText = txt;
  }
}
