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
    actionDisplay.id = 'actionDisplay'; // Set id for action display
    const totalRemainingDisplay = document.createElement('p'); // Create a total remaining time display element
    totalRemainingDisplay.id = 'totalRemainingDisplay'; // Set id for total remaining display
    const inhalationSign = document.querySelector('.inhalation-sign');
    const exhalationSign = document.querySelector('.exhalation-sign');
    const holdSign = document.querySelector('.hold-sign');

    document.body.appendChild(timerDisplay); // Append timer display to body
    document.body.appendChild(actionDisplay); // Append action display to body
    document.body.appendChild(totalRemainingDisplay); // Append total remaining display to body

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
        return totalTimeInSeconds;
    }

    // Add event listeners to dropdowns to recalculate total time when changed
    inhaleSelect.addEventListener('change', calculateTotalTime);
    holdSelect.addEventListener('change', calculateTotalTime);
    exhaleSelect.addEventListener('change', calculateTotalTime);
    countSelect.addEventListener('change', calculateTotalTime);

    // Function to update total remaining time
    function updateTotalRemainingTime(totalRemainingTime) {
        const hours = Math.floor(totalRemainingTime / 3600);
        const minutes = Math.floor((totalRemainingTime % 3600) / 60);
        const seconds = totalRemainingTime % 60;
        totalRemainingDisplay.textContent = `Total Time Left: ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
    }

    // Function to run the breathing sequence
    let intervals = []; // Store intervals to clear them later

    function runSequence() {
        const inhaleTime = parseInt(inhaleSelect.value);
        const holdTime = parseInt(holdSelect.value);
        const exhaleTime = parseInt(exhaleSelect.value);
        const count = parseInt(countSelect.value);

        let currentCount = 0;
        let totalRemainingTime = calculateTotalTime();

        function runInhale() {
            let timeLeft = inhaleTime;
            actionDisplay.textContent = 'Inhale';
            actionDisplay.style.color = 'green';
            inhalationSign.style.display = 'block';
            holdSign.style.display = 'none';
            exhalationSign.style.display = 'none';
            const inhaleInterval = setInterval(() => {
                timerDisplay.textContent = `Time left: ${timeLeft} seconds`;
                totalRemainingTime--;
                updateTotalRemainingTime(totalRemainingTime);
                if (timeLeft <= 0) {
                    clearInterval(inhaleInterval);
                    inhalationSign.style.display = 'none';
                    runHold();
                }
                timeLeft--;
            }, 1000);
            intervals.push(inhaleInterval);
        }

        function runHold() {
            let timeLeft = holdTime;
            actionDisplay.textContent = 'Hold';
            actionDisplay.style.color = 'orange';
            holdSign.style.display = 'block';
            inhalationSign.style.display = 'none';
            exhalationSign.style.display = 'none';
            const holdInterval = setInterval(() => {
                timerDisplay.textContent = `Time left: ${timeLeft} seconds`;
                totalRemainingTime--;
                updateTotalRemainingTime(totalRemainingTime);
                if (timeLeft <= 0) {
                    clearInterval(holdInterval);
                    holdSign.style.display = 'none';
                    runExhale();
                }
                timeLeft--;
            }, 1000);
            intervals.push(holdInterval);
        }

        function runExhale() {
            let timeLeft = exhaleTime;
            actionDisplay.textContent = 'Exhale';
            actionDisplay.style.color = 'blue';
            exhalationSign.style.display = 'block';
            inhalationSign.style.display = 'none';
            holdSign.style.display = 'none';
            const exhaleInterval = setInterval(() => {
                timerDisplay.textContent = `Time left: ${timeLeft} seconds`;
                totalRemainingTime--;
                updateTotalRemainingTime(totalRemainingTime);
                if (timeLeft <= 0) {
                    clearInterval(exhaleInterval);
                    exhalationSign.style.display = 'none';
                    currentCount++;
                    if (currentCount < count) {
                        runInhale();
                    } else {
                        actionDisplay.textContent = 'Sequence complete';
                        timerDisplay.textContent = '';
                        startButton.textContent = 'Start';
                        totalTimeDisplay.style.display = 'block'; // Show total time taken
                    }
                }
                timeLeft--;
            }, 1000);
            intervals.push(exhaleInterval);
        }

        runInhale();
    }

    // Start/Stop button event listener
    startButton.addEventListener('click', function () {
        if (startButton.textContent === 'Start') {
            startButton.textContent = 'Stop';
            totalTimeDisplay.style.display = 'none'; // Hide total time taken
            runSequence();
        } else {
            startButton.textContent = 'Start';
            actionDisplay.textContent = '';
            timerDisplay.textContent = '';
            totalRemainingDisplay.textContent = '';
            inhalationSign.style.display = 'none';
            holdSign.style.display = 'none';
            exhalationSign.style.display = 'none';
            intervals.forEach(interval => clearInterval(interval));
            intervals = [];
            totalTimeDisplay.style.display = 'block'; // Show total time taken
        }
    });

    // Initial calculation
    calculateTotalTime();
});
