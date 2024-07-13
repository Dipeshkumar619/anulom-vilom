document.addEventListener('DOMContentLoaded', function () {
    // Populate dropdowns
    const inhaleSelect = document.getElementById('inhale');
    const holdSelect = document.getElementById('hold');
    const exhaleSelect = document.getElementById('exhale');
    const countSelect = document.getElementById('count');
    const totalTimeDisplay = document.getElementById('totalTime');
    const startButton = document.getElementById('startButton');

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

    // Calculate and display total time in hours, minutes, and seconds
    function calculateTotalTime() {
        const inhaleTime = parseInt(inhaleSelect.value) || 0;
        const holdTime = parseInt(holdSelect.value) || 0;
        const exhaleTime = parseInt(exhaleSelect.value) || 0;
        const count = parseInt(countSelect.value) || 0;

        const totalTimeInSeconds = (inhaleTime + holdTime + exhaleTime) * count;

        const hours = Math.floor(totalTimeInSeconds / 3600);
        const minutes = Math.floor((totalTimeInSeconds % 3600) / 60);
        const seconds = totalTimeInSeconds % 60;

        totalTimeDisplay.textContent = `Total Time Taken: ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
    }

    // Add event listeners to dropdowns to recalculate total time when changed
    inhaleSelect.addEventListener('change', calculateTotalTime);
    holdSelect.addEventListener('change', calculateTotalTime);
    exhaleSelect.addEventListener('change', calculateTotalTime);
    countSelect.addEventListener('change', calculateTotalTime);

    // Start button event listener
    startButton.addEventListener('click', function() {
        alert('Start button clicked!');
        // Add your start functionality here
    });
});
