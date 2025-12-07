document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.skills-track');

    // Clone the content to ensure seamless scrolling if not already duplicated enough
    // (The HTML already has duplicates, but let's be safe or just use what's there)
    // For a robust JS infinite scroll, we often clone the entire set once more.

    // Let's assume the HTML structure is sufficient for now as per the previous setup.
    // We need to scroll it horizontally.

    let scrollPosition = 0;
    const speed = 0.5; // Adjust for speed

    function animateScroll() {
        scrollPosition -= speed;

        // Calculate the width of one set of items
        // Since we have two identical sets, the total width is 2 * singleSetWidth
        // We want to reset when we've scrolled past the first set.
        const totalWidth = track.scrollWidth;
        const singleSetWidth = totalWidth / 2;

        if (Math.abs(scrollPosition) >= singleSetWidth) {
            scrollPosition = 0;
        }

        track.style.transform = `translateX(${scrollPosition}px)`;
        requestAnimationFrame(animateScroll);
    }

    // Start animation
    animateScroll();

    // Optional: Pause on hover
    track.addEventListener('mouseenter', () => {
        // We can pause by just not calling requestAnimationFrame, 
        // but since it's a recursive loop, we'd need a flag.
        isPaused = true;
    });

    track.addEventListener('mouseleave', () => {
        isPaused = false;
        if (!animationRunning) {
            animateScroll();
        }
    });

    let isPaused = false;
    let animationRunning = true;

    // Modified animate function to support pause
    function animateScrollWithPause() {
        if (!isPaused) {
            scrollPosition -= speed;
            const totalWidth = track.scrollWidth;
            const singleSetWidth = totalWidth / 2;

            if (Math.abs(scrollPosition) >= singleSetWidth) {
                scrollPosition = 0;
            }
            track.style.transform = `translateX(${scrollPosition}px)`;
        }
        requestAnimationFrame(animateScrollWithPause);
    }

    // Override the previous call
    // animateScrollWithPause(); 
    // Actually, let's just use one clean function.
});

// Clean implementation
(function () {
    const track = document.querySelector('.skills-track');
    if (!track) return;

    let scrollPos = 0;
    const speed = 1;
    let isPaused = false;

    function scroll() {
        if (!isPaused) {
            scrollPos -= speed;
            // Assuming the track contains two sets of identical items
            if (Math.abs(scrollPos) >= track.scrollWidth / 2) {
                scrollPos = 0;
            }
            track.style.transform = `translateX(${scrollPos}px)`;
        }
        requestAnimationFrame(scroll);
    }

    track.addEventListener('mouseenter', () => isPaused = true);
    track.addEventListener('mouseleave', () => isPaused = false);

    scroll();
})();
