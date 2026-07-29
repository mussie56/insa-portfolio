const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");

const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle.querySelector("i");

const sections = document.querySelectorAll("section");
const header = document.querySelector("header");

const contactForm = document.querySelector("form");

hamburger.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});

navItems.forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});

function setTheme(theme){

    if(theme === "dark"){
        document.body.classList.add("dark");

        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");

    }else{
        document.body.classList.remove("dark");

        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");
    }
    localStorage.setItem("theme", theme);

}

const savedTheme = localStorage.getItem("theme");

if(savedTheme){
    setTheme(savedTheme);
}else{
    setTheme("light");
}

themeToggle.addEventListener("click", () => {
    if(document.body.classList.contains("dark")){
        setTheme("light");
    }else{
        setTheme("dark");
    }

});

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const top = section.offsetTop - 120;
        const height = section.offsetHeight;

        if(window.scrollY >= top){
            current = section.getAttribute("id");
        }
    });

    navItems.forEach(link => {
        link.classList.remove("active-link");

        if(link.getAttribute("href") === "#" + current){
            link.classList.add("active-link");
        }
    });
});

window.addEventListener("scroll", () => {
    if(window.scrollY > 30){
        header.style.boxShadow = "0 10px 25px rgba(0,0,0,.15)";
    }else{
        header.style.boxShadow = "none";
    }
});

const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
},{
    threshold:0.15
});

document.querySelectorAll(".section").forEach(section=>{
    section.classList.add("hidden");
    observer.observe(section);
});

contactForm.addEventListener("submit", function(e){
    e.preventDefault();
    alert("Thank you! Your message has been received. (Frontend Demo)");
    contactForm.reset();
});

navItems.forEach(link=>{
    link.addEventListener("click",function(e){
        e.preventDefault();
        const target=document.querySelector(this.getAttribute("href"));
        target.scrollIntoView({
            behavior:"smooth"
        });
    });
});

document.querySelectorAll(".btn").forEach(button=>{
    const href=button.getAttribute("href");
    if(!href) return;
    button.addEventListener("click",function(e){
        if(href.startsWith("#")){
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior:"smooth"
            });
        }
    });
});

const title = document.querySelector(".hero h3");

const text = title.textContent;

title.textContent = "";

let index = 0;

function typeWriter(){
    if(index < text.length){
        title.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter,70);
    }
}

window.addEventListener("load", typeWriter);

const topButton = document.createElement("button");

topButton.innerHTML = "↑";

topButton.id = "topButton";

document.body.appendChild(topButton);

topButton.style.position = "fixed";
topButton.style.right = "20px";
topButton.style.bottom = "20px";
topButton.style.width = "45px";
topButton.style.height = "45px";
topButton.style.border = "none";
topButton.style.borderRadius = "50%";
topButton.style.background = "#2563eb";
topButton.style.color = "#fff";
topButton.style.cursor = "pointer";
topButton.style.display = "none";
topButton.style.fontSize = "18px";
topButton.style.zIndex = "999";

window.addEventListener("scroll",()=>{
    if(window.scrollY > 400){
        topButton.style.display = "block";
    }else{
        topButton.style.display = "none";
    }
});

topButton.addEventListener("click",()=>{
    window.scrollTo({
        top:0,
        behavior:"smooth"
    });
});