#import <napi.h>
#import <errno.h>
#import <sys/types.h>
#import <sys/socket.h>

Napi::Value Getsockopt(const Napi::CallbackInfo& args) {
	Napi::Env env = args.Env();

	if (!args[0].IsNumber() || !args[1].IsNumber() || !args[2].IsNumber()) {
		Napi::TypeError::New(env, "Wrong arguments").ThrowAsJavaScriptException();
		return env.Null();
	}

	int socket = args[0].As<Napi::Number>().Int32Value();
	int level = args[1].As<Napi::Number>().Int32Value();
	int name = args[2].As<Napi::Number>().Int32Value();


	int * val = (int *) malloc(sizeof(int));
	socklen_t len = sizeof(int);
	if (0 != getsockopt(socket, level, name, (void *) val, &len)) {
		char * msg = (char *) malloc(sizeof(char) * 100);
		sprintf(msg, "getsockopt failed: %s (%d)", strerror(errno), errno);
		// todo: expose `errno`
		Napi::TypeError::New(env, msg).ThrowAsJavaScriptException();
		return env.Null();
	}

	return Napi::Number::New(env, * val);
}

Napi::Value Setsockopt(const Napi::CallbackInfo& args) {
	Napi::Env env = args.Env();

	if (args.Length() < 2) {
		Napi::TypeError::New(env, "Wrong number of arguments")
				.ThrowAsJavaScriptException();
		return env.Null();
	}

	if (!args[0].IsNumber() || !args[1].IsNumber() || !args[2].IsNumber() || !args[3].IsNumber()) {
		Napi::TypeError::New(env, "Wrong arguments").ThrowAsJavaScriptException();
		return env.Null();
	}

	int socket = args[0].As<Napi::Number>().Int32Value();
	int level = args[1].As<Napi::Number>().Int32Value();
	int name = args[2].As<Napi::Number>().Int32Value();
	int new_val = args[3].As<Napi::Number>().Int32Value();

	if (0 != setsockopt(socket, level, name, (void *)&new_val, (socklen_t) sizeof(new_val))) {
		char * msg = (char *) malloc(sizeof(char) * 100);
		sprintf(msg, "setsockopt failed: %s (%d)", strerror(errno), errno);
		// todo: expose `errno`
		Napi::TypeError::New(env, msg).ThrowAsJavaScriptException();
	}

	return env.Null();
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
	exports.Set(Napi::String::New(env, "getsockopt"), Napi::Function::New(env, Getsockopt));
	exports.Set(Napi::String::New(env, "setsockopt"), Napi::Function::New(env, Setsockopt));
	return exports;
}

NODE_API_MODULE(addon, Init)
