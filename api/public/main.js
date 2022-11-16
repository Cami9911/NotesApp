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
    var title = createTitle(note,'note-title');

    const content = document.createElement("p");
    content.classList.add("note-content");
    content.id = 'note-content' + noteID;
    content.innerText = note.content;

    var date = createDate(note);
    var iconDelete = createDeleteIcon(noteID,'delete-note');

    var iconEdit = createEditIcon(noteID);
    iconEdit.addEventListener("click", function () { displayModal('editNoteModal', 'closeEditModal', noteID); }, false)
    // iconEdit.innerHTML = `<i class="fa-solid fa-edit editIcon" aria-hidden="true" onclick="displayModal('editNoteModal','closeEditModal')" id=${noteID}></i>`;

    const item = document.createElement('div');
    item.classList.add("note-item");

    item.appendChild(iconEdit);
    item.appendChild(iconDelete);
    item.appendChild(title);
    item.appendChild(content);
    item.appendChild(date);

    item.addEventListener("mouseover", function () { displayIcon(noteID) });
    item.addEventListener('mouseout', function () { hideIcon(noteID) });
    item.addEventListener("mouseover", function () { displayIcon('edit' + noteID) });
    item.addEventListener('mouseout', function () { hideIcon('edit' + noteID) });


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
  console.log(data)
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

function getListValues(event, formId, url) {
  event.preventDefault();

  var favourite = false;
  var important = false;

  const formData = new FormData(document.getElementById(formId));
  const data = Object.fromEntries(formData);

  var contentArr = {};
  var checkedArr = {};
  var sendData = {};

  var j=0, k=0;
  for (var i in data){
    if(i.includes('input')){
      contentArr[j] = data[i];
      j++
    }
    else
    if(i.includes('checkbox')){
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

  postData(sendData, url);
}

function displayLists(allLists, gridId) {

  allLists.forEach(list => {
    const item = document.createElement('div');
    item.classList.add("note-item");
    var listID = list._id;

    var title = createTitle(list,'list-title');
    item.appendChild(title);

    for (var key in list.content) {

      var div = document.createElement('div');
      div.style.display = 'flex';
      div.className = 'list-content'

      var checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = 'checkbox' + listID + key; 
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
      input.id = 'text' + listID + key;

      div.appendChild(checkbox);
      div.appendChild(input);

      item.appendChild(div);

    }

    var date = createDate(list);
    var iconDelete = createDeleteIcon(listID,'delete-list');

    var iconEdit = createEditIcon(listID);
    iconEdit.addEventListener("click", function () { displayEditListModal('editListModal', listID, parseInt(key)); }, false)
  
    item.addEventListener("mouseover", function () { displayIcon(listID) });
    item.addEventListener('mouseout', function () { hideIcon(listID) });
    item.addEventListener("mouseover", function () { displayIcon('edit' + listID) });
    item.addEventListener('mouseout', function () { hideIcon('edit' + listID) });
  
    item.appendChild(date)
    item.appendChild(iconDelete)
    item.appendChild(iconEdit)

    const listGrid = document.getElementById(gridId);
    listGrid?.appendChild(item);
  })

}

function createDeleteIcon(itemID,url){
  var iconDelete = document.createElement("i");
  iconDelete.className = "fa-solid fa-trash deleteIcon"
  iconDelete.id = itemID;
  iconDelete.style.display = 'none';
  iconDelete.style.top = '10px';
  iconDelete.addEventListener("click", function () { deleteData(url, itemID); }, false)

  return iconDelete;
}

function createEditIcon(itemID){
  var iconEdit = document.createElement("i");
  iconEdit.className = "fa-solid fa-edit editIcon"
  iconEdit.id = 'edit' + itemID;
  iconEdit.style.display = 'none';
  iconEdit.style.top = '10px';

  return iconEdit;
}

function createDate(item){
  const date = document.createElement('p');
  date.classList.add("note-date");
  var d = new Date(item.createdAt)
  date.innerText = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();

  return date;
}

function createTitle(item, stringID){
  const title = document.createElement("p");
  title.classList.add("note-title");
  title.id = stringID + item._id;
  title.innerText = item.title;

  return title;
}

var globalListID=0;

function displayEditListModal(idModal, listID, len) {

  document.getElementsByClassName("dropdown-content")[0].classList.remove('show');

  if (listID) {
    // document.getElementsByClassName('note-form').id = noteID;
    globalListID = listID;

    var editTitle = document.getElementById('list-title' + listID).innerHTML;
    var newTitle = document.getElementById('editTitleList');
    newTitle.value = editTitle;
    newTitle.style.fontSize = '16px';
    newTitle.style.marginLeft = '0px';

    var parent = document.getElementById('editListModalDiv');

    for (var i = 0; i <= len; i++) {

      var div = document.createElement('div');
      div.style.display = 'flex';

      var checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.style.marginRight = '3px';
      checkbox.checked = document.getElementById('checkbox' + listID + i).checked;
      checkbox.id = 'checkbox' + listID + i;
      checkbox.name = 'checkbox'+ i;
      checkbox.className = 'checkboxList';

      var input = document.createElement('input');
      input.value = document.getElementById('text' + listID + i).innerText;
      input.className = 'inputListEdit inputForm';
      input.id = 'input'+ listID + i;
      input.name = 'input' + i;
      input.style.height = '25px';

      var remove = document.createElement('i');
      remove.className ="fa-solid fa-xmark removeItemList";
      remove.addEventListener("click", function () { this.parentElement.remove() }, false);

      div.appendChild(checkbox);
      div.appendChild(input);
      div.appendChild(remove);
      parent.append(div);
    }
  }

  var modal = document.getElementById(idModal);
  modal.style.display = "block";

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

}

function updateListValues(event, formId, url) {
  event.preventDefault();
  
  var favourite = false;
  var important = false;
  
  const formData = new FormData(document.getElementById(formId));
  const data = Object.fromEntries(formData);

  var contentArr = {};
  var checkedArr = {};
  var sendData = {};

  var j=0, k=0;
  for (var i in data){
    if(i.includes('input') || i.includes('content')){
      contentArr[j] = data[i];
      j++
    }
    else
    if(i.includes('checkbox')){
      checkedArr[j] = data[i];
      k++
    }
  }

  // if(getStyleElementById("favSelected1").display == "inline-block"){
  //   favourite = true;
  // }
  // if(getStyleElementById("impSelected1").display == "inline-block"){
  //   important = true;
  // }

  data["favourite"] = favourite;
  data["important"] = important;

  sendData = {
    'title': data.title,
    'content': contentArr,
    'checked': checkedArr,
    'important': important,
    'favourite': favourite
  }

  updateData('update-list', globalListID, sendData);
}

function closeListModal(){
  document.getElementById('editListModalDiv').innerHTML = '';
  document.getElementById('editListModal').style.display = 'none'
}

function searchValues(event){
  event.preventDefault();
  var doc = document.getElementById('searchModalContent')

  while (doc.hasChildNodes()) {
    doc.removeChild(doc.firstChild);
  }

  var form = document.getElementById('searchForm');
  
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  
  var sendData = {'search':data.option}

  if (data.option) {
    getSearchData(sendData, form);
  } 
}

function getSearchData(sendData, form) {
  fetch('http://localhost:3000/' + 'search-note', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(sendData),
  })
  .then(async (response) => {
    var res  = await response.json()
    if (res.length == 0) {
      document.getElementById('errorMessage').style.display = 'block';
      hideLoadingMsg();
    }
    else {
      getNotes(res, 'searchModalContent')
      displayModal('searchModal', 'closeSearchModal', null);
      }
    })
    .then(() => {
      form.reset();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function hideLoadingMsg() {
  setTimeout(function(){
    document.getElementById('errorMessage').style.display = 'none';
  },1500)
}
