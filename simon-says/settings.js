export function createSettingsModal(body, audio) {
  const modal = document.createElement("div");
  modal.id = "settings-modal";
  modal.classList.add("settings-modal");
  modal.classList.add("modal-overlay");
  modal.classList.add("common-modal");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");
  modalContent.classList.add("modal-overlay__modal");
  modal.appendChild(modalContent);

  const closeButton = document.createElement("span");
  closeButton.textContent = "×";
  closeButton.style.cursor = "pointer";
  closeButton.classList.add("close-button");
  modalContent.appendChild(closeButton);

  const modalTitle = document.createElement("h2");
  modalTitle.textContent = "Настройки";
  modalContent.appendChild(modalTitle);

  const volumeLabel = document.createElement("label");
  volumeLabel.textContent = "Громкость:";
  modalContent.appendChild(volumeLabel);

  const volumeControl = document.createElement("input");
  volumeControl.type = "range";
  volumeControl.id = "volume";
  volumeControl.min = "0";
  volumeControl.max = "1";
  volumeControl.step = "0.1";
  volumeControl.value = "1";
  modalContent.appendChild(volumeControl);

  const backgroundLabel = document.createElement("label");
  backgroundLabel.textContent = "Выберите фон:";
  modalContent.appendChild(backgroundLabel);

  const backgroundImageSelect = document.createElement("select");
  backgroundImageSelect.classList.add("modal__background-image-select");
  const backgrounds = [
    "https://media1.tenor.com/m/S4MdyoCR3scAAAAd/oblakao.gif",
    "./assets/background1.jpg",
    "./assets/background2.jpg",
    "./assets/background3.jpg",
  ];
  backgrounds.forEach((bg, index) => {
    const option = document.createElement("option");
    option.value = `url('${bg}')`;
    option.textContent = `Фон ${index + 1}`;
    backgroundImageSelect.appendChild(option);
  });
  modalContent.appendChild(backgroundImageSelect);

  document.body.appendChild(modal);

  const backlightLabel = document.createElement("label");
  backlightLabel.textContent = "Выберите цвет подсветки:";
  modalContent.appendChild(backlightLabel);

  const colorInput = document.createElement("input");
  colorInput.type = "color"; 
  colorInput.value = "#dd92d5";
  modalContent.appendChild(colorInput);
  colorInput.addEventListener("input", (event) => {
    const selectedColor = event.target.value;
    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(
      `
        .activeElement {
            -webkit-box-shadow: 0px 0px 20px 12px ${selectedColor};
            -moz-box-shadow: 0px 0px 20px 12px ${selectedColor};
            box-shadow: 0px 0px 20px 12px ${selectedColor};
        }
    `,
      styleSheet.cssRules.length
    );
  });

 closeButton.onclick = function () {
   modal.style.display = "none";
 };

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  volumeControl.oninput = function () {
    audio.volume = this.value;
  };

  backgroundImageSelect.onchange = function () {
    body.style.backgroundImage = this.value;
  };

  window.onkeydown = function (event) {
    if (event.key === "Escape") {
      modal.style.display = "none";
    }
  };
  
}
