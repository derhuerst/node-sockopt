'use strict'

const {createSocket} = require('dgram')
const {strictEqual: eql, notStrictEqual: notEql, ok} = require('assert')
const {getsockopt, setsockopt} = require('.')

const SOL_SOCKET = 0xffff
const SO_REUSEADDR = 0x0004
const SO_SNDBUF = 0x1001

const socket = createSocket({type: 'udp6'})

socket.on('error', (err) => {
	console.error(err)
	process.exit(1)
})

socket.bind(12345, '::', () => {
	const reusePort = !!getsockopt(socket, SOL_SOCKET, SO_REUSEADDR)
	eql(reusePort, false, 'precondition failed: SO_REUSEADDR is not false')

	setsockopt(socket, SOL_SOCKET, SO_REUSEADDR, +true)
	eql(!!getsockopt(socket, SOL_SOCKET, SO_REUSEADDR), true, 'setting SO_REUSEADDR failed')

	const sendBufSize = getsockopt(socket, SOL_SOCKET, SO_SNDBUF)
	notEql(sendBufSize, 1234, 'precondition failed: SO_SNDBUF is 1234')
	ok(Number.isInteger(sendBufSize), 'SO_SNDBUF is not an integer')

	setsockopt(socket, SOL_SOCKET, SO_SNDBUF, 1234)
	eql(getsockopt(socket, SOL_SOCKET, SO_SNDBUF), 1234, 'setting SO_SNDBUF failed')

	console.info('looks good ✔︎')
	socket.close()
})
