/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
  document.getElementById("closebtn").style.display = "block";
  document.getElementById("openbtn").style.display = "none";

  for (var i = 1; i <= 4; i++) {
    document.getElementById("sidebarTitle" + i).style.display = "block";
    document.getElementById("sidebarOption" + i).style.paddingLeft = "36px";
  }
}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("mySidebar").style.width = "50px";
  document.getElementById("main").style.marginLeft = "50px";
  document.getElementById("closebtn").style.display = "none";
  document.getElementById("openbtn").style.display = "block";

  for (var i = 1; i <= 4; i++) {
    document.getElementById("sidebarTitle" + i).style.display = "none";
    document.getElementById("sidebarOption" + i).style.paddingLeft = "2px";
  }
}

function hideIcon(id) {
  document.getElementById(id).style.display = "none";
}

function displayIcon(id) {
  document.getElementById(id).style.display = "block";
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


function displayModal(idModal, classModal) {
  console.log(idModal)
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

function getAllNotes(notes) {

  notes.forEach(note => {

    var noteID = note._id;

    const title = document.createElement("p");
    title.classList.add("note-title");
    title.innerText = note.title;

    const content = document.createElement("p");
    content.classList.add("note-content");
    content.innerText = note.content;

    var iconDelete = document.createElement("i");
    iconDelete.className = "fa-solid fa-trash deleteIcon"
    iconDelete.id = noteID;
    iconDelete.style.display = 'none';
    iconDelete.addEventListener("click", function () { deleteData('delete-note', noteID); }, false)

    var iconEdit = document.createElement("i");
    iconEdit.className = "fa-solid fa-edit editIcon"
    iconEdit.id = 'edit'+noteID;
    iconEdit.style.display = 'none';
    iconEdit.addEventListener("click", function () { displayModal('editNoteModal','closeEditModal'); }, false)
    // iconEdit.innerHTML = `<i class="fa-solid fa-edit editIcon" aria-hidden="true" onclick="displayModal('editNoteModal','closeEditModal')" id=${noteID}></i>`;

    const item = document.createElement('div');
    item.classList.add("note-item");
  
    item.appendChild(iconEdit);
    item.appendChild(iconDelete);
    item.appendChild(title);
    item.appendChild(content);

    item.addEventListener("mouseover", function () { displayIcon(noteID) });
    item.addEventListener('mouseout', function () { hideIcon(noteID) });
    item.addEventListener("mouseover", function () { displayIcon('edit'+noteID) });
    item.addEventListener('mouseout', function () { hideIcon('edit'+noteID) });

    const noteGrid = document.getElementById("note-grid-recently");
    noteGrid.appendChild(item);
  });
}

window.addEventListener("load", getData('notes'));

async function getData(url) {
  try {
    let res = await fetch('http://localhost:3000/' + url);
    getAllNotes(await res.json());
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

  const formData = new FormData(document.getElementById('addNewNoteForm'));
  const data = Object.fromEntries(formData);

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