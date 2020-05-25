// This class is not used in the project yet.
let idCount = 1;

class Text {
  // The constructor has three parameters. Here is an example of how you would create
  // an instance of this class
  constructor(root, xPos, yPos) {
    // We create a DOM element, set its CSS attributes then append it to the parent DOM element. We also
    // set the \`domElement\` property of the instance to the newly created DOM element so we can update it later
    const div = document.createElement("div");

    //using CSS for this, left xPos, and yPox
    // div.style.left = xPos;
    // div.style.top = yPos;

    // div.style.color = "white";
    div.style.zIndex = 2000;
    div.id = `text-${idCount}`;
    idCount++;

    root.appendChild(div);

    this.domElement = div;
  }

  // This method is used to update the text displayed in the DOM element
  update(txt) {
    this.domElement.innerText = txt;
  }
}
