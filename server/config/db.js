const Sequelize = require('sequelize')

const Todolist = new Sequelize('mariadb://root:@localhost/todolist', {
  define: {
    timestamps: false
  }
})

module.exports = {
  Todolist
}
