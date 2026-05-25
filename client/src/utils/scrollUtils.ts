// src/utils/scrollUtils.ts

/**
 * Plynule odscrolluje na zadanou pozici Y s easing funkcí.
 * @param targetY - Cílová pozice v pixelech odshora stránky
 * @param duration - Doba trvání animace v ms
 */
export const smoothScrollTo = (targetY: number, duration: number = 800) => {
    const startingY = window.pageYOffset;
    const diff = targetY - startingY;
    let start: number | null = null;

    // Easing funkce (easeOutCubic) - začne rychle, zpomalí ke konci
    const easing = (t: number) => (--t) * t * t + 1;

    const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const time = timestamp - start;
        const percent = easing(Math.min(time / duration, 1));

        window.scrollTo(0, startingY + diff * percent);

        if (time < duration) {
            window.requestAnimationFrame(step);
        }
    };

    window.requestAnimationFrame(step);
};

/**
 * Plynule odscrolluje na element podle ID.
 */
export const smoothScrollToId = (id: string, offset: number = 80, duration: number = 800) => {
    const element = document.getElementById(id);
    if (element) {
        const targetY = element.getBoundingClientRect().top + window.pageYOffset - offset;
        smoothScrollTo(targetY, duration);
    }
};