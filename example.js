'use strict'

const {createSocket} = require('dgram')
const {getsockopt, setsockopt} = require('.')

// https://github.com/apple/darwin-xnu/blob/a449c6a3b8014d9406c2ddbdc81795da24aa7443/bsd/sys/socket.h#L525
const SOL_SOCKET = 0xffff

// https://github.com/apple/darwin-xnu/blob/a449c6a3b8014d9406c2ddbdc81795da24aa7443/bsd/sys/socket.h#L130
const SO_REUSEADDR = 0x0004
// https://github.com/apple/darwin-xnu/blob/a449c6a3b8014d9406c2ddbdc81795da24aa7443/bsd/sys/socket.h#L165
const SO_SNDBUF = 0x1001

const socket = createSocket({type: 'udp4'})

socket.bind(1234, '0.0.0.0', (err) => {
	if (err) {
		console.error(err)
		process.exit(1)
	}

	console.log('SO_REUSEADDR is', !!getsockopt(socket, SOL_SOCKET, SO_REUSEADDR))
	setsockopt(socket, SOL_SOCKET, SO_REUSEADDR, +true) // pass `1` for true
	console.log('SO_REUSEADDR is now', !!getsockopt(socket, SOL_SOCKET, SO_REUSEADDR))

	console.log('SO_SNDBUF is', getsockopt(socket, SOL_SOCKET, SO_SNDBUF))
	setsockopt(socket, SOL_SOCKET, SO_SNDBUF, 1024)
	console.log('SO_SNDBUF is now', getsockopt(socket, SOL_SOCKET, SO_SNDBUF))

	// do something with the socket here instead!
	socket.close()
})
