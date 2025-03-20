AFRAME.registerComponent("clock", {
  schema: {
  },

  init: function () {
    //Create a new element, set 
    this.titleEl = document.createElement("a-text");
    this.titleEl.setAttribute("position", { x: 1, y: 0, z: 0 });
    this.titleEl.setAttribute("color", "#00ff00");
    this.titleEl.setAttribute("font", "sourcecodepro");
    this.titleEl.setAttribute("value", "Check what time it is somewhere else!");

    this.el.appendChild(this.titleEl);


    //TODO: Use helper functions in timezone.js to display the current time and support converting time zones
    //For implementing interactivity, you may find .addEventListener() useful
    //https://aframe.io/docs/1.2.0/introduction/interactions-and-controllers.html#events

    // Instruction/Time Display
    this.timeDisplay = document.createElement("a-text");
    this.timeDisplay.setAttribute("value", "Click a button to see the time!");
    this.timeDisplay.setAttribute("position", { x: 1, y: -0.4, z: 0 });
    this.timeDisplay.setAttribute("color", "#00ff00");
    this.timeDisplay.setAttribute("font", "sourcecodepro");
    this.el.appendChild(this.timeDisplay);

    // Actually creating the buttons
    this.createButton("Local Time", { x: 1.25, y: -1, z: 0 }, "local");
    this.createButton("New York City", { x: 3.5, y: -1, z: 0 }, "est");
    this.createButton("London", { x: 5.75, y: -1, z: 0 }, "gmt");
  },

  // Creating buttons and their attributes lol
  createButton: function (label, position, timezone) {
    let button = document.createElement("a-plane");
    button.setAttribute("position", position);
    button.setAttribute("width", 2);
    button.setAttribute("height", 0.3);
    button.setAttribute("color", "#00ff00");
    button.setAttribute("class", "clickable");

    // Button Text
    let buttonText = document.createElement("a-text");
    buttonText.setAttribute("value", label);
    buttonText.setAttribute("align", "center");
    buttonText.setAttribute("color", "#ffffff");
    buttonText.setAttribute("font", "sourcecodepro")

    button.appendChild(buttonText);
    this.el.appendChild(button);

    // Add Click Event Listener
    button.addEventListener("click", () => {
      let now = spacetime.now();
      let timeString;
      if (timezone === "local") {
        timeString = displayTime(now);
      } else if (timezone === "est") {
        timeString = displayTime(convertTimeZone(now, "New York"));
      } else if (timezone === "gmt") {
        timeString = displayTime(convertTimeZone(now, "GMT"));
      }
      this.timeDisplay.setAttribute("value", `Time: ${timeString}`);
    });
  },

  tick: function () {
  },
});

var now = spacetime.now();

console.log("It is currently " + displayTime(now) + " locally");
console.log(
  "It is currently " +
    displayTime(convertTimeZone(now, "London")) +
    " in London"
);
console.log(
  "2:42pm in local time is " +
    displayTime(convertTimeZone(getTime("2:42pm"), "Hawaii")) +
    " in Hawaii"
);
