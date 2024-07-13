document.addEventListener('DOMContentLoaded', function () {
    const inhalationSign = document.querySelector('.inhalation-sign');
    let isVisible = false;

    setInterval(() => {
        if (isVisible) {
            inhalationSign.style.display = 'none';
        } else {
            inhalationSign.style.display = 'block';
        }
        isVisible = !isVisible;
    }, 1000); // Adjust the interval as needed (1000ms = 1s)

    // Populate dropdowns
    const inhaleSelect = document.getElementById('inhale');
    const holdSelect = document.getElementById('hold');
    const exhaleSelect = document.getElementById('exhale');

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
});
