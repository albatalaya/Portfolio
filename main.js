//import './style.css'
/*import data from './data.json';



let info=data;
console.log(info.name);*/ 

let currentTab;

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
          uncolor();
        }
      },
      { threshold: 0.25 }
    );
  
    sections.forEach((section) => observer.observe(section));
  
    document.body.appendChild(navContainer);
  }

  activateNavigation();

  document.getElementById("Dot-Home").onmouseover= function(){
    document.getElementById("Dot-Home").style.backgroundColor= "transparent";
  }

  document.getElementById("Dot-AboutMe").onmouseover= function(){
    document.getElementById("Dot-AboutMe").style.backgroundColor= "transparent";
  }

  document.getElementById("Dot-MyProjects").onmouseover= function(){
    document.getElementById("Dot-MyProjects").style.backgroundColor= "transparent";
  }

  document.getElementById("Dot-Contact").onmouseover= function(){
    document.getElementById("Dot-Contact").style.backgroundColor= "transparent";
  }

  document.getElementById("Dot-Home").onmouseout= function(){
    if(currentTab!="Home"){
      document.getElementById("Dot-Home").style.backgroundColor= "#233142";
    }
  }

  document.getElementById("Dot-AboutMe").onmouseout= function(){
    if(currentTab!="AboutMe"){
      document.getElementById("Dot-AboutMe").style.backgroundColor= "#233142";
    }
  }

  document.getElementById("Dot-MyProjects").onmouseout= function(){
    if(currentTab!="MyProjects"){
      document.getElementById("Dot-MyProjects").style.backgroundColor= "#233142";
    }
  }
  document.getElementById("Dot-Contact").onmouseout= function(){
    if(currentTab!="Contact"){
      document.getElementById("Dot-Contact").style.backgroundColor= "#233142";
    }
  }




  function color(id){
    uncolor();
    let current= "Nav-".concat(id);
   document.getElementById(current).style.color="#74a2dc";
  }

  function uncolor(){
   document.getElementById("Nav-AboutMe").style.color="white";
   
   document.getElementById("Nav-MyProjects").style.color="white";
   
   document.getElementById("Nav-Contact").style.color="white";
  }

  function selectedDot(id){
    currentTab=id;
    unselectedDot();
    let current= "Dot-".concat(id);
    document.getElementById(current).style.transform= "scale(1.7)";
    document.getElementById(current).style.backgroundColor= "transparent";
  }

  function unselectedDot(){
    document.getElementById("Dot-AboutMe").style.transform= "scale(1)";
    document.getElementById("Dot-AboutMe").style.backgroundColor= "#233142";

    document.getElementById("Dot-MyProjects").style.transform= "scale(1)";
    document.getElementById("Dot-MyProjects").style.backgroundColor= "#233142";

    document.getElementById("Dot-Contact").style.transform= "scale(1)";
    document.getElementById("Dot-Contact").style.backgroundColor= "#233142";
  }