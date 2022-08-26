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

  function hideIcon() {
    document.getElementById("searchIcon").style.display = "none";
  }

  function displayIcon() {
    document.getElementById("searchIcon").style.display = "block";
  }

  function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }
  document.getElementById("defaultOpen").click();

  var modal = document.getElementById("addNewNoteModal");

// Get the button that opens the modal
var btn = document.getElementById("addNewNoteBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("closeModal")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}