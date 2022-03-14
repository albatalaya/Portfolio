
let currentTab;
let visible=false;
let mode= "light";

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

        //temp not optimal solution
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
      if(mode=="light"){
        document.getElementById("Dot-Home").style.backgroundColor= "#233142";
      } else{
        document.getElementById("Dot-Home").style.backgroundColor= "white";
      }
    }
  }

  document.getElementById("Dot-AboutMe").onmouseout= function(){
    if(currentTab!="AboutMe"){
      if(mode=="light"){
        document.getElementById("Dot-AboutMe").style.backgroundColor= "#233142";
      } else{
        document.getElementById("Dot-AboutMe").style.backgroundColor= "white";
      }
    }
  }

  document.getElementById("Dot-MyProjects").onmouseout= function(){
    if(currentTab!="MyProjects"){
      if(mode=="light"){
        document.getElementById("Dot-MyProjects").style.backgroundColor= "#233142";
      } else{
        document.getElementById("Dot-MyProjects").style.backgroundColor= "white";
      }
    }
  }
  document.getElementById("Dot-Contact").onmouseout= function(){
    if(currentTab!="Contact"){
      if(mode=="light"){
        document.getElementById("Dot-Contact").style.backgroundColor= "#233142";
      } else{
        document.getElementById("Dot-Contact").style.backgroundColor= "white";
      }
    }
  }




  function color(id){
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

  }

  function selectedDot(id){
    currentTab=id;
    unselectedDot();
    let current= "Dot-".concat(id);
    document.getElementById(current).style.transform= "scale(1.7)";
    document.getElementById(current).style.backgroundColor= "transparent";
  }

  function unselectedDot(){
    document.getElementById("Dot-Home").style.transform= "scale(1)";
    document.getElementById("Dot-AboutMe").style.transform= "scale(1)";
    document.getElementById("Dot-MyProjects").style.transform= "scale(1)";
    document.getElementById("Dot-Contact").style.transform= "scale(1)";
    
    if(mode=="light"){
      document.getElementById("Dot-Home").style.backgroundColor= "#233142";
      document.getElementById("Dot-AboutMe").style.backgroundColor= "#233142";
      document.getElementById("Dot-MyProjects").style.backgroundColor= "#233142";
      document.getElementById("Dot-Contact").style.backgroundColor= "#233142";
    } else{
      document.getElementById("Dot-Home").style.backgroundColor= "white";
      document.getElementById("Dot-AboutMe").style.backgroundColor= "white";
      document.getElementById("Dot-MyProjects").style.backgroundColor= "white";
      document.getElementById("Dot-Contact").style.backgroundColor= "white";
    }
  }

  function showMenu(){
    visible=true;
    document.getElementById("burger-tags").style.visibility="visible";
    if(mode=="night"){
      document.getElementById("burger-light").style.visibility="visible";
    }
    document.getElementById("Back").style.visibility="visible";

    var body = document.getElementById("Portfolio");
    body.classList.add("body-background");
  }

  function hideMenu(){
    visible=false;
    document.getElementById("burger-tags").style.visibility="hidden";
    document.getElementById("burger-light").style.visibility="hidden";
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

  function nightMode(){

    document.getElementById("burger-light").style.visibility="hidden";

    let text = document.getElementsByTagName('*');

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

    document.getElementById("burger-night").style.visibility="hidden";
    document.getElementById("burger-light").style.visibility="visible";

    document.getElementById("Dot-Home").style.backgroundColor= "white";
    document.getElementById("Dot-Home").style.content= "url(./assets/Home-night.png)";
    document.getElementById("Dot-AboutMe").style.backgroundColor= "white";
    document.getElementById("Dot-AboutMe").style.content= "url(./assets/AboutMe-night.png)";
    document.getElementById("Dot-MyProjects").style.backgroundColor= "white";
    document.getElementById("Dot-MyProjects").style.content= "url(./assets/MyProjects-night.png)";
    document.getElementById("Dot-Contact").style.backgroundColor= "white";
    document.getElementById("Dot-Contact").style.content= "url(./assets/Contact-night.png)";

    document.getElementById("burger-light").style.visibility="hidden";
  }

  function lightMode(){
    location.reload();
  }

  function colorMode(){
    if(mode=="light"){
      mode="night";
      nightMode();
    } else{
      mode="light";
      lightMode();
    }
  }
  



  document.getElementById("burger-menu").addEventListener("click", menu);
  document.getElementById("burger-tags").addEventListener("click", menu);

  document.getElementById("color-mode").addEventListener("click", colorMode);
  document.getElementById("burger-color-mode").addEventListener("click", colorMode);

  hideMenu();

