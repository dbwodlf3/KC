(function () {
    'use strict';

    /**
     *
     */
    function quickMenu(type){
        var element = document.createElement("div");
        var table = document.createElement("table");
        var row = document.createElement("tr");

        element.setAttribute("id", "quick_menu");
        element.setAttribute("class", "text_quick_menu");
        element.addEventListener("foucsout", removeQuickMenu);

        table.setAttribute("id", "text_object_quick_menu");

        makeItem(row, "스타일");
        makeItem(row, "크기");
        makeItem(row, "굵게");
        makeItem(row, "밑줄");
        makeItem(row, "기울기");
        makeItem(row, "글자색");
        
        table.appendChild(row);
        element.appendChild(table);

        return element
    }

    //events
    /**
     * 
     * @param {FocusEvent} event 
     */
    function removeQuickMenu(event){
        event.currentTarget.remove();
        console.log(remove);
    }

    //helper Function
    /**
     * 
     * @param {HTMLElement} parent 
     * @param {String} str 
     * @param {function} callback
     */
    function makeItem(parent, str){
        var element = document.createElement("td");
        element.setAttribute("contenteditable","true");
        element.setAttribute("class","quick_menu_item");
        element.innerHTML = str;
        parent.appendChild(element);
        return true
    }

        //text Quick Menu가 나타나야할 때는 다음과 같다.
        //해당 textObject을 클릭을 했을 때.
        //Text Quick Menu가 사라졌을 때는 다음과 같다.
        //해당 textObject에서 벗어났을 때.
        //1. 해당 textObject에서 focustout을 할 때.
        //드래그한 값에 적용할 때.
        //전체 상자에 적용할 때.

    // global Values

    var selectedObject;
    var mouseX;
    var mouseY;

    window.onmousemove = (ev)=>{
        mouseX = ev.clientX + window.scrollX;
        mouseY = ev.clientY + window.scrollY;
    };


    // Object
    const canvasObject = {
        x: 0,
        y: 0
    };
    const Page ={
        Title:"",
        Contents:"",
        Date:"",
        Type:"Page",
        ID:"" //contents 내용을 sha-1로 계산함.
    };

    /**
     * @constructor
     */
    function writingObject(){
        var writingElement = document.createElement("div");
        writingElement.setAttribute("draggable", "true");
        writingElement.setAttribute("class", "writing_object");

        //events
        //Quick Menu create
        writingElement.addEventListener("focusin",(ev)=>{
            if(!(document.getElementById("quick_menu"))){
                var myQuickMenu = quickMenu();
                ev.currentTarget.appendChild(myQuickMenu);

                myQuickMenu.style.left = writingElement.getBoundingClientRect().x;
                myQuickMenu.style.top = writingElement.getBoundingClientRect().y + window.scrollY -50;
            }
        });
        //Quick Menu remove
        writingElement.addEventListener("focusout",(ev)=>{
            var textQuickMenu = document.getElementById("quick_menu");
            if( textQuickMenu.parentElement != ev.currentTarget){
                textQuickMenu.remove();
            }
        });
        //위치 교환 drag
        writingElement.addEventListener("dragstart",(ev)=>{
            selectedObject = ev.currentTarget;
            ev.dataTransfer.setData("text", null);
        });
        //위치 교한 drop
        writingElement.addEventListener("drop", (ev)=>{
            ev.preventDefault();
            insertingObject(selectedObject, ev.target.parentElement.parentElement);
        });

        return Object.assign(writingElement,canvasObject)
    }

    /**
     * @constructor
     */
    function textObject(){
        var wrapper = writingObject();
        var element = document.createElement("div");
        var pElement = document.createElement("div");

        element.setAttribute("class", "text_object");
        element.setAttribute("contentEditable", "true");
        wrapper.appendChild(element);
        return element
    }
    function insert(element){
        document.getElementById("main_text").appendChild(element.parentElement);
    }

    /**
     * @param {HTMLElement} a
     * @param {HTMLElement} b
     */
    function insertingObject(a, b){
        var target = document.getElementById("main_text");
        var placeHolderA = document.createElement("span");
        var placeHolderB = document.createElement("span");
        
        target.insertBefore(placeHolderA, a);
        target.insertBefore(placeHolderB, b);

        target.replaceChild(a, placeHolderB);
        target.replaceChild(b, placeHolderA);
    }

    //create ID
    async function sha1(str) {
        const hashBuffer = await crypto.subtle.digest("SHA-1", new TextEncoder("utf-8").encode(str));
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex
    }

    // 발행
    async function posting(){
        var boardWriting = Object.assign({}, Page);
        var nowTime = new Date();
        console.log(nowTime.getTime());
        boardWriting.Date = nowTime.getTime();
        boardWriting.Title = document.getElementsByClassName("title")[0].outerHTML;
        boardWriting.Contents = document.getElementById("main_text").outerHTML;
        await sha1(boardWriting.Contents).then((x)=>{boardWriting.ID = x;});
        
        return boardWriting
    }

    // local JSON 다운로드
    /**
    * @param {Page} posting
    */
    function jsonDonwload(posting){
        var json = JSON.stringify(posting);
        var blob = new Blob([json], {type: "application/json"});
        var url = URL.createObjectURL(blob);
        return url
    }

    //

    //

    window.onload=()=>{
        //inserting test
        var a = textObject();
        a.innerHTML = "<h1>AAAAAAAAAAAA</h1>";
        var b = textObject();
        b.innerHTML = "<h1>BBBBBBBBBBBB</h1>";
        var c = textObject();
        c.innerHTML = "<h1>CCCCCCCCCCCC</h1>";
        var d = textObject();
        d.innerHTML = "<h1>dddddddddddd</h1>";
        var e = textObject();
        e.innerHTML = "<h1>eeeeeeeeeeee</h1>";
        insert(a);
        insert(b);
        insert(c);
        insert(d);
        insert(e);
        var a = textObject();
        a.innerHTML = "<h1>AAAAAAAAAAAA</h1>";
        var b = textObject();
        b.innerHTML = "<h1>BBBBBBBBBBBB</h1>";
        var c = textObject();
        c.innerHTML = "<h1>CCCCCCCCCCCC</h1>";
        var d = textObject();
        d.innerHTML = "<h1>dddddddddddd</h1>";
        var e = textObject();
        e.innerHTML = "<h1>eeeeeeeeeeee</h1>";
        insert(a);
        insert(b);
        insert(c);
        insert(d);
        insert(e);
        var a = textObject();
        a.innerHTML = "<h1>AAAAAAAAAAAA</h1>";
        var b = textObject();
        b.innerHTML = "<h1>BBBBBBBBBBBB</h1>";
        var c = textObject();
        c.innerHTML = "<h1>CCCCCCCCCCCC</h1>";
        var d = textObject();
        d.innerHTML = "<h1>dddddddddddd</h1>";
        var e = textObject();
        e.innerHTML = "<h1>eeeeeeeeeeee</h1>";
        insert(a);
        insert(b);
        insert(c);
        insert(d);
        insert(e);
        var a = textObject();
        a.innerHTML = "<h1>AAAAAAAAAAAA</h1>";
        var b = textObject();
        b.innerHTML = "<h1>BBBBBBBBBBBB</h1>";
        var c = textObject();
        c.innerHTML = "<h1>CCCCCCCCCCCC</h1>";
        var d = textObject();
        d.innerHTML = "<h1>dddddddddddd</h1>";
        var e = textObject();
        e.innerHTML = "<h1>eeeeeeeeeeee</h1>";
        insert(a);
        insert(b);
        insert(c);
        insert(d);
        insert(e);
        var a = textObject();
        a.innerHTML = "<h1>AAAAAAAAAAAA</h1>";
        var b = textObject();
        b.innerHTML = "<h1>BBBBBBBBBBBB</h1>";
        var c = textObject();
        c.innerHTML = "<h1>CCCCCCCCCCCC</h1>";
        var d = textObject();
        d.innerHTML = "<h1>dddddddddddd</h1>";
        var e = textObject();
        e.innerHTML = "<h1>eeeeeeeeeeee</h1>";
        insert(a);
        insert(b);
        insert(c);
        insert(d);
        insert(e);
        //posting test
        var postingElement = document.getElementById("posting");
        postingElement.download = "posting.json";
        postingElement.onclick = (ev)=>{
            posting().then((x)=>{
                postingElement.href = jsonDonwload(x);
            });
            //postingElement.href = jsonDonwload(posting())
        };
    };

    var a = document.createElement("div");
    a.innerHTML = "흐므으으으";

}());
