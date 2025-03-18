window.addEventListener("resize", function () {
    let viewportWidth = document.documentElement.clientWidth;
    if (viewportWidth > 1024) {
        document.querySelector(".header__container").classList.remove("mobile-menu");
    }
});

const orderSelect = document.querySelector(".main-form-order-select");
if (orderSelect) {
    orderSelect.addEventListener("click", function () {
        this.classList.toggle("main-form-order-select--open");
    });
}

const burger = document.getElementById("burger");
if (burger) {
    burger.addEventListener("click", function () {
        document.querySelector(".header__container").classList.toggle("mobile-menu");
        document.body.classList.toggle("no_scroll");
    });
}

const rangeInput = document.querySelector(".main-form-order-range__input");
const valueSpan = document.querySelector(".main-form-order-range__value");

if (rangeInput && valueSpan) {
    rangeInput.addEventListener("input", function () {
        valueSpan.textContent = `${this.value}%`;
    });
    valueSpan.textContent = `${rangeInput.value}%`;
}

const dropdown = document.querySelector(".main-form-order-select__dropdown");
const input = document.querySelector(".main-form-order-select__input");
const textSpan = document.querySelector(".main-form-order-select__txt");
const elements = document.querySelectorAll(".main-form-order__element");

if (dropdown && input && textSpan && elements.length > 0) {
    elements.forEach(element => {
        element.addEventListener("click", function () {
            const selectedText = this.textContent;
            input.value = selectedText;
            textSpan.textContent = selectedText;
        });
    });
}


