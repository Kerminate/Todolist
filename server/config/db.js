const Sequelize = require('sequelize')

const Todolist = new Sequelize('mysql://root:@localhost/todolist', {
  define: {
    timestamps: false
  }
})

module.exports = {
  Todolist
}
