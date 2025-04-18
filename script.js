const noBtn = document.getElementById("no-btn");
const yesBtn = document.getElementById("yes-btn");
const response = document.getElementById("response");
const gifContainer = document.getElementById("gif-container");
const secretBtn = document.getElementById("secret-btn");
const overlay = document.getElementById("overlay");
const closePopup = document.getElementById("close-popup");

// Move NO button away smoothly
noBtn.addEventListener("mousemove", (event) => {
    const btnRect = noBtn.getBoundingClientRect();
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const offsetX = btnRect.left + btnRect.width / 2 - mouseX;
    const offsetY = btnRect.top + btnRect.height / 2 - mouseY;

    const moveX = offsetX > 0 ? 100 : -100;
    const moveY = offsetY > 0 ? 50 : -50;

    let newX = btnRect.left + moveX;
    let newY = btnRect.top + moveY;

    newX = Math.max(0, Math.min(window.innerWidth - btnRect.width, newX));
    newY = Math.max(0, Math.min(window.innerHeight - btnRect.height, newY));

    noBtn.style.transform = `translate(${newX - btnRect.left}px, ${newY - btnRect.top}px)`;
});

// Heart blast function
function createHeartBurst() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    for (let i = 0; i < 30; i++) {
        const heart = document.createElement("img");
        heart.src = "heart.png";
        heart.classList.add("heart");
        document.body.appendChild(heart);

        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 300 + 100;
        const moveX = Math.cos(angle) * speed;
        const moveY = Math.sin(angle) * speed;

        heart.style.left = `${centerX - 25}px`;
        heart.style.top = `${centerY - 25}px`;

        heart.animate([
            { transform: `translate(0, 0) scale(1)`, opacity: 1 },
            { transform: `translate(${moveX}px, ${moveY}px) scale(0.5)`, opacity: 0 }
        ], {
            duration: 1500,
            easing: "ease-out",
            fill: "forwards"
        });

        setTimeout(() => heart.remove(), 2000);
    }
}

// YES click handler
yesBtn.addEventListener("click", () => {
    let burstInterval = setInterval(createHeartBurst, 200);

    setTimeout(() => {
        clearInterval(burstInterval);
        response.style.display = "block";
        response.style.opacity = "0";
        response.animate([{ opacity: "0" }, { opacity: "1" }], {
            duration: 1000,
            fill: "forwards"
        });
    }, 2500);

    // Fade out buttons
    yesBtn.classList.add("fade-out");
    noBtn.classList.add("fade-out");

    // Show GIF after delay
    setTimeout(() => {
        gifContainer.style.display = "block";
    
        // Wait for gif to be fully visible before showing secret button
        setTimeout(() => {
            secretBtn.style.display = "block";
        }, 500); // Delay can be adjusted if needed
    }, 6000);
    
});

// Secret Button Popup Logic
secretBtn.addEventListener("click", () => {
    overlay.style.display = "flex";
    document.body.classList.add("dim-background");
});

closePopup.addEventListener("click", () => {
    overlay.style.display = "none";
    document.body.classList.remove("dim-background");
});

// Sakura petals
function createSakura() {
    const petal = document.createElement("div");
    petal.classList.add("sakura");
    document.body.appendChild(petal);

    const startX = Math.random() * window.innerWidth;
    const duration = Math.random() * 5 + 5;

    petal.style.left = `${startX}px`;
    petal.style.animationDuration = `${duration}s`;

    setTimeout(() => petal.remove(), duration * 1000);
}

setInterval(createSakura, 300);
