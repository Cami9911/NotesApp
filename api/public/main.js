function getStyleElementById(id){
  return document.getElementById(id).style;
}

/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
  getStyleElementById("mySidebar").width = "250px";
  getStyleElementById("main").marginLeft = "250px";
  getStyleElementById("closebtn").display = "block";
  getStyleElementById("openbtn").display = "none";

  for (var i = 1; i <= 4; i++) {
    getStyleElementById("sidebarTitle" + i).display = "block";
    getStyleElementById("sidebarOption" + i).paddingLeft = "36px";
  }
}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
  getStyleElementById("mySidebar").width = "50px";
  getStyleElementById("main").marginLeft = "50px";
  getStyleElementById("closebtn").display = "none";
  getStyleElementById("openbtn").display = "block";

  for (var i = 1; i <= 4; i++) {
    getStyleElementById("sidebarTitle" + i).display = "none";
    getStyleElementById("sidebarOption" + i).paddingLeft = "2px";
  }
}

function hideIcon(id) {
  getStyleElementById(id).display = "none";
}

function displayIcon(id) {
  getStyleElementById(id).display = "block";
}


function openTab(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  getStyleElementById(cityName).display = "block";
  evt.currentTarget.className += " active";
}
if(document.getElementById("defaultOpen"))
  document.getElementById("defaultOpen").click();


function displayModal(idModal, classModal, noteID) {
  document.getElementsByClassName("dropdown-content")[0].classList.remove('show');


  if (noteID) {
    document.getElementsByClassName('note-form').id = noteID;

    var editTitle = document.getElementById('note-title' + noteID).innerHTML;
    var editContent = document.getElementById('note-content' + noteID).innerHTML;

    document.getElementById('editTitle').value = editTitle;
    document.getElementById('editContent').innerHTML = editContent;
  }

  var modal = document.getElementById(idModal);
  var span = document.getElementsByClassName(classModal)[0];


  modal.style.display = "block";

  span.onclick = function () {
    modal.style.display = "none";
  }

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

function closeModal(idModal) {
  getStyleElementById(idModal).display = "none";
}
function toBase64(arr) {
  //arr = new Uint8Array(arr) if it's an ArrayBuffer
  return btoa(
     arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
  );
}

function displayImages(images, gridId){
  images.forEach(img => {

    console.log(img.image)

    const image = document.createElement("div");
    image.innerHTML = `<img src="data:${img.image.contentType};base64,${toBase64(img.image.data.data)}" style="width:128px;height:128px;"></img>`;

    const imgGrid = document.getElementById(gridId);
    imgGrid.appendChild(image);
  })
}

function getNotes(notes, gridId) {

  notes.forEach(note => {

    var noteID = note._id;

    const title = document.createElement("p");
    title.classList.add("note-title");
    title.id = 'note-title' + noteID;
    title.innerText = note.title;

    const content = document.createElement("p");
    content.classList.add("note-content");
    content.id = 'note-content' + noteID;
    content.innerText = note.content;

    var iconDelete = document.createElement("i");
    iconDelete.className = "fa-solid fa-trash deleteIcon"
    iconDelete.id = noteID;
    iconDelete.style.display = 'none';
    iconDelete.addEventListener("click", function () { deleteData('delete-note', noteID); }, false)

    var iconEdit = document.createElement("i");
    iconEdit.className = "fa-solid fa-edit editIcon"
    iconEdit.id = 'edit' + noteID;
    iconEdit.style.display = 'none';
    iconEdit.addEventListener("click", function () { displayModal('editNoteModal', 'closeEditModal', noteID); }, false)
    // iconEdit.innerHTML = `<i class="fa-solid fa-edit editIcon" aria-hidden="true" onclick="displayModal('editNoteModal','closeEditModal')" id=${noteID}></i>`;

    const item = document.createElement('div');
    item.classList.add("note-item");

    item.appendChild(iconEdit);
    item.appendChild(iconDelete);
    item.appendChild(title);
    item.appendChild(content);

    item.addEventListener("mouseover", function () { displayIcon(noteID) });
    item.addEventListener('mouseout', function () { hideIcon(noteID) });
    item.addEventListener("mouseover", function () { displayIcon('edit' + noteID) });
    item.addEventListener('mouseout', function () { hideIcon('edit' + noteID) });


    const noteGrid = document.getElementById(gridId);
    noteGrid.appendChild(item);
  });
}

window.addEventListener("load", function () {
  getData('recent-notes', "note-grid-recently");
  getData('favourite-notes', "note-grid-favourite")
  getData('important-notes', "note-grid-important")
  getData('all-notes', "note-grid-all-notes")
  getImages('get-image', "note-grid-images")
});

async function getData(url, gridId) {
  try {
    let res = await fetch('http://localhost:3000/' + url);
    getNotes(await res.json(), gridId);
  } catch (error) {
    console.log(error);
  }
}

async function getImages(url, gridId) {
  try {
    let res = await fetch('http://localhost:3000/' + url);
    displayImages(await res.json(), gridId);
  } catch (error) {
    console.log(error);
  }
}


function postData(data, url) {
  fetch('http://localhost:3000/' + url, {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then(() => {
      location.reload();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function getFormValues(event) {
  event.preventDefault();

  var favourite = false;
  var important = false;

  const formData = new FormData(document.getElementById('addNewNoteForm'));
  const data = Object.fromEntries(formData);

  if(getStyleElementById("favSelected").display == "inline-block"){
    favourite = true;
  }
  if(getStyleElementById("impSelected").display == "inline-block"){
    important = true;
  }

  data["favourite"] = favourite;
  data["important"] = important;

  postData(data, 'add-note')

}

function deleteData(url, id) {
  fetch('http://localhost:3000/' + url + '/' + id, {
    method: 'delete'
  })
    .then((response) => response.json())
    .then(() => {
      location.reload();
    })
    .catch((error) => {
      console.error('Error:', error);
    });

}

function updateData(url, id, data) {
  fetch('http://localhost:3000/' + url + '/' + id, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then(() => {
      location.reload();
    })
    .catch((error) => {
      console.error('Error:', error);
    });

}

function updateNote(event) {
  event.preventDefault();

  const formData = new FormData(document.getElementById('editNoteForm'));
  const data = Object.fromEntries(formData);

  var noteID = document.getElementsByClassName('note-form').id;

  updateData('update-note', noteID, data);
}

function openDropdown() {
  document.getElementById("addDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches('.add-button')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

function enableIcon(iconEnable,iconDisable){
  getStyleElementById(iconEnable).display = "inline-block";
  getStyleElementById(iconDisable).display = "none";
}

function disableIcon(iconEnable,iconDisable){
  document.getElementById(iconDisable).style.display = "none";
  document.getElementById(iconEnable).style.display = "inline-block";
}

function goToImages(){
  window.location = 'notes.html';
  document.getElementById("notesTab").click();
}