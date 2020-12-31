function onEnter(event, element) {
    gsap.to(element, 0.5, {
        textShadow: "0px 0px 2px #ffffff, 0px 0px 10px #ff0000 ,0px 0px 20px #ff0000, 0px 0px 50px #ff0000, 0px 0px 100px #ff0000",
        opacity: 1
    })
}

function onLeave(event, element) {
    gsap.to(element, 0.5, {
        textShadow: "0px 0px 0px #000000, 0px 0px 0px #000000, 0px 0px 0px #000000, 0px 0px 0px #000000, 0px 0px 0px #000000",
        opacity: 0.5
    })
}

// SOCIAL BUTTONS
let socialButtons = document.getElementById("social").children
Array.from(socialButtons).forEach(element => {
    element.addEventListener("mouseenter", (event) => onEnter(event, element))
    element.addEventListener("mouseleave", (event) => onLeave(event, element))
});