/*
    inputBox.setAttribute("contenteditable", "true") - Seçili elemente attribute ekliyoruz.
    
    ##
    notes.forEach(nt => {
        nt.onkeyup = function(){
            updateStorage()
        }
    })
    ## - Seçili elementi foreach içine alıyoruz, her bir öğesini 'nt' ile sembolize edip işlem uyguluyoruz.

    notesContainer.insertBefore(note, notesContainer.firstChild) - Seçili element içindeki ilk elementten önce insert yapıyoruz. Bu sayede son eklenen elementimiz en üstte kalıyor. 
*/

const notesContainer = document.querySelector(".notes-container")
const createNoteBtn = document.querySelector(".create-note-btn")

let notes = document.querySelectorAll(".input-box")

function showNotes() {
    notesContainer.innerHTML = localStorage.getItem("notes")
}

showNotes();

function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML)
}

createNoteBtn.addEventListener("click", () => {
    let note = document.createElement("div")
    let inputBox = document.createElement("p")
    let img = document.createElement("img")
    note.className = "note"
    inputBox.className = "input-box"
    img.className = "delete-note-btn"
    inputBox.setAttribute("contenteditable", "true")
    img.src = "images/delete-note.png"
    note.appendChild(inputBox)
    note.appendChild(img)
    notesContainer.insertBefore(note, notesContainer.firstChild)
    updateStorage();
})

notesContainer.addEventListener("click", (e) => {
    if (e.target.className === "delete-note-btn") {
        e.target.parentElement.remove()
        updateStorage()
    } else if (e.target.className === "input-box") {
        notes = document.querySelectorAll(".input-box")
        notes.forEach(nt => {
            nt.onkeyup = function () {
                updateStorage()
            }
        })
    }
})

// Enter yapınca <p> elementi içinde <div> elementi yaratıyor. Bunun önüne geçebilmek için aşağıdaki kodu kullanmak durumundayız.
document.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        document.execCommand("insertLineBreak")
        event.preventDefault()
    }
})