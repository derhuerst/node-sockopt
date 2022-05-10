#!/bin/sh
set -e
set -x

npx prebuildify --napi --strip --platform darwin --arch x64
npx prebuildify --napi --strip --platform darwin --arch arm64
npx prebuildify --napi --strip --platform linux --arch x64
npx prebuildify --napi --strip --platform linux --arch arm64
npx prebuildify --napi --strip --platform win32 --arch x64
