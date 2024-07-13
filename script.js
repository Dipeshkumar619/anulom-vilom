document.addEventListener('DOMContentLoaded', function () {
    // Populate dropdowns
    const inhaleSelect = document.getElementById('inhale');
    const holdSelect = document.getElementById('hold');
    const exhaleSelect = document.getElementById('exhale');
    const countSelect = document.getElementById('count');

    for (let i = 1; i <= 20; i++) {
        const inhaleOption = document.createElement('option');
        inhaleOption.value = i;
        inhaleOption.textContent = i;
        inhaleSelect.appendChild(inhaleOption);

        const holdOption = document.createElement('option');
        holdOption.value = i;
        holdOption.textContent = i;
        holdSelect.appendChild(holdOption);

        const exhaleOption = document.createElement('option');
        exhaleOption.value = i;
        exhaleOption.textContent = i;
        exhaleSelect.appendChild(exhaleOption);
    }

    for (let i = 1; i <= 200; i++) {
        const countOption = document.createElement('option');
        countOption.value = i;
        countOption.textContent = i;
        countSelect.appendChild(countOption);
    }

    // Start button event listener
    const startButton = document.getElementById('startButton');
    startButton.addEventListener('click', function() {
        alert('Start button clicked!');
        // Add your start functionality here
    });
});
