const todo = new Todo();

const todoIp = document.querySelector('#text_input');
const tableSelect = document.querySelector('#tbody');
const tbContainer = document.querySelector('#tableContainer');
const clrBtn = document.querySelector('#crossIp')

const emptyList = (rowsList) => {
  while (rowsList.firstChild){
    rowsList.removeChild(rowsList.firstChild)
  }
}

const clearText = () => {
  todoIp.value = ""
}

renderListofItems = () => {
  emptyList(tableSelect);
  itrList = todo.getList();
  let i = 1
  
  itrList.map((ele)=>{
    const tR = document.createElement("tr")
    const tD1 = document.createElement("td")
    const tD2 = document.createElement("td")
    const ipEle = document.createElement("input")
    const deltBtn = document.createElement("p")

    deltBtn.className = "deltCll"
    deltBtn.innerText = "X"
    deltBtn.setAttribute('id', ele.id)

    ipEle.value = ele.value
    ipEle.id = "tableCellIp"
    tD1.innerText = i
    tR.appendChild(tD1)
    tD2.appendChild(ipEle)
    tD2.appendChild(deltBtn)
    tD2.id = "tableRowData"
    tR.appendChild(tD2)
    tableSelect.appendChild(tR)
    i= i+1
  })

}

todoIp.addEventListener('keydown', (event) => {
  console.log("check if logging")
  if(event.key === "Enter" && todoIp.value !== ""){
    todo.addtodo(todoIp.value)
    renderListofItems()
    clearText()
  }
})

tableSelect.addEventListener('click', (e)=>{
  if (e?.target?.nodeName === "P"){
    // console.log(e.target.id)
    todo.deleteTodo(e.target.id)
    console.log(todo.getList())
    renderListofItems()
  }
})

clrBtn.addEventListener('click', clearText)

renderListofItems()
