// global Values

var selectedObject;
var QuickMenuContext;
var editor;
var mouseX;
var mouseY;

window.onmousemove = (ev)=>{
    mouseX = ev.clientX + window.scrollX;
    mouseY = ev.clientY + window.scrollY
}

// static HTML
var textQuickMenu = `
<div class="drop_menu_wrapper"><div class="drop_menu">스타일<div class="drop_item_wrapper"><div class="drop_item">흐하하</div></div><span class="expand_open"></span></div></div>
<div class="drop_menu_wrapper"><div class="drop_menu">폰트<span class="expand_open"></span></div></div>
<div class="drop_menu_wrapper"><div class="drop_menu">크기<span class="expand_open"></span></div></div>
<div class="drop_menu_wrapper"><div class="drop_menu">색<span class="expand_open"></span></div></div>
<div class="drop_menu_wrapper"><div class="drop_menu">밑줄</div></div>
<div class="drop_menu_wrapper"><div class="drop_menu">굵게</div></div>
`


// Object
const canvasObject = {
    x: 0,
    y: 0
}
const Page ={
    Title:"",
    Contents:"",
    Date:"",
    Type:"Page",
    ID:"" //contents 내용을 sha-1로 계산함.
}

// Factory Function

/**
 * @constructor
 */
function mainBoardObject(){
    var containerElement = document.createElement("div")
    var titleElement = document.createElement("div")
    var mainTextObject = document.createElement("div")

    containerElement.appendChild(titleElement)
    containerElement.appendChild(mainTextObject)

    containerElement.setAttribute("class", "editor_container")
    titleElement.setAttribute("class", "title")
    mainTextObject.setAttribute("id", "main_text")
}

/**
 * @constructor
 */
function writingObject(){
    var writingElement = document.createElement("div")
    writingElement.setAttribute("draggable", "true")
    writingElement.setAttribute("class", "writing_object")
    //위치 교환 drag&drop
    writingElement.addEventListener("dragstart",(ev)=>{
        selectedObject = ev.currentTarget
        ev.dataTransfer.setData("text", null)
    })
    writingElement.addEventListener("drop", (ev)=>{
        ev.preventDefault();
        insertingObject(selectedObject, ev.target.parentElement.parentElement)
    })

    return Object.assign(writingElement,canvasObject,{objType:"writingObject"})
}

/**
 * @constructor
 */
function textObject(){
    var wrapper = writingObject()
    var element = document.createElement("div")
    var pElement = document.createElement("div")

    element.setAttribute("class", "text_object")
    element.setAttribute("contentEditable", "true")
    wrapper.appendChild(element)

    //상단 메뉴 Event
    element.addEventListener("focusin", (ev)=>{
        var headerOptionMenu = document.getElementById("header_option_menu")
        headerOptionMenu.innerHTML = textQuickMenu
        headerOptionMenu.childNodes.forEach((item)=>{item.addEventListener("click",quickMenuToggle)})
        console.log(headerOptionMenu)
    })

    return element
}

//
// Events Function
//
/**
 * 
 * @param {MouseEvent} event 
 */
function quickMenuToggle(event){
    event.currentTarget.querySelector(".drop_item_wrapper").classList.toggle("drop_item_wrapper_toggle")
}

//
// Utility Function
//
function hasClass(element, className) {
    return (' ' + element.className + ' ').indexOf(' ' + className+ ' ') > -1;
}
function insert(element){
    document.getElementById("main_text").appendChild(element.parentElement)
}

/**
 * @param {HTMLElement} a
 * @param {HTMLElement} b
 */
function insertingObject(a, b){
    var target = document.getElementById("main_text")
    var placeHolderA = document.createElement("span")
    var placeHolderB = document.createElement("span")
    
    target.insertBefore(placeHolderA, a)
    target.insertBefore(placeHolderB, b)

    target.replaceChild(a, placeHolderB)
    target.replaceChild(b, placeHolderA)
}

//create ID
async function sha1(str) {
    const hashBuffer = await crypto.subtle.digest("SHA-1", new TextEncoder("utf-8").encode(str))
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
    return hashHex
}

// 발행
async function posting(){
    var boardWriting = Object.assign({}, Page)
    var nowTime = new Date();
    console.log(nowTime.getTime())
    boardWriting.Date = nowTime.getTime();
    boardWriting.Title = document.getElementsByClassName("title")[0].outerHTML
    boardWriting.Contents = document.getElementById("main_text").outerHTML
    await sha1(boardWriting.Contents).then((x)=>{boardWriting.ID = x})
    
    return boardWriting
}

// local JSON 다운로드
/**
* @param {Page} posting
*/
function jsonDonwload(posting){
    var json = JSON.stringify(posting)
    var blob = new Blob([json], {type: "application/json"})
    var url = URL.createObjectURL(blob)
    return url
}

//

//

window.onload=()=>{
    //inserting test
    var a = textObject()
    a.innerHTML = "<h1>AAAAAAAAAAAA</h1>"
    var b = textObject()
    b.innerHTML = "<h1>BBBBBBBBBBBB</h1>"
    var c = textObject()
    c.innerHTML = "<h1>CCCCCCCCCCCC</h1>"
    var d = textObject()
    d.innerHTML = "<h1>dddddddddddd</h1>"
    var e = textObject()
    e.innerHTML = "<h1>eeeeeeeeeeee</h1>"
    insert(a)
    insert(b)
    insert(c)
    insert(d)
    insert(e)
    var a = textObject()
    a.innerHTML = "<h1>AAAAAAAAAAAA</h1>"
    var b = textObject()
    b.innerHTML = "<h1>BBBBBBBBBBBB</h1>"
    var c = textObject()
    c.innerHTML = "<h1>CCCCCCCCCCCC</h1>"
    var d = textObject()
    d.innerHTML = "<h1>dddddddddddd</h1>"
    var e = textObject()
    e.innerHTML = "<h1>eeeeeeeeeeee</h1>"
    insert(a)
    insert(b)
    insert(c)
    insert(d)
    insert(e)
    var a = textObject()
    a.innerHTML = "<h1>AAAAAAAAAAAA</h1>"
    var b = textObject()
    b.innerHTML = "<h1>BBBBBBBBBBBB</h1>"
    var c = textObject()
    c.innerHTML = "<h1>CCCCCCCCCCCC</h1>"
    var d = textObject()
    d.innerHTML = "<h1>dddddddddddd</h1>"
    var e = textObject()
    e.innerHTML = "<h1>eeeeeeeeeeee</h1>"
    insert(a)
    insert(b)
    insert(c)
    insert(d)
    insert(e)
    var a = textObject()
    a.innerHTML = "<h1>AAAAAAAAAAAA</h1>"
    var b = textObject()
    b.innerHTML = "<h1>BBBBBBBBBBBB</h1>"
    var c = textObject()
    c.innerHTML = "<h1>CCCCCCCCCCCC</h1>"
    var d = textObject()
    d.innerHTML = "<h1>dddddddddddd</h1>"
    var e = textObject()
    e.innerHTML = "<h1>eeeeeeeeeeee</h1>"
    insert(a)
    insert(b)
    insert(c)
    insert(d)
    insert(e)
    var a = textObject()
    a.innerHTML = "<h1>AAAAAAAAAAAA</h1>"
    var b = textObject()
    b.innerHTML = "<h1>BBBBBBBBBBBB</h1>"
    var c = textObject()
    c.innerHTML = "<h1>CCCCCCCCCCCC</h1>"
    var d = textObject()
    d.innerHTML = "<h1>dddddddddddd</h1>"
    var e = textObject()
    e.innerHTML = "<h1>eeeeeeeeeeee</h1>"
    insert(a)
    insert(b)
    insert(c)
    insert(d)
    insert(e)
    //posting test
    var postingElement = document.getElementById("posting")
    postingElement.download = "posting.json";
    postingElement.onclick = (ev)=>{
        posting().then((x)=>{
            postingElement.href = jsonDonwload(x)
        })
        //postingElement.href = jsonDonwload(posting())
    }
}