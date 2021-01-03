function socialEnter(event, element) {
    gsap.timeline({
        defaults: { duration: 0.5 },
        onStart: () => {
            element.children[0].style.display = "flex"
        },
    })
    .to(element, {
        textShadow: "0px 0px 2px #ffffff, 0px 0px 10px #ff0000 ,0px 0px 20px #ff0000, 0px 0px 50px #ff0000, 0px 0px 100px #ff0000",
        opacity: 1
    }, "start")
    .to(element.children[0], {
        width: element.children[0].innerHTML.length+"ch",
        paddingLeft: "10px",
        opacity: 1
    }, "start")
}

function socialLeave(event, element) {
    gsap.timeline({
        defaults: { duration: 0.5 },
        onComplete: () => {
            element.children[0].style.display = "none"
        }
    })
    .to(element, {
        textShadow: "0px 0px 0px #000000, 0px 0px 0px #000000, 0px 0px 0px #000000, 0px 0px 0px #000000, 0px 0px 0px #000000",
        opacity: 0.5
    }, "start")
    .to(element.children[0], {
        width: "0ch",
        paddingLeft: "0px",
        opacity: 0
    }, "start")
}

function sloganLoop(){
    let slogan = document.getElementById("slogan")
    gsap.timeline({
        defaults: { duration: 1 },
        onComplete: () => {
            sloganLoop()
        }
    })
        .to(slogan, {
            textShadow: "0px 0px 2px #ffffff, 0px 0px 10px #ff0000 ,0px 0px 20px #ff0000, 0px 0px 50px #ff0000, 0px 0px 100px #ff0000",
            opacity: 1
        })
        .to(slogan, {
            textShadow: "0px 0px 0px #000000, 0px 0px 0px #000000, 0px 0px 0px #000000, 0px 0px 0px #000000, 0px 0px 0px #000000",
            opacity: 0.5
        })
}

sloganLoop()

// SOCIAL BUTTONS
let socialButtons = document.getElementById("social").children
Array.from(socialButtons).forEach(element => {
    element.addEventListener("mouseenter", (event) => socialEnter(event, element))
    element.addEventListener("mouseleave", (event) => socialLeave(event, element))
});

//let menuButtons = document.getElementById("menu").children
//Array.from(menuButtons).forEach(element => {
//    element.addEventListener("mouseenter", (event) => socialEnter(event, element))
//    element.addEventListener("mouseleave", (event) => socialLeave(event, element))
//});