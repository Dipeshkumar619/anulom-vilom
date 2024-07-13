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
});
