
let currentTab;
let visible=false;

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

  //bug projects not working
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
    //bug burger menu hide when clicked on current section
    hideMenu();
    uncolor();
    let current= "Nav-".concat(id);
   document.getElementById(current).style.color="#74a2dc";

   let current2= "Burger-".concat(id);
   document.getElementById(current2).style.color="#74a2dc";
  }

  function uncolor(){

   document.getElementById("Nav-AboutMe").style.color="white";
   
   document.getElementById("Nav-MyProjects").style.color="white";
   
   document.getElementById("Nav-Contact").style.color="white";

   document.getElementById("Burger-AboutMe").style.color="white";
   
   document.getElementById("Burger-MyProjects").style.color="white";
   
   document.getElementById("Burger-Contact").style.color="white";
   hideMenu();

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

  function showMenu(){
    visible=true;
    document.getElementById("burger-tags").style.visibility="visible";
    document.getElementById("Back").style.visibility="visible";

    var body = document.getElementById("Portfolio");
    body.classList.add("body-background");
  }

  function hideMenu(){
    visible=false;
    document.getElementById("burger-tags").style.visibility="hidden";
    document.getElementById("Back").style.visibility="hidden";

    var body = document.getElementById("Portfolio");
    body.classList.remove("body-background");
  }

  function menu(){
    if(visible){
      hideMenu();
    }else{
      showMenu();
    }
  }

  document.getElementById("burger-menu").addEventListener("click", menu);

