/* =========================================================
   IA · EDUCACIÓN
   JAVASCRIPT INTERACTIVO
========================================================= */


/* =========================================================
   ELEMENTOS
========================================================= */

const sections = [
    ...document.querySelectorAll(".section")
];

const revealElements = [
    ...document.querySelectorAll(".reveal")
];

const progress =
    document.getElementById("progress");

const dots =
    document.getElementById("dots");

const currentSection =
    document.getElementById("currentSection");

const menuLinks =
    document.querySelectorAll(".main-menu a");

const orbOne =
    document.querySelector(".orb-one");

const orbTwo =
    document.querySelector(".orb-two");


/* =========================================================
   NAVEGACIÓN LATERAL
========================================================= */

sections.forEach(
    (section, index) => {

        const dot =
            document.createElement("a");

        dot.href =
            "#" + section.id;

        dot.title =
            "Sección " + (index + 1);

        dot.dataset.section =
            index + 1;

        dots.appendChild(dot);

    }
);


const dotLinks =
    [
        ...dots.querySelectorAll("a")
    ];


/* =========================================================
   ANIMACIONES AL HACER SCROLL
========================================================= */

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                    }

                }
            );

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach(
    element => {

        revealObserver.observe(
            element
        );

    }
);


/* =========================================================
   DETECTAR SECCIÓN ACTUAL
========================================================= */

const sectionObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        const section =
                            entry.target;

                        const number =
                            section.dataset.section;

                        currentSection.textContent =
                            number;


                        dotLinks.forEach(
                            dot => {

                                dot.classList.remove(
                                    "active"
                                );

                            }
                        );


                        const activeDot =
                            dotLinks.find(
                                dot =>
                                    dot.dataset.section ===
                                    number
                            );


                        if (activeDot) {

                            activeDot.classList.add(
                                "active"
                            );

                        }


                        menuLinks.forEach(
                            link => {

                                link.classList.remove(
                                    "active"
                                );

                                if (
                                    link.getAttribute(
                                        "href"
                                    ) ===
                                    "#" + section.id
                                ) {

                                    link.classList.add(
                                        "active"
                                    );

                                }

                            }
                        );

                    }

                }
            );

        },
        {
            threshold: 0.45
        }
    );


sections.forEach(
    section => {

        sectionObserver.observe(
            section
        );

    }
);


/* =========================================================
   BARRA DE PROGRESO
========================================================= */

function updateProgress() {

    const scrollTop =
        window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight;

    const windowHeight =
        window.innerHeight;


    const total =
        documentHeight -
        windowHeight;


    const percentage =
        total > 0
            ? (scrollTop / total) * 100
            : 0;


    progress.style.width =
        percentage + "%";

}


window.addEventListener(
    "scroll",
    updateProgress
);


updateProgress();


/* =========================================================
   MOVIMIENTO DEL FONDO
========================================================= */

document.addEventListener(
    "mousemove",
    event => {

        const x =
            (event.clientX / window.innerWidth)
            - 0.5;


        const y =
            (event.clientY / window.innerHeight)
            - 0.5;


        orbOne.style.transform =
            `
            translate(
                ${x * 45}px,
                ${y * 45}px
            )
            `;


        orbTwo.style.transform =
            `
            translate(
                ${x * -35}px,
                ${y * -35}px
            )
            `;

    }
);


/* =========================================================
   TARJETAS CON EFECTO 3D
========================================================= */

const interactiveCards =
    document.querySelectorAll(
        ".interactive-card"
    );


interactiveCards.forEach(
    card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateX =
                    ((y - centerY) /
                    centerY) *
                    -4;


                const rotateY =
                    ((x - centerX) /
                    centerX) *
                    4;


                card.style.transform =
                    `
                    perspective(800px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-8px)
                    `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    }
);


/* =========================================================
   ANIMACIÓN DE PÍLDORAS
========================================================= */

const pills =
    document.querySelectorAll(
        ".pill"
    );


pills.forEach(
    (pill, index) => {

        pill.style.transitionDelay =
            `${index * 50}ms`;

    }
);


/* =========================================================
   NAVEGACIÓN SUAVE
========================================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(
    link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute(
                        "href"
                    );


                if (
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {

                    return;

                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior:
                        "smooth",
                    block:
                        "start"
                });

            }
        );

    }
);


/* =========================================================
   TECLADO
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        const activeElement =
            document.activeElement;


        const isTyping =
            activeElement.tagName ===
            "INPUT" ||
            activeElement.tagName ===
            "TEXTAREA";


        if (isTyping) {

            return;

        }


        if (
            event.key ===
            "Home"
        ) {

            window.scrollTo({
                top: 0,
                behavior:
                    "smooth"
            });

        }


        if (
            event.key ===
            "End"
        ) {

            window.scrollTo({
                top:
                    document.documentElement
                    .scrollHeight,
                behavior:
                    "smooth"
            });

        }

    }
);


/* =========================================================
   EFECTO DE ENTRADA DEL HERO
========================================================= */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "loaded"
        );

    }
);


/* =========================================================
   EFECTO PARALLAX DEL HERO
========================================================= */

window.addEventListener(
    "scroll",
    () => {

        const hero =
            document.querySelector(
                ".hero"
            );


        if (!hero) {

            return;

        }


        const scroll =
            window.scrollY;


        if (
            scroll <
            window.innerHeight
        ) {

            hero.style.backgroundPosition =
                `
                center
                ${scroll * 0.15}px
                `;

        }

    }
);


/* =========================================================
   BOTÓN DE SONIDO
========================================================= */

const soundButton =
    document.getElementById(
        "soundButton"
    );


let soundEnabled =
    false;


soundButton.addEventListener(
    "click",
    () => {

        soundEnabled =
            !soundEnabled;


        soundButton.textContent =
            soundEnabled
                ? "🔊"
                : "🔇";


        if (soundEnabled) {

            playInterfaceSound();

        }

    }
);


/* =========================================================
   SONIDO DE INTERFAZ
========================================================= */

function playInterfaceSound() {

    if (!soundEnabled) {

        return;

    }


    const AudioContext =
        window.AudioContext ||
        window.webkitAudioContext;


    if (!AudioContext) {

        return;

    }


    const audio =
        new AudioContext();


    const oscillator =
        audio.createOscillator();


    const gain =
        audio.createGain();


    oscillator.type =
        "sine";


    oscillator.frequency.value =
        520;


    gain.gain.setValueAtTime(
        0.035,
        audio.currentTime
    );


    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audio.currentTime + 0.12
    );


    oscillator.connect(
        gain
    );


    gain.connect(
        audio.destination
    );


    oscillator.start();

    oscillator.stop(
        audio.currentTime + 0.12
    );

}


/* =========================================================
   SONIDO EN LOS BOTONES
========================================================= */

document.querySelectorAll(
    "button"
).forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                playInterfaceSound();

            }
        );

    }
);


/* =========================================================
   SONIDO EN NAVEGACIÓN LATERAL
========================================================= */

dotLinks.forEach(
    dot => {

        dot.addEventListener(
            "click",
            () => {

                playInterfaceSound();

            }
        );

    }
);


/* =========================================================
   CONTADORES ANIMADOS
========================================================= */

function animateNumber(
    element,
    finalNumber
) {

    let current =
        0;


    const duration =
        700;


    const start =
        performance.now();


    function updateNumber(
        timestamp
    ) {

        const progress =
            Math.min(
                (timestamp - start) /
                duration,
                1
            );


        current =
            Math.floor(
                progress *
                finalNumber
            );


        element.textContent =
            String(current)
            .padStart(2, "0");


        if (
            progress < 1
        ) {

            requestAnimationFrame(
                updateNumber
            );

        }

    }


    requestAnimationFrame(
        updateNumber
    );

}


/* =========================================================
   ANIMAR CONTADOR DE SECCIONES
========================================================= */

let lastSection =
    "";


const originalObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        const number =
                            entry.target.dataset.section;


                        if (
                            number !==
                            lastSection
                        ) {

                            lastSection =
                                number;


                            animateNumber(
                                currentSection,
                                Number(number)
                            );

                        }

                    }

                }
            );

        },
        {
            threshold:
                0.55
        }
    );


sections.forEach(
    section => {

        originalObserver.observe(
            section
        );

    }
);


/* =========================================================
   EFECTO DE REVELADO ESCALONADO
========================================================= */

const grids =
    document.querySelectorAll(
        ".grid, .grid2, .benefits-grid, .media-grid"
    );


grids.forEach(
    grid => {

        const children =
            [
                ...grid.children
            ];


        children.forEach(
            (child, index) => {

                child.style.transitionDelay =
                    `${index * 90}ms`;

            }
        );

    }
);


/* =========================================================
   DETECCIÓN DE REDUCIR MOVIMIENTO
========================================================= */

const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


if (
    prefersReducedMotion.matches
) {

    document.documentElement.style
        .scrollBehavior =
        "auto";

}



/* =========================================================
   INICIO
========================================================= */

updateProgress();

console.log(
    "IA · EDUCACIÓN — Página interactiva cargada correctamente."
);

/* =========================================================
   INVESTIGACIÓN DE CAMPO · ANIMACIÓN DE RESULTADOS
========================================================= */

const resultsSection = document.querySelector("#s11");

if (resultsSection) {

    let resultsAnimated = false;

    function animateResults() {

        if (resultsAnimated) {
            return;
        }

        resultsAnimated = true;


        /* =====================================================
           CONTADORES DE PARTICIPANTES
        ===================================================== */

        const counters =
            resultsSection.querySelectorAll("[data-count]");

        counters.forEach(counter => {

            const target =
                Number(counter.dataset.count);

            const duration = 1200;

            const startTime =
                performance.now();

            function updateCounter(currentTime) {

                const elapsed =
                    currentTime - startTime;

                const progress =
                    Math.min(
                        elapsed / duration,
                        1
                    );

                const ease =
                    1 - Math.pow(
                        1 - progress,
                        3
                    );

                const current =
                    Math.floor(
                        target * ease
                    );

                counter.textContent =
                    current;

                if (progress < 1) {

                    requestAnimationFrame(
                        updateCounter
                    );

                } else {

                    counter.textContent =
                        target;

                }
            }

            requestAnimationFrame(
                updateCounter
            );

        });


        /* =====================================================
           BARRAS DE FRECUENCIA DE USO
        ===================================================== */

        const bars =
            resultsSection.querySelectorAll(
                ".bar-fill"
            );

        bars.forEach(
            (bar, index) => {

                const width =
                    bar.dataset.width;

                setTimeout(
                    () => {

                        bar.style.width =
                            width + "%";

                    },
                    index * 180
                );

            }
        );


        /* =====================================================
           BARRAS DE BENEFICIOS
        ===================================================== */

        const benefits =
            resultsSection.querySelectorAll(
                ".benefit-fill"
            );

        benefits.forEach(
            (bar, index) => {

                const width =
                    bar.dataset.width;

                setTimeout(
                    () => {

                        bar.style.width =
                            width + "%";

                    },
                    300 + index * 180
                );

            }
        );

    }


    /* =====================================================
       DETECTAR CUANDO S11 APARECE EN PANTALLA
    ===================================================== */

    const resultsObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            animateResults();

                        }

                    }
                );

            },
            {
                threshold: 0.25
            }
        );


    resultsObserver.observe(
        resultsSection
    );

}