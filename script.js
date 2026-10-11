
const barsContainer = document.getElementById("bars");
const generateButton = document.getElementById("generate");
const sortButton = document.getElementById("sort");
const statusText = document.getElementById("status");
const speedSlider = document.getElementById("speed");
const speedValue = document.getElementById("speedValue");
const comparisonDisplay = document.getElementById("comparisons");
const arraySizeDisplay = document.getElementById("arraySize");

let array = [];
let sorting = false;
let comparisons = 0;

function generateArray() {
    if (sorting) return;

    array = [];

    for (let i = 0; i < 30; i++) {
        array.push(Math.floor(Math.random() * 90) + 10);
    }

    comparisons = 0;
    comparisonDisplay.textContent = comparisons;
    arraySizeDisplay.textContent = array.length;

    displayBars();
    statusText.textContent = "New array generated!";
}

function displayBars() {
    barsContainer.innerHTML = "";

    array.forEach((value) => {
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = value * 3 + "px";
        bar.title = value;
        barsContainer.appendChild(bar);
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubbleSort() {
    if (sorting) return;

    sorting = true;
    generateButton.disabled = true;
    sortButton.disabled = true;

    const bars = document.querySelectorAll(".bar");
    comparisons = 0;
    comparisonDisplay.textContent = comparisons;
    statusText.textContent = "Sorting in progress...";

    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            bars[j].classList.add("comparing");
            bars[j + 1].classList.add("comparing");

            comparisons++;
            comparisonDisplay.textContent = comparisons;

            await sleep(210 - Number(speedSlider.value));

            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] =
                    [array[j + 1], array[j]];

                bars[j].style.height = array[j] * 3 + "px";
                bars[j + 1].style.height = array[j + 1] * 3 + "px";
                bars[j].title = array[j];
                bars[j + 1].title = array[j + 1];
            }

            bars[j].classList.remove("comparing");
            bars[j + 1].classList.remove("comparing");
        }

        bars[array.length - 1 - i].classList.add("sorted");
    }

    if (bars.length > 0) {
        bars[0].classList.add("sorted");
    }

    sorting = false;
    generateButton.disabled = false;
    sortButton.disabled = false;
    statusText.textContent =
        `Sorted successfully! Total comparisons: ${comparisons}`;
}

speedSlider.addEventListener("input", () => {
    speedValue.textContent = speedSlider.value + " ms";
});

generateButton.addEventListener("click", generateArray);
sortButton.addEventListener("click", bubbleSort);

generateArray();
