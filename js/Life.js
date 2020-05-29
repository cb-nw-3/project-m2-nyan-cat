// There will only be one instance of this class. This instance will contain the
// data and methods related to the burger that moves at the bottom of your screen
class Life {
  // The constructor takes one parameter. This parameter refers to the parent DOM node.
  // We will be adding a DOM element to this parent DOM node.
  constructor(root, life_number) {
    // The x position starts off in the middle of the screen. Since this data is needed every time we move the player, we
    // store the data in a property of the instance. It represents the distance from the left margin of the browsing area to
    // the leftmost x position of the image.
    this.x = GAME_WIDTH - (LIFE_ICON_WIDTH * life_number * 1.3) - 20;

    // The y position never changes, so we don't need to store it in a property. It represents the y position of the top of the
    // hamburger. The y position is the distance from the top margin of the browsing area.
    const y = 0 + LIFE_ICON_HEIGHT + 10;

    this.top = y;
    this.bottom = y + LIFE_ICON_WIDTH;

    // We create a DOM node. We will be updating the DOM node every time we move the player, so we store a reference to the
    // DOM node in a property.
    this.domElement = document.createElement('img');
    this.domElement.src = 'images/player.png';
    this.domElement.style.position = 'absolute';
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = ` ${y}px`;
    this.domElement.style.width = LIFE_ICON_HEIGHT;
    this.domElement.style.height = LIFE_ICON_WIDTH;



    this.domElement.style.zIndex = '20';
    root.appendChild(this.domElement);
  }

}
