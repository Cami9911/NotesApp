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


function displayModal(idModal, idCloseModal, noteID) {

  document.getElementsByClassName("dropdown-content")[0].classList.remove('show');

  if (noteID) {
    document.getElementsByClassName('note-form').id = noteID;

    var editTitle = document.getElementById('note-title' + noteID).innerHTML;
    var editContent = document.getElementById('note-content' + noteID).innerHTML;

    document.getElementById('editTitle').value = editTitle;
    document.getElementById('editContent').innerHTML = editContent;
  }

  var modal = document.getElementById(idModal);
  var span = document.getElementById(idCloseModal);


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

    const image = document.createElement("div");
    image.style.height = "150px";
    image.innerHTML = `<img src="data:${img.image.contentType};base64,${toBase64(img.image.data.data)}" class="imageDim" onclick='seeImage(${JSON.stringify(img)})'></img>`;

    const imgGrid = document.getElementById(gridId);
    imgGrid?.appendChild(image);
  })
}

function seeImage(img){
  const image = document.getElementById("imgModal");
  image.innerHTML = `<img src="data:${img.image.contentType};base64,${toBase64(img.image.data.data)}" class="imageDim"></img>`;

  displayModal('seeImageModal', 'closeSeeImageModal', null);
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

    const item = document.createElement('div');
    item.classList.add("note-item");
    
    createDeleteEditAndDate(note, noteID, item, 'delete-note', 'editNoteModal', 'closeEditModal');

    item.appendChild(title);
    item.appendChild(content);

    const noteGrid = document.getElementById(gridId);
    noteGrid?.appendChild(item);
  });
}

window.addEventListener("load", function () {
  getData('recent-notes', "note-grid-recently");
  getData('favourite-notes', "note-grid-favourite")
  getData('important-notes', "note-grid-important")
  getData('all-notes', "note-grid-all-notes")
  getImages('get-image', "note-grid-images")
  getLists('all-lists', "note-grid-lists")

  openTabParam('images','imgTab')
  openTabParam('lists','listTab')
});

function openTabParam(reqParam, idTab){
  
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get('tab');
  var doc = document.getElementById(idTab);

  if(myParam == reqParam && doc){
    doc.click();
  }

}

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

async function getLists(url, gridId) {
  try {
    let res = await fetch('http://localhost:3000/' + url);
    displayLists(await res.json(), gridId);
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

function goToTab(param){
  const urlParams = new URL("http://localhost:3000/notes.html");
  urlParams.searchParams.set('tab', param);
  window.location = urlParams;
}

function remove(e){
  e.parentNode.parentNode.removeChild(e.parentNode);
}

var i=1;
function createNewItemList(){
  var div = document.createElement('div');
  div.style.display = 'flex';

  var checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.name = 'checkboxItem'+i;
  checkbox.classList.add('checkboxList');
  checkbox.addEventListener("click", function () { checkText(checkbox, input) }, false);

  var input = document.createElement('input');
  input.classList.add('inputForm');
  input.name = 'content'+i;

  var remove = document.createElement('i');
  remove.className ="fa-solid fa-xmark removeItemList";
  remove.addEventListener("click", function () { div.remove() }, false);

  div.appendChild(checkbox);
  div.appendChild(input);
  div.appendChild(remove);

  var button = document.getElementById('addListItem');
  button.parentNode.insertBefore(div, button)
  i++;
}

function checkText(checkbox, input){
  if(!input)
    var input = document.getElementById('noteContent1')

  if(checkbox.checked){
    input.style.textDecoration = 'line-through'
  }
  else{
    input.style.textDecoration = 'none'
  }
}

function getListValues(event) {
  event.preventDefault();

  var favourite = false;
  var important = false;

  const formData = new FormData(document.getElementById('addNewListForm'));
  const data = Object.fromEntries(formData);

  var contentArr = {};
  var checkedArr = {};
  var sendData = {};

  console.log('data', data)

  var j=0, k=0;
  for (var i in data){
    console.log(i)
    if(i.includes('content')){
      contentArr[j] = data[i];
      j++
    }
    else
    if(i.includes('checkboxItem')){
      checkedArr[j] = data[i];
      k++
    }
  }

  if(getStyleElementById("favSelected1").display == "inline-block"){
    favourite = true;
  }
  if(getStyleElementById("impSelected1").display == "inline-block"){
    important = true;
  }

  data["favourite"] = favourite;
  data["important"] = important;

  sendData = {
    'title': data.title,
    'content': contentArr,
    'checked': checkedArr,
    'important': important,
    'favourite': favourite
  }

  postData(sendData, 'add-list')
}

function displayLists(allLists, gridId) {

  allLists.forEach(list => {
    const item = document.createElement('div');
    item.classList.add("note-item");
    var listID = list._id;

    const title = document.createElement("p");
    title.classList.add("note-title");
    title.id = 'list-title' + listID;
    title.innerText = list.title;

    item.appendChild(title);

    for (var key in list.content) {

      var div = document.createElement('div');
      div.style.display = 'flex';
      div.className = 'list-content'

      var checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.disabled = true;
      checkbox.classList.add('checkboxListView');
      checkbox.addEventListener("click", function () { checkText(checkbox, input) }, false);

      if (list.checked[key]) {
        checkbox.checked = true;
      } else {
        checkbox.checked = false;
      }

      var input = document.createElement('p');
      input.innerText = list.content[key];

      div.appendChild(checkbox);
      div.appendChild(input);

      item.appendChild(div);

    }

    createDeleteEditAndDate(list, listID, item);

    const listGrid = document.getElementById(gridId);
    listGrid?.appendChild(item);
  })

}

function createDeleteEditAndDate(item, itemID, parent, idDelNote, idEditNote, idCloseModal) {
  const date = document.createElement('p');
  date.classList.add("note-date");
  var d = new Date(item.createdAt)
  date.innerText = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();

  var iconDelete = document.createElement("i");
  iconDelete.className = "fa-solid fa-trash deleteIcon"
  iconDelete.id = itemID;
  iconDelete.style.display = 'none';
  iconDelete.style.top = '10px';
  iconDelete.addEventListener("click", function () { deleteData(idDelNote, itemID); }, false)

  var iconEdit = document.createElement("i");
  iconEdit.className = "fa-solid fa-edit editIcon"
  iconEdit.id = 'edit' + itemID;
  iconEdit.style.display = 'none';
  iconEdit.style.top = '10px';
  iconEdit.addEventListener("click", function () { displayModal(idEditNote, idCloseModal, itemID); }, false)

  parent.addEventListener("mouseover", function () { displayIcon(itemID) });
  parent.addEventListener('mouseout', function () { hideIcon(itemID) });
  parent.addEventListener("mouseover", function () { displayIcon('edit' + itemID) });
  parent.addEventListener('mouseout', function () { hideIcon('edit' + itemID) });

  parent.appendChild(date)
  parent.appendChild(iconDelete)
  parent.appendChild(iconEdit)
}