{
  "targets": [
    {
      "target_name": "sockopt",
      "cflags!": [ "-fno-exceptions", "-O3" ],
      "sources": [ "lib/sockopt.cc" ],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")"
      ],
      'defines': [ 'NAPI_DISABLE_CPP_EXCEPTIONS' ],
    }
  ]
}
