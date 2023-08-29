const optionsButtons = document.querySelectorAll(".option-button");
const advancedOptionButton = document.querySelectorAll(".adv-option-button");
const fontName = document.getElementById("fontName");
const fontSizeRef = document.getElementById("fontSize");
const writingArea = document.getElementById("text-input");
const linkButton = document.getElementById("createLink");
const unlinkButton = document.getElementById("unlink");
const alignButtons = document.querySelectorAll(".align");
const spacingButtons = document.querySelectorAll(".spacing");
const formatButtons = document.querySelectorAll(".format");
const scriptButtons = document.querySelectorAll(".script");

const fontList = [
  "Arial",
  "Verdana",
  "Times New Roman",
  "Garamond",
  "Georgia",
  "Courier New",
  "cursive",
];

// Initial Settings

const initializer = () => {
  // function calls for highlighting buttons
  // No highlights for link, unlink, lists, undo, redo since they are one time operations
  highlightButtons(alignButtons, true);
  highlightButtons(spacingButtons, true);
  highlightButtons(formatButtons, false);
  highlightButtons(scriptButtons, true);

  createFontOptions();
  createFontSizeOptions();

  // default font size
  fontSizeRef.value = 3;
};

// main logic
const modifyText = (command, defaultUi, value) => {
  // execCommand executes command on selected text
  document.execCommand(command, defaultUi, value);
};

// For basic operations which don't need value parameter
optionsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modifyText(button.id, false, null);
  });
});

// For Options that require value parameter (e.g colors, fonts)
advancedOptionButton.forEach((button) => {
  button.addEventListener("change", () => {
    modifyText(button.id, false, button.value);
  });
});

// Link Button Logic
linkButton.addEventListener("click", () => {
  let userLink = prompt("Enter a URL");
  // if link has http then pass directly else add http
  userLink = userLink.trim();
  if (userLink && !/^https?:\/\//i.test(userLink)) {
    userLink = "http://" + userLink;
  }
  modifyText(linkButton.id, false, userLink);
});

unlinkButton.addEventListener("click", () => {
  modifyText("unlink", false, null);
});

const highlightButtons = (buttons, needsRemoval) => {
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      // needsRemoval = true means only one button should be highlight and other would be normal
      if (needsRemoval) {
        const isActive = button.classList.contains("active");
        highlighterRemover(buttons);
        if (!isActive) {
          button.classList.add("active");
        }
      } else {
        button.classList.toggle("active");
      }
    });
  });
};

// Remove highlight from other buttons
const highlighterRemover = (buttons) => {
  buttons.forEach((button) => {
    button.classList.remove("active");
  });
};

// Create options for font names
const createFontOptions = () => {
  fontList.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    fontName.appendChild(option);
  });
};

// fontSize allows only till 7
const createFontSizeOptions = () => {
  for (let i = 1; i <= 7; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    fontSizeRef.appendChild(option);
  }
};

window.onload = initializer();
