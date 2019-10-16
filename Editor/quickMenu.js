/**
 *
 */
function quickMenu(type){
    var element = document.createElement("div")
    var table = document.createElement("table")
    var row = document.createElement("tr")
    var item;

    element.setAttribute("id", "quick_menu")
    element.setAttribute("class", "text_quick_menu")
    element.addEventListener("foucsout", removeQuickMenu)

    table.setAttribute("id", "text_object_quick_menu")

    makeItem(row, "스타일")
    makeItem(row, "크기")
    makeItem(row, "굵게")
    makeItem(row, "밑줄")
    makeItem(row, "기울기")
    makeItem(row, "글자색")
    
    table.appendChild(row)
    element.appendChild(table)

    return element
}

//events
/**
 * 
 * @param {FocusEvent} event 
 */
function removeQuickMenu(event){
    event.currentTarget.remove()
}
/**
 * 
 * @param {MouseEvent} event 
 */
function  dropDown(event){
    console.log(event.relatedTarget)
}

//helper Function
/**
 * 
 * @param {HTMLElement} parent 
 * @param {String} str 
 * @param {function} callback
 */
function makeItem(parent, str){
    var element = document.createElement("td")
    element.setAttribute("contenteditable","true")
    element.setAttribute("class","quick_menu_item")
    element.innerHTML = str
    parent.appendChild(element)
    return true
}

export {quickMenu}

    //text Quick Menu가 나타나야할 때는 다음과 같다.
    //해당 textObject을 클릭을 했을 때.
    //Text Quick Menu가 사라졌을 때는 다음과 같다.
    //해당 textObject에서 벗어났을 때.
    //1. 해당 textObject에서 focustout을 할 때.
    //드래그한 값에 적용할 때.
    //전체 상자에 적용할 때.