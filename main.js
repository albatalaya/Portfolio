import en from './assets/english.json' assert { type: 'json' };
import es from './assets/spanish.json' assert { type: 'json' };
import cat from './assets/catalan.json' assert { type: 'json' };


//SPLASH SCREEN
setTimeout(()=> {
  document.getElementById("splash").style.visibility="hidden"
}, 1050); 


//VARIABLES
let currentTab;
let visible=false;
let lanVisible=false;
let screen = window.matchMedia("(max-width: 620px)")


//SET PREVIOUS LANGUAGE IF THE PAGE WAS RELOADED AND COLOR MODE
let currentLan = localStorage.getItem("language");
switch(currentLan){
  case "en":
    setTimeout(english, 10); //timeout set to avoid a bug in selected language color
    break;
  case "es":
    setTimeout(spanish, 10);
    break;
  case "cat":
    setTimeout(catalan, 10);
    break;
}

let mode = localStorage.getItem("color");
switch(mode){
  case "light":
    lightMode();
    break;
  case "night":
    nightMode();
    break;
}


//CALLS
document.getElementById("burger-menu").addEventListener("click", menu);
document.getElementById("burger-tags").addEventListener("click", menu);

document.getElementById("color-mode").addEventListener("click", colorMode);
document.getElementById("burger-color-mode").addEventListener("click", colorMode);

document.getElementsByClassName("selected-language")[0].addEventListener("click", languages);
document.getElementsByClassName("languages")[0].addEventListener("click", languages);
document.getElementById("en").addEventListener("click", english);
document.getElementById("es").addEventListener("click", spanish);
document.getElementById("cat").addEventListener("click", catalan);

document.getElementById("en").style.color="#74a2dc";

activateNavigation();  
hideMenu();
dots();

hideTags(screen);
screen.addEventListener("change", hideTags);


//FUNCTIONS
function hideTags(size) {
  let icon;
  switch(mode){
    case "light":
      icon="night";
      break;
    case "night":
      icon="light";
      break;
  }
  if (size.matches) { // If media query matches
    document.getElementById(icon).style.visibility="hidden";
    document.getElementById("down").style.visibility="hidden";
  } else {
    document.getElementById(icon).style.visibility="visible";
    document.getElementById("down").style.visibility="visible";
  }
}



function activateNavigation() {
    const sections = document.querySelectorAll("section");
    const navContainer = document.createElement("nav");

    const navItems = Array.from(sections).map((section) => {
      let current= "Dot-".concat(section.id);
      if(section.id!="Home"){
        return `
                      <div class="dot-item" data-for-section="${section.id}">
                          
                          <a  href="#${section.id}" class="dot"><img class="dot-img" id="${current}" src="./assets/${section.id}.png"></a>
                          
                      </div>
                  `;
      }else{
        return `
                      <div class="dot-item" data-for-section="${section.id}">
                          
                          <a  href="#Portfolio" class="dot"><img class="dot-img" id="${current}" src="./assets/${section.id}.png"></a>
                          
                      </div>
                  `;
      }

    });
    //navItems.shift(); //delete home

    navContainer.classList.add("nav");
    navContainer.innerHTML = navItems.join("");
  
    const observer = new IntersectionObserver(
      (entries) => {       
        const visibleSection = entries.filter((entry) => entry.isIntersecting)[0];

        if (visibleSection != undefined && visibleSection.target.id!="Home"){
          color(visibleSection.target.id);
          selectedDot(visibleSection.target.id);
        } else if (visibleSection != undefined && visibleSection.target.id=="Home"){
          selectedDot(visibleSection.target.id);
          uncolor();
        }

        if (visibleSection == undefined && currentTab=="AboutMe" && entries[0].target.classList[0]!="name" && entries[0].target.classList[0]!="MyProjects"){ //getting out of AboutMe
          color("MyProjects")
          selectedDot("MyProjects");
        } else if(visibleSection == undefined && currentTab=="Contact" && entries[0].target.classList[0]!="MyProjects"){ //getting out of contact
          color("MyProjects");
          selectedDot("MyProjects");
        }
      },
      { threshold: 0.25 }
    );
  
    sections.forEach((section) => observer.observe(section));
  
    document.body.appendChild(navContainer);
  }

    function dots(){ 
      // shows image when hover
      let dots = document.getElementsByClassName("dot-img");
      for(let i=0; i < dots.length; i++){
        dots[i].onmouseover= function(){
          dots[i].style.backgroundColor="transparent";
        }

        let tabs=["Home", "AboutMe", "MyProjects", "Contact"];
        dots[i].onmouseout= function(){
          if(currentTab!=tabs[i]){
            if(mode=="light"){
              dots[i].style.backgroundColor= "#233142";
            } else{
              dots[i].style.backgroundColor= "white";
            }
          }
        }
      }
  }

  
  function color(id){
    // color the current Tab on the navigation bar
    uncolor();

    let current= "Nav-".concat(id);
   document.getElementById(current).style.color="#74a2dc";

   let current2= "Burger-".concat(id);
   document.getElementById(current2).style.color="#74a2dc";
  }

  function uncolor(){
    // uncolor the tabs on the navigation bar
    let nav = document.getElementsByClassName("navigate");

    for(let i=0; i<nav.length; i++){
      nav[i].style.color="white";
    }
  }

  function selectedDot(id){
    //show image in dot of current Tab and make bigger
    currentTab=id;


    unselectedDot();
    let current= "Dot-".concat(id);
    document.getElementById(current).style.transform= "scale(1.7)";
    document.getElementById(current).style.backgroundColor= "transparent";
  }

  function unselectedDot(){
    //return dot to initial state (background and size)

    let dots = document.getElementsByClassName("dot-img");
    for(let i=0; i<dots.length; i++){
      dots[i].style.transform="scale(1)";
      if(mode=="light"){
        dots[i].style.backgroundColor="#233142";
      } else{
        dots[i].style.backgroundColor= "white";
      }
    }
  }

  function showMenu(){
    //open Burger Menu
    visible=true;
    document.getElementById("burger-tags").style.visibility="visible";
    if(mode=="night"){
      document.getElementById("burger-light").style.visibility="visible";
      document.getElementById("burger-night").style.visibility="hidden";
    } else {
      document.getElementById("burger-night").style.visibility="visible";
      document.getElementById("burger-light").style.visibility="hidden";
    }
    document.getElementById("Back").style.visibility="visible";

    var body = document.getElementById("Portfolio");
    body.classList.add("body-background");

    document.getElementById("languages").style.visibility="visible";
    document.getElementById("languages").style.backgroundColor="transparent";
  }

  function hideMenu(){
    //close Burger Menu
    visible=false;
    document.getElementById("burger-tags").style.visibility="hidden";
    document.getElementById("burger-light").style.visibility="hidden";
    document.getElementById("Back").style.visibility="hidden";
    document.getElementById("languages").style.visibility="hidden";

    var body = document.getElementById("Portfolio");
    body.classList.remove("body-background");
  }

  function menu(){
    //the Burger Menu icon was clicked
    if(visible){
      hideMenu();
    }else{
      showMenu();
    }
  }

  function nightMode(){
    //change colors to match night mode

    let text = document.getElementsByClassName('black');

    for (let i=0; i < text.length; i++) {
      text[i].style.color = "white";
    }


    document.getElementsByClassName("AboutMe")[0].style.backgroundColor="#233142";
    document.getElementsByClassName("white")[0].style.backgroundColor="#233142";
    document.getElementsByClassName("grey")[0].style.backgroundColor="#233142";

    let triangle=document.getElementsByClassName("triangle");

    for (let i=0; i < triangle.length; i++) {
      triangle[i].style.visibility="hidden";
    }

    if(visible){
      document.getElementById("burger-night").style.visibility="hidden";
      document.getElementById("burger-light").style.visibility="hidden";
    }else{
      document.getElementById("night").style.visibility="hidden";
      document.getElementById("light").style.visibility="visible";
    }
    

    let url=["url(./assets/Home-night.png)", "url(./assets/AboutMe-night.png)", "url(./assets/MyProjects-night.png)", "url(./assets/Contact-night.png)"];
    let dots = document.getElementsByClassName("dot-img");
    for(let i=0; i<dots.length; i++){
      dots[i].style.backgroundColor= "white";
      dots[i].style.content= url[i];
    }
    if(currentTab!=null){
      selectedDot(currentTab);
    }
    
    
  }

  function lightMode(){
    //change colors to match night mode

    let text = document.getElementsByClassName('black');

    for (let i=0; i < text.length; i++) {
      text[i].style.color = "black";
    }

    document.getElementsByClassName("AboutMe")[0].style.backgroundColor="white";
    document.getElementsByClassName("white")[0].style.backgroundColor="white";
    document.getElementsByClassName("grey")[0].style.backgroundColor="#f5f5f5";

    let triangle=document.getElementsByClassName("triangle");

    for (let i=0; i < triangle.length; i++) {
      triangle[i].style.visibility="visible";
    }

    if(visible){
      document.getElementById("burger-light").style.visibility="hidden";
      document.getElementById("burger-night").style.visibility="hidden";
    }else{
      document.getElementById("light").style.visibility="hidden";
      document.getElementById("night").style.visibility="visible";
    }
    

    let url=["url(./assets/Home.png)", "url(./assets/AboutMe.png)", "url(./assets/MyProjects.png)", "url(./assets/Contact.png)"];
    let dots = document.getElementsByClassName("dot-img");
    for(let i=0; i<dots.length; i++){
      dots[i].style.backgroundColor= "#233142";
      dots[i].style.content= url[i];
    }

    if(currentTab!=null){
      selectedDot(currentTab);
    }

  }

  function colorMode(){
    if(mode=="light"){
      mode="night";
      nightMode();
    } else{
      mode="light";
      lightMode();
    }
    localStorage.setItem("color", mode);
  }




  function languages(){ //show languages to choose
    if(visible){
      hideMenu();
    }else if(lanVisible && !visible){
      lanVisible=false;
      document.getElementsByClassName("languages")[0].style.visibility="hidden";
      document.getElementById("up").style.visibility="hidden";
      document.getElementById("down").style.visibility="visible";
    }else {
      lanVisible=true;
      document.getElementsByClassName("languages")[0].style.visibility="visible";
      document.getElementById("up").style.visibility="visible";
      document.getElementById("down").style.visibility="hidden";
    }
  }

  function spanish(){
    currentLan="es";
    localStorage.setItem("language", currentLan);

    document.getElementById("selected").textContent=currentLan;
    document.getElementById("es").style.color="#74a2dc";
    document.getElementById("cat").style.color="white";
    document.getElementById("en").style.color="white";

    //tags
    document.getElementById("Nav-AboutMe").textContent= es.tags[0];
    document.getElementById("Nav-MyProjects").textContent= es.tags[1];
    document.getElementById("Nav-Contact").textContent= es.tags[2];
    document.getElementById("Nav-CV").textContent= es.tags[3];
    document.getElementById("Nav-CV").href= "./assets/CV_Español.pdf";

    //burger menu
    document.getElementById("Burger-AboutMe").textContent= es.tags[0];
    document.getElementById("Burger-MyProjects").textContent= es.tags[1];
    document.getElementById("Burger-Contact").textContent= es.tags[2];
    document.getElementById("Burger-CV").textContent= es.tags[3];
    document.getElementById("Burger-CV").href= "./assets/CV_Español.pdf";

    //about me
    document.getElementById("AboutMe-info").childNodes[1].textContent=es.aboutme[0].title;
    document.getElementById("AboutMe-info").childNodes[6].textContent=es.aboutme[0].info;

    //my projects
    document.getElementById("MyProjects-title").textContent=es.myprojects[0].title;

    document.getElementById("Project-title1").childNodes[0].textContent=es.myprojects[0].projects[0].title;
    document.getElementById("Project-info1").textContent=es.myprojects[0].projects[0].info;
    document.getElementById("Project-technologies1").textContent=es.myprojects[0].projects[0].technologies;

    document.getElementById("Project-title2").childNodes[0].textContent=es.myprojects[0].projects[1].title;
    document.getElementById("Project-info2").textContent=es.myprojects[0].projects[1].info;
    document.getElementById("Project-technologies2").textContent=es.myprojects[0].projects[1].technologies;

    document.getElementById("Project-title3").childNodes[0].textContent=es.myprojects[0].projects[2].title;
    document.getElementById("Project-CV-link").href="./assets/CV_Español.pdf";
    document.getElementById("Project-technologies3").textContent=es.myprojects[0].projects[2].technologies;

    document.getElementById("Project-title4").childNodes[0].textContent=es.myprojects[0].projects[3].title;
    document.getElementById("Project-technologies4").textContent=es.myprojects[0].projects[3].technologies;

    //contact
    document.getElementById("Contact-title").textContent=es.contact[0].title;
    document.getElementById("Contact-mail").textContent=es.contact[0].mail;
    document.getElementById("Contact-linkedin").textContent=es.contact[0].linkedin;
    document.getElementById("Contact-github").textContent=es.contact[0].github;

    //credits
    document.getElementById("credits").childNodes[0].textContent=es.credits;
    
  }


  function catalan(){
    currentLan="cat";
    localStorage.setItem("language", currentLan);

    document.getElementById("selected").textContent=currentLan;
    document.getElementById("cat").style.color="#74a2dc";
    document.getElementById("es").style.color="white";
    document.getElementById("en").style.color="white";

    //tags
    document.getElementById("Nav-AboutMe").textContent= cat.tags[0];
    document.getElementById("Nav-MyProjects").textContent= cat.tags[1];
    document.getElementById("Nav-Contact").textContent= cat.tags[2];
    document.getElementById("Nav-CV").textContent= cat.tags[3];
    document.getElementById("Nav-CV").href= "./assets/CV_Català.pdf";

    //burger menu
    document.getElementById("Burger-AboutMe").textContent= cat.tags[0];
    document.getElementById("Burger-MyProjects").textContent= cat.tags[1];
    document.getElementById("Burger-Contact").textContent= cat.tags[2];
    document.getElementById("Burger-CV").textContent= cat.tags[3];
    document.getElementById("Burger-CV").href= "./assets/CV_Català.pdf";

    //about me
    document.getElementById("AboutMe-info").childNodes[1].textContent=cat.aboutme[0].title;
    document.getElementById("AboutMe-info").childNodes[6].textContent=cat.aboutme[0].info;

    //my projects
    document.getElementById("MyProjects-title").textContent=cat.myprojects[0].title;

    document.getElementById("Project-title1").childNodes[0].textContent=cat.myprojects[0].projects[0].title;
    document.getElementById("Project-info1").textContent=cat.myprojects[0].projects[0].info;
    document.getElementById("Project-technologies1").textContent=cat.myprojects[0].projects[0].technologies;

    document.getElementById("Project-title2").childNodes[0].textContent=cat.myprojects[0].projects[1].title;
    document.getElementById("Project-info2").textContent=cat.myprojects[0].projects[1].info;
    document.getElementById("Project-technologies2").textContent=cat.myprojects[0].projects[1].technologies;

    document.getElementById("Project-title3").childNodes[0].textContent=cat.myprojects[0].projects[2].title;
    document.getElementById("Project-CV-link").href="./assets/CV_Català.pdf";
    document.getElementById("Project-technologies3").textContent=cat.myprojects[0].projects[2].technologies;

    document.getElementById("Project-title4").childNodes[0].textContent=cat.myprojects[0].projects[3].title;
    document.getElementById("Project-technologies4").textContent=cat.myprojects[0].projects[3].technologies;

    //contact
    document.getElementById("Contact-title").textContent=cat.contact[0].title;
    document.getElementById("Contact-mail").textContent=cat.contact[0].mail;
    document.getElementById("Contact-linkedin").textContent=cat.contact[0].linkedin;
    document.getElementById("Contact-github").textContent=cat.contact[0].github;

    //credits
    document.getElementById("credits").childNodes[0].textContent=cat.credits;
  }

  function english(){
    currentLan="en";
    localStorage.setItem("language", currentLan);

    document.getElementById("selected").textContent=currentLan;
    document.getElementById("en").style.color="#74a2dc";
    document.getElementById("es").style.color="white";
    document.getElementById("cat").style.color="white";

    //tags
    document.getElementById("Nav-AboutMe").textContent= en.tags[0];
    document.getElementById("Nav-MyProjects").textContent= en.tags[1];
    document.getElementById("Nav-Contact").textContent= en.tags[2];
    document.getElementById("Nav-CV").textContent= en.tags[3];
    document.getElementById("Nav-CV").href= "./assets/CV_English.pdf";

    //burger menu
    document.getElementById("Burger-AboutMe").textContent= en.tags[0];
    document.getElementById("Burger-MyProjects").textContent= en.tags[1];
    document.getElementById("Burger-Contact").textContent= en.tags[2];
    document.getElementById("Burger-CV").textContent= en.tags[3];
    document.getElementById("Burger-CV").href= "./assets/CV_English.pdf";

    //about me
    document.getElementById("AboutMe-info").childNodes[1].textContent=en.aboutme[0].title;
    document.getElementById("AboutMe-info").childNodes[6].textContent=en.aboutme[0].info;

    //my projects
    document.getElementById("MyProjects-title").textContent=en.myprojects[0].title;

    document.getElementById("Project-title1").childNodes[0].textContent=en.myprojects[0].projects[0].title;
    document.getElementById("Project-info1").textContent=en.myprojects[0].projects[0].info;
    document.getElementById("Project-technologies1").textContent=en.myprojects[0].projects[0].technologies;

    document.getElementById("Project-title2").childNodes[0].textContent=en.myprojects[0].projects[1].title;
    document.getElementById("Project-info2").textContent=en.myprojects[0].projects[1].info;
    document.getElementById("Project-technologies2").textContent=en.myprojects[0].projects[1].technologies;

    document.getElementById("Project-title3").childNodes[0].textContent=en.myprojects[0].projects[2].title;
    document.getElementById("Project-CV-link").href="./assets/CV_English.pdf";
    document.getElementById("Project-technologies3").textContent=en.myprojects[0].projects[2].technologies;

    document.getElementById("Project-title4").childNodes[0].textContent=cat.myprojects[0].projects[3].title;
    document.getElementById("Project-technologies4").textContent=cat.myprojects[0].projects[3].technologies;

    //contact
    document.getElementById("Contact-title").textContent=en.contact[0].title;
    document.getElementById("Contact-mail").textContent=en.contact[0].mail;
    document.getElementById("Contact-linkedin").textContent=en.contact[0].linkedin;
    document.getElementById("Contact-github").textContent=en.contact[0].github;

    //credits
    document.getElementById("credits").childNodes[0].textContent=en.credits;
  }
  


