# sockopt

**[`getsockopt`](https://linux.die.net/man/3/getsockopt) & [`setsockopt`](https://linux.die.net/man/3/setsockopt) for Node.js sockets.**

Allows you to set all the socket flags that Node does not expose via its built-in [UDP](https://nodejs.org/api/dgram.html#dgram_class_dgram_socket) & [TCP](https://nodejs.org/api/net.html#net_class_net_socket) socket APIs.

[![npm version](https://img.shields.io/npm/v/sockopt.svg)](https://www.npmjs.com/package/sockopt)
[![build status](https://api.travis-ci.org/derhuerst/sockopt.svg?branch=master)](https://travis-ci.org/derhuerst/sockopt)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/sockopt.svg)
![minimum Node.js version](https://img.shields.io/node/v/sockopt.svg)
[![chat with me on Gitter](https://img.shields.io/badge/chat%20with%20me-on%20gitter-512e92.svg)](https://gitter.im/derhuerst)
[![support me on Patreon](https://img.shields.io/badge/support%20me-on%20patreon-fa7664.svg)](https://patreon.com/derhuerst)


## Installation

```shell
npm install sockopt
```


## Usage

```js
const {createSocket} = require('dgram')
const {getsockopt, setsockopt} = require('sockopt')

// https://github.com/apple/darwin-xnu/blob/a449c6a3b8014d9406c2ddbdc81795da24aa7443/bsd/sys/socket.h#L165
const SO_SNDBUF = 0x1001

const socket = createSocket({type: 'udp4'})
socket.bind(() => {
	console.log('SO_SNDBUF is', getsockopt(socket, SOL_SOCKET, SO_SNDBUF))
	setsockopt(socket, SOL_SOCKET, SO_SNDBUF, 1024)
	console.log('SO_SNDBUF is now', getsockopt(socket, SOL_SOCKET, SO_SNDBUF))
})
```

```
SO_SNDBUF is 9216
SO_SNDBUF is now 1024
```

### ceveat: integer-based flags only

*Note:* **Currently, this package only supports read & writing the flags via *integers*.**

Set boolean flags (`SO_BROADCAST`) via `0` (disabled) and `1` (enabled), or `+false` and `+true` to be more explicit. Due to how the [`getsockopt` syscall](https://linux.die.net/man/3/getsockopt) works, `0` will be returned for "disabled", and non-`0` for "enabled".

Struct-based flags (e.g. `SO_SNDTIMEO`) *do not* work yet.


## Related

- [Linux `sys/socket.h`](https://github.com/torvalds/linux/blob/a2d79c7174aeb43b13020dd53d85a7aefdd9f3e5/include/uapi/asm-generic/socket.h) with common Linux socket flags.
- [Darwin `sys/socket.h`](https://github.com/apple/darwin-xnu/blob/master/bsd/sys/socket.h) with all macOS socket flags.
- [Node.js discussion about exposing `setsockopt`](https://github.com/nodejs/node/issues/22994)
- [`node-getsockopt`](https://github.com/janakagoon/node-getsockopt/blob/master/package.json) – An older implementation, does not use [N-API](https://nodejs.org/docs/latest-v10.x/api/n-api.html) but the v8 API directly.
- [`setsockopt`](https://github.com/smilingthax/node-setsockopt) – An older implementation with Windows support.


## Contributing

If you have a question or need support using `sockopt`, please double-check your code and setup first. If you think you have found a bug or want to propose a feature, use [the issues page](https://github.com/derhuerst/sockopt/issues).
