// "use strict";

function Modal(
  modalSelector,
  triggerSelector,
  closerSelector,
  activeClass = "active"
) {
  this.modal = document.querySelector(modalSelector);
  this.triggers = document.querySelectorAll(triggerSelector);
  this.closer = document.querySelector(closerSelector);
  this.activeClass = activeClass;
  this.modalForm = this.modal.querySelector("div div div");

  this.closer.addEventListener("click", () => this.hide());
  this.triggers.forEach((trigger) =>
    trigger.addEventListener("click", (event) => this.show(event))
  );

  this.modal.addEventListener("click", (event) => {
    const isNotForm =
      this.modal.contains(event.target) &&
      event.target !== this.modalForm &&
      !this.modalForm.contains(event.target);

    if (isNotForm) {
      this.hide();
    }
  });
}

Modal.prototype.show = function (event) {
  event.preventDefault();
  this.modal.style.display = "block";

  const timer = setTimeout(() => {
    this.modal.classList.add(this.activeClass);
    clearTimeout(timer);
  });
};

Modal.prototype.hide = function () {
  this.modal.classList.remove(this.activeClass);

  const timer = setTimeout(() => {
    this.modal.style.display = "none";
    clearTimeout(timer);
  }, 300);
};

new Modal(".modal", "a", ".modal__closer");
