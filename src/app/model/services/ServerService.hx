package app.model.services;
import yloader.valueObject.Parameter;
import yloader.enums.Method;
import haxe.Json;
import yloader.impl.js.XMLHttpRequestLoader;
import yloader.valueObject.Request;
import yloader.valueObject.Response;

class ServerService
{
    private static var __instance(default, never):ServerService = new ServerService();
    public static function getInstance():ServerService { return __instance; }

    private function new() {}


    public function performRequest(
        endpoint    : String,
        method      : Method,
        callback    : String->Dynamic->Void,
        ?params     : Map<String,Dynamic>
    ):Void
	{
		var request = new Request(endpoint);
		var loader = new XMLHttpRequestLoader(request);
		request.method = method;

		loader.onResponse = function(response:Response)
		{
			haxe.Timer.delay(function(){
				callback(
					response.success ? null : response.statusText,
					Json.parse(response.data)
				);
			}, (100 + Std.int(Math.random() * 1000)));
		};
		if(params != null) AddRequestParams(request, params);
        trace("-> performRequest: " + request.url, method, callback);
		loader.withCredentials = true;
		loader.load();
    }

    private function AddRequestParams(request:Request, params:Map<String, Dynamic>):Void
    {
        var keys:Iterator<String> = params.keys();
        var next:Bool = keys.hasNext();
		var json:Dynamic = {};

		request.setHeader(new Parameter('Content-type','application/json; charset=utf-8'));
        while(next)
        {
            var key:String = keys.next();
            next = keys.hasNext();
			Reflect.setField(json, key, params.get(key));

        }
        request.data = Json.stringify(json);
    }
}
