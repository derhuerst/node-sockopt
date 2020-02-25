#import <napi.h>

Napi::Object Init(Napi::Env env, Napi::Object exports) {
	// todo
	return exports;
}

NODE_API_MODULE(addon, Init)
