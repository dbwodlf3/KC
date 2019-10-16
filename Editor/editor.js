import * as quickMenu from './quickMenu'

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

    //events
    //Quick Menu create
    writingElement.addEventListener("focusin",(ev)=>{
        if(!(document.getElementById("quick_menu"))){
            var myQuickMenu = quickMenu.quickMenu()
            ev.currentTarget.appendChild(myQuickMenu)

            myQuickMenu.style.left = writingElement.getBoundingClientRect().x
            myQuickMenu.style.top = writingElement.getBoundingClientRect().y + window.scrollY -50
        }
    })
    //Quick Menu remove
    writingElement.addEventListener("focusout",(ev)=>{
        var textQuickMenu = document.getElementById("quick_menu")
        if( textQuickMenu.parentElement != ev.currentTarget){
            textQuickMenu.remove()
        }
    })
    //위치 교환 drag
    writingElement.addEventListener("dragstart",(ev)=>{
        selectedObject = ev.currentTarget
        ev.dataTransfer.setData("text", null)
    })
    //위치 교한 drop
    writingElement.addEventListener("drop", (ev)=>{
        ev.preventDefault();
        insertingObject(selectedObject, ev.target.parentElement.parentElement)
    })

    return Object.assign(writingElement,canvasObject)
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
    return element
}


// Utility Function
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

var a = document.createElement("div")
a.innerHTML = "흐므으으으"