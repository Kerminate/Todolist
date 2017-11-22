import server from '../../app.js'
import request from 'supertest'

afterEach(() => {
  server.close() // 当所有测试都跑完了之后，关闭server
})

// 如果输入用户名为abc，密码为1234则无法登录。正确应为abc和123
test('Failed to login if typing abc & 1234', async () => { // 注意用了async
  const response = await request(server) // 注意这里用了await
                    .post('/auth/user') // post方法向'/auth/user'发送下面的数据
                    .send({
                      name: 'abc',
                      password: '1234'
                    })
  expect(response.body.success).toBe(false) // 期望回传的body的success值是false（代表登录失败）
})
