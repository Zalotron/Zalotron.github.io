function onEnter(event, element) {
    gsap.to(element, 0.5, {
        textShadow: "0px 0px 5px #ff0000, 0px 0px 5px #ff0000 ,0px 0px 5px #ff0000, 0px 0px 5px #ff0000, 0px 0px 5px #ff0000"
    })
}

function onLeave(event, element) {
    gsap.to(element, 0.5, {
        textShadow: "0px 0px 0px #000000, 0px 0px 0px #000000, 0px 0px 0px #000000, 0px 0px 0px #000000, 0px 0px 0px #000000"
    })
}

//function onClick(event, element){
//
//}

// SOCIAL BUTTONS
let socialButtons = document.getElementById("social").children
Array.from(socialButtons).forEach(element => {
    element.addEventListener("mouseenter", (event) => onEnter(event, element))
    element.addEventListener("mouseleave", (event) => onLeave(event, element))
    //element.addEventListener("click", (event) => onClick(event, element))
});