class Todo {
  constructor() {
    this.todos = []
  }

  addtodo (val) {
    this.todos.push({id: parseInt(Math.random() * 1000), value: val})
  }

  deleteTodo (id) {
    this.todos = this.todos.filter((item) => {
      return item.id != id
    })
  }

  updatetodo (id, val) {
    this.todos.map((item)=>{
      if (item.id === id) return {id, val}
      return item
  })
  }

  isempty () {
    return this.todos.length === 0
  }

  getList () {
    return this.todos
  }

}

