#!/bin/sh
set -e
set -x

prebuildify --napi --strip --platform darwin --arch x64
prebuildify --napi --strip --platform linux --arch x64
prebuildify --napi --strip --platform linux --arch ia32
prebuildify --napi --strip --platform linux --arch arm64
prebuildify --napi --strip --platform win32 --arch x64
prebuildify --napi --strip --platform win32 --arch ia32
