/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("closebtn").style.display = "block";
    document.getElementById("openbtn").style.display = "none";
 
    for(var i=1; i<=4; i++){
      document.getElementById("sidebarTitle"+i).style.display = "block";
      document.getElementById("sidebarOption"+i).style.paddingLeft = "36px";
    }
  }
  
  /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
  function closeNav() {
    document.getElementById("mySidebar").style.width = "50px";
    document.getElementById("main").style.marginLeft = "50px";
    document.getElementById("closebtn").style.display = "none";
    document.getElementById("openbtn").style.display = "block";

    for(var i=1; i<=4; i++){
      document.getElementById("sidebarTitle"+i).style.display = "none";
      document.getElementById("sidebarOption"+i).style.paddingLeft = "2px";
    }
  }