'use strict'

const { test } = require('tap')
const Fastify = require('..')

test('sync route', async t => {
  const app = Fastify()
  t.tearDown(app.close.bind(app))
  app.get('/', () => 'hello world')
  const res = await app.inject('/')
  t.is(res.statusCode, 200)
  t.is(res.body, 'hello world')
})

test('sync route, error', async t => {
  const app = Fastify()
  t.tearDown(app.close.bind(app))
  app.get('/', () => {
    throw new Error('kaboom')
  })
  const res = await app.inject('/')
  t.is(res.statusCode, 500)
})
