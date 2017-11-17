const Sequelize = require('sequelize')

const Todolist = new Sequelize('mysql://test:kpl@localhost/todolist', {
  define: {
    timestamps: false
  }
})

module.exports = {
  Todolist
}
