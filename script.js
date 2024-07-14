document.addEventListener('DOMContentLoaded', function () {
    // Populate dropdowns
    const inhaleSelect = document.getElementById('inhale');
    const holdSelect = document.getElementById('hold');
    const exhaleSelect = document.getElementById('exhale');
    const countSelect = document.getElementById('count');
    const totalTimeDisplay = document.getElementById('totalTime');
    const startButton = document.getElementById('startButton');
    const timerDisplay = document.createElement('p'); // Create a timer display element
    const actionDisplay = document.createElement('p'); // Create an action display element
    document.body.appendChild(timerDisplay); // Append timer display to body
    document.body.appendChild(actionDisplay); // Append action display to body

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

    // Set default values
    inhaleSelect.value = 4;
    holdSelect.value = 4;
    exhaleSelect.value = 4;
    countSelect.value = 10;

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

    // Function to run the breathing sequence
    function runSequence() {
        const inhaleTime = parseInt(inhaleSelect.value);
        const holdTime = parseInt(holdSelect.value);
        const exhaleTime = parseInt(exhaleSelect.value);
        const count = parseInt(countSelect.value);

        let currentCount = 0;

        function runInhale() {
            let timeLeft = inhaleTime;
            actionDisplay.textContent = 'Inhale';
            actionDisplay.style.color = 'green';
            const inhaleInterval = setInterval(() => {
                timerDisplay.textContent = `Time left: ${timeLeft} seconds`;
                if (timeLeft <= 0) {
                    clearInterval(inhaleInterval);
                    runHold();
                }
                timeLeft--;
            }, 1000);
        }

        function runHold() {
            let timeLeft = holdTime;
            actionDisplay.textContent = 'Hold';
            actionDisplay.style.color = 'orange';
            const holdInterval = setInterval(() => {
                timerDisplay.textContent = `Time left: ${timeLeft} seconds`;
                if (timeLeft <= 0) {
                    clearInterval(holdInterval);
                    runExhale();
                }
                timeLeft--;
            }, 1000);
        }

        function runExhale() {
            let timeLeft = exhaleTime;
            actionDisplay.textContent = 'Exhale';
            actionDisplay.style.color = 'blue';
            const exhaleInterval = setInterval(() => {
                timerDisplay.textContent = `Time left: ${timeLeft} seconds`;
                if (timeLeft <= 0) {
                    clearInterval(exhaleInterval);
                    currentCount++;
                    if (currentCount < count) {
                        runInhale();
                    } else {
                        actionDisplay.textContent = 'Sequence complete';
                        timerDisplay.textContent = '';
                    }
                }
                timeLeft--;
            }, 1000);
        }

        runInhale();
    }

    // Start button event listener
    startButton.addEventListener('click', function() {
        runSequence();
    });

    // Initial calculation
    calculateTotalTime();
});
