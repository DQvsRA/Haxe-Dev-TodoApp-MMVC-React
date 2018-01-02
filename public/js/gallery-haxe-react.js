(function (console, $global) { "use strict";
var $hxClasses = {},$estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var mmvc_api_IContext = function() { };
$hxClasses["mmvc.api.IContext"] = mmvc_api_IContext;
mmvc_api_IContext.__name__ = ["mmvc","api","IContext"];
mmvc_api_IContext.prototype = {
	__class__: mmvc_api_IContext
	,__properties__: {get_commandMap:"get_commandMap"}
};
var mmvc_impl_Context = function(contextView,autoStartup) {
	if(autoStartup == null) autoStartup = true;
	this.autoStartup = autoStartup;
	this.set_contextView(contextView);
};
$hxClasses["mmvc.impl.Context"] = mmvc_impl_Context;
mmvc_impl_Context.__name__ = ["mmvc","impl","Context"];
mmvc_impl_Context.__interfaces__ = [mmvc_api_IContext];
mmvc_impl_Context.prototype = {
	startup: function() {
	}
	,shutdown: function() {
	}
	,set_contextView: function(value) {
		if(this.contextView != value) {
			this.contextView = value;
			this.commandMap = null;
			this.mediatorMap = null;
			this.viewMap = null;
			this.triggerMap = null;
			this.mapInjections();
			this.checkAutoStartup();
		}
		return value;
	}
	,get_injector: function() {
		if(this.injector == null) return this.createInjector();
		return this.injector;
	}
	,get_reflector: function() {
		if(this.reflector == null) this.reflector = new minject_Reflector();
		return this.reflector;
	}
	,get_commandMap: function() {
		if(this.commandMap == null) this.commandMap = new mmvc_base_CommandMap(this.createChildInjector());
		return this.commandMap;
	}
	,get_mediatorMap: function() {
		if(this.mediatorMap == null) this.mediatorMap = new mmvc_base_MediatorMap(this.contextView,this.createChildInjector(),this.get_reflector());
		return this.mediatorMap;
	}
	,get_viewMap: function() {
		if(this.viewMap == null) this.viewMap = new mmvc_base_ViewMap(this.contextView,this.get_injector());
		return this.viewMap;
	}
	,get_triggerMap: function() {
		if(this.triggerMap == null) this.triggerMap = new mmvc_base_TriggerMap(this.get_injector());
		return this.triggerMap;
	}
	,mapInjections: function() {
		this.get_injector().mapValue(minject_Reflector,this.get_reflector());
		this.get_injector().mapValue(minject_Injector,this.get_injector());
		this.get_injector().mapValue(mmvc_api_IViewContainer,this.contextView);
		this.get_injector().mapValue(mmvc_api_ICommandMap,this.get_commandMap());
		this.get_injector().mapValue(mmvc_api_IMediatorMap,this.get_mediatorMap());
		this.get_injector().mapValue(mmvc_api_IViewMap,this.get_viewMap());
		this.get_injector().mapValue(mmvc_api_ITriggerMap,this.get_triggerMap());
	}
	,checkAutoStartup: function() {
		if(this.autoStartup && this.contextView != null) this.startup();
	}
	,createInjector: function() {
		this.injector = new minject_Injector();
		return this.get_injector();
	}
	,createChildInjector: function() {
		return this.get_injector().createChildInjector();
	}
	,__class__: mmvc_impl_Context
	,__properties__: {get_triggerMap:"get_triggerMap",get_viewMap:"get_viewMap",get_reflector:"get_reflector",get_mediatorMap:"get_mediatorMap",get_injector:"get_injector",get_commandMap:"get_commandMap",set_contextView:"set_contextView"}
};
var AppContext = function(contextView,autoStartup) {
	mmvc_impl_Context.call(this,contextView,autoStartup);
};
$hxClasses["AppContext"] = AppContext;
AppContext.__name__ = ["AppContext"];
AppContext.__super__ = mmvc_impl_Context;
AppContext.prototype = $extend(mmvc_impl_Context.prototype,{
	startup: function() {
		this.get_mediatorMap().mapView(view_GalleryList,view_GalleryListMediator);
		this.get_triggerMap().map(triggers_LoadTrigger,command_LoadGalleryListCommand);
	}
	,__class__: AppContext
});
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var Main = function() { };
$hxClasses["Main"] = Main;
Main.__name__ = ["Main"];
Main.main = function() {
	view_Root.init();
};
Math.__name__ = ["Math"];
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = ["Reflect"];
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
Reflect.setField = function(o,field,value) {
	o[field] = value;
};
Reflect.setProperty = function(o,field,value) {
	var tmp;
	if(o.__properties__ && (tmp = o.__properties__["set_" + field])) o[tmp](value); else o[field] = value;
};
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
};
Reflect.compare = function(a,b) {
	if(a == b) return 0; else if(a > b) return 1; else return -1;
};
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
};
Reflect.isEnumValue = function(v) {
	return v != null && v.__enum__ != null;
};
Reflect.deleteField = function(o,field) {
	if(!Object.prototype.hasOwnProperty.call(o,field)) return false;
	delete(o[field]);
	return true;
};
Reflect.makeVarArgs = function(f) {
	return function() {
		var a = Array.prototype.slice.call(arguments);
		return f(a);
	};
};
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
var StringBuf = function() {
	this.b = "";
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	add: function(x) {
		this.b += Std.string(x);
	}
	,__class__: StringBuf
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = ["StringTools"];
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return c > 8 && c < 14 || c == 32;
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return HxOverrides.substr(s,r,l - r); else return s;
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return HxOverrides.substr(s,0,l - r); else return s;
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
var ValueType = { __ename__ : true, __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] };
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null; else return js_Boot.getClass(o);
};
Type.getSuperClass = function(c) {
	return c.__super__;
};
Type.getClassName = function(c) {
	var a = c.__name__;
	if(a == null) return null;
	return a.join(".");
};
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
};
Type.createInstance = function(cl,args) {
	var _g = args.length;
	switch(_g) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw new js__$Boot_HaxeError("Too many arguments");
	}
	return null;
};
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
};
Type["typeof"] = function(v) {
	var _g = typeof(v);
	switch(_g) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c = js_Boot.getClass(v);
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(v.__name__ || v.__ename__) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
};
var mmvc_api_ICommand = function() { };
$hxClasses["mmvc.api.ICommand"] = mmvc_api_ICommand;
mmvc_api_ICommand.__name__ = ["mmvc","api","ICommand"];
mmvc_api_ICommand.prototype = {
	__class__: mmvc_api_ICommand
};
var mmvc_impl_TriggerCommand = function() {
};
$hxClasses["mmvc.impl.TriggerCommand"] = mmvc_impl_TriggerCommand;
mmvc_impl_TriggerCommand.__name__ = ["mmvc","impl","TriggerCommand"];
mmvc_impl_TriggerCommand.__interfaces__ = [mmvc_api_ICommand];
mmvc_impl_TriggerCommand.prototype = {
	execute: function() {
	}
	,dispatch: function(trigger) {
		this.triggerMap.dispatch(trigger);
	}
	,__class__: mmvc_impl_TriggerCommand
};
var command_LoadGalleryListCommand = function() {
	mmvc_impl_TriggerCommand.call(this);
};
$hxClasses["command.LoadGalleryListCommand"] = command_LoadGalleryListCommand;
command_LoadGalleryListCommand.__name__ = ["command","LoadGalleryListCommand"];
command_LoadGalleryListCommand.__super__ = mmvc_impl_TriggerCommand;
command_LoadGalleryListCommand.prototype = $extend(mmvc_impl_TriggerCommand.prototype,{
	execute: function() {
		var loader = new isl_PageLoader();
		loader.completed.addOnce($bind(this,this.completed));
		loader.load("api/images");
	}
	,completed: function(data) {
		var parser = new isl_ImageDataParser();
		parser.data = data;
		parser.parse();
		if(parser.validate()) this.trigger.complete(parser.images);
	}
	,__class__: command_LoadGalleryListCommand
});
var core_interfaces_IRoot = function() { };
$hxClasses["core.interfaces.IRoot"] = core_interfaces_IRoot;
core_interfaces_IRoot.__name__ = ["core","interfaces","IRoot"];
core_interfaces_IRoot.prototype = {
	__class__: core_interfaces_IRoot
};
var core_trigger_Trigger = function() {
	this.completed = new msignal_Signal1();
	this.failed = new msignal_Signal1();
	this.cancelled = new msignal_Signal0();
	this.disposed = new msignal_Signal0();
};
$hxClasses["core.trigger.Trigger"] = core_trigger_Trigger;
core_trigger_Trigger.__name__ = ["core","trigger","Trigger"];
core_trigger_Trigger.prototype = {
	complete: function(result) {
		this.completed.dispatch(result);
		this.dispose();
	}
	,fail: function(error) {
		this.failed.dispatch(error);
		this.dispose();
	}
	,cancel: function() {
		this.cancelled.dispatch();
		this.dispose();
	}
	,dispose: function() {
		this.completed.removeAll();
		this.completed = null;
		this.failed.removeAll();
		this.failed = null;
		this.cancelled.removeAll();
		this.cancelled = null;
		this.disposed.dispatch();
		this.disposed.removeAll();
		this.disposed = null;
	}
	,__class__: core_trigger_Trigger
};
var core_view_Component = function(props) {
	React.Component.call(this,props);
	this.state = this.defaultState();
};
$hxClasses["core.view.Component"] = core_view_Component;
core_view_Component.__name__ = ["core","view","Component"];
core_view_Component.__super__ = React.Component;
core_view_Component.prototype = $extend(React.Component.prototype,{
	defaultState: function() {
		return null;
	}
	,getClassName: function() {
		return Type.getClassName(js_Boot.getClass(this)).split(".").pop();
	}
	,__class__: core_view_Component
});
var core_view_MediatedComponent = function(props) {
	core_view_Component.call(this,props);
};
$hxClasses["core.view.MediatedComponent"] = core_view_MediatedComponent;
core_view_MediatedComponent.__name__ = ["core","view","MediatedComponent"];
core_view_MediatedComponent.__super__ = core_view_Component;
core_view_MediatedComponent.prototype = $extend(core_view_Component.prototype,{
	componentDidMount: function() {
		if(this.props.root != null) this.props.root.onViewAdded(this);
	}
	,componentWillUnmount: function() {
		if(this.props.root != null) this.props.root.onViewRemoved(this);
	}
	,__class__: core_view_MediatedComponent
});
var haxe_IMap = function() { };
$hxClasses["haxe.IMap"] = haxe_IMap;
haxe_IMap.__name__ = ["haxe","IMap"];
var haxe_ds_BalancedTree = function() {
};
$hxClasses["haxe.ds.BalancedTree"] = haxe_ds_BalancedTree;
haxe_ds_BalancedTree.__name__ = ["haxe","ds","BalancedTree"];
haxe_ds_BalancedTree.prototype = {
	set: function(key,value) {
		this.root = this.setLoop(key,value,this.root);
	}
	,get: function(key) {
		var node = this.root;
		while(node != null) {
			var c = this.compare(key,node.key);
			if(c == 0) return node.value;
			if(c < 0) node = node.left; else node = node.right;
		}
		return null;
	}
	,setLoop: function(k,v,node) {
		if(node == null) return new haxe_ds_TreeNode(null,k,v,null);
		var c = this.compare(k,node.key);
		if(c == 0) return new haxe_ds_TreeNode(node.left,k,v,node.right,node == null?0:node._height); else if(c < 0) {
			var nl = this.setLoop(k,v,node.left);
			return this.balance(nl,node.key,node.value,node.right);
		} else {
			var nr = this.setLoop(k,v,node.right);
			return this.balance(node.left,node.key,node.value,nr);
		}
	}
	,balance: function(l,k,v,r) {
		var hl;
		if(l == null) hl = 0; else hl = l._height;
		var hr;
		if(r == null) hr = 0; else hr = r._height;
		if(hl > hr + 2) {
			if((function($this) {
				var $r;
				var _this = l.left;
				$r = _this == null?0:_this._height;
				return $r;
			}(this)) >= (function($this) {
				var $r;
				var _this1 = l.right;
				$r = _this1 == null?0:_this1._height;
				return $r;
			}(this))) return new haxe_ds_TreeNode(l.left,l.key,l.value,new haxe_ds_TreeNode(l.right,k,v,r)); else return new haxe_ds_TreeNode(new haxe_ds_TreeNode(l.left,l.key,l.value,l.right.left),l.right.key,l.right.value,new haxe_ds_TreeNode(l.right.right,k,v,r));
		} else if(hr > hl + 2) {
			if((function($this) {
				var $r;
				var _this2 = r.right;
				$r = _this2 == null?0:_this2._height;
				return $r;
			}(this)) > (function($this) {
				var $r;
				var _this3 = r.left;
				$r = _this3 == null?0:_this3._height;
				return $r;
			}(this))) return new haxe_ds_TreeNode(new haxe_ds_TreeNode(l,k,v,r.left),r.key,r.value,r.right); else return new haxe_ds_TreeNode(new haxe_ds_TreeNode(l,k,v,r.left.left),r.left.key,r.left.value,new haxe_ds_TreeNode(r.left.right,r.key,r.value,r.right));
		} else return new haxe_ds_TreeNode(l,k,v,r,(hl > hr?hl:hr) + 1);
	}
	,compare: function(k1,k2) {
		return Reflect.compare(k1,k2);
	}
	,__class__: haxe_ds_BalancedTree
};
var haxe_ds_TreeNode = function(l,k,v,r,h) {
	if(h == null) h = -1;
	this.left = l;
	this.key = k;
	this.value = v;
	this.right = r;
	if(h == -1) this._height = ((function($this) {
		var $r;
		var _this = $this.left;
		$r = _this == null?0:_this._height;
		return $r;
	}(this)) > (function($this) {
		var $r;
		var _this1 = $this.right;
		$r = _this1 == null?0:_this1._height;
		return $r;
	}(this))?(function($this) {
		var $r;
		var _this2 = $this.left;
		$r = _this2 == null?0:_this2._height;
		return $r;
	}(this)):(function($this) {
		var $r;
		var _this3 = $this.right;
		$r = _this3 == null?0:_this3._height;
		return $r;
	}(this))) + 1; else this._height = h;
};
$hxClasses["haxe.ds.TreeNode"] = haxe_ds_TreeNode;
haxe_ds_TreeNode.__name__ = ["haxe","ds","TreeNode"];
haxe_ds_TreeNode.prototype = {
	__class__: haxe_ds_TreeNode
};
var haxe_ds_EnumValueMap = function() {
	haxe_ds_BalancedTree.call(this);
};
$hxClasses["haxe.ds.EnumValueMap"] = haxe_ds_EnumValueMap;
haxe_ds_EnumValueMap.__name__ = ["haxe","ds","EnumValueMap"];
haxe_ds_EnumValueMap.__interfaces__ = [haxe_IMap];
haxe_ds_EnumValueMap.__super__ = haxe_ds_BalancedTree;
haxe_ds_EnumValueMap.prototype = $extend(haxe_ds_BalancedTree.prototype,{
	compare: function(k1,k2) {
		var d = k1[1] - k2[1];
		if(d != 0) return d;
		var p1 = k1.slice(2);
		var p2 = k2.slice(2);
		if(p1.length == 0 && p2.length == 0) return 0;
		return this.compareArgs(p1,p2);
	}
	,compareArgs: function(a1,a2) {
		var ld = a1.length - a2.length;
		if(ld != 0) return ld;
		var _g1 = 0;
		var _g = a1.length;
		while(_g1 < _g) {
			var i = _g1++;
			var d = this.compareArg(a1[i],a2[i]);
			if(d != 0) return d;
		}
		return 0;
	}
	,compareArg: function(v1,v2) {
		if(Reflect.isEnumValue(v1) && Reflect.isEnumValue(v2)) return this.compare(v1,v2); else if((v1 instanceof Array) && v1.__enum__ == null && ((v2 instanceof Array) && v2.__enum__ == null)) return this.compareArgs(v1,v2); else return Reflect.compare(v1,v2);
	}
	,__class__: haxe_ds_EnumValueMap
});
var haxe_ds_ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
$hxClasses["haxe.ds.ObjectMap"] = haxe_ds_ObjectMap;
haxe_ds_ObjectMap.__name__ = ["haxe","ds","ObjectMap"];
haxe_ds_ObjectMap.__interfaces__ = [haxe_IMap];
haxe_ds_ObjectMap.prototype = {
	set: function(key,value) {
		var id = key.__id__ || (key.__id__ = ++haxe_ds_ObjectMap.count);
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,get: function(key) {
		return this.h[key.__id__];
	}
	,exists: function(key) {
		return this.h.__keys__[key.__id__] != null;
	}
	,remove: function(key) {
		var id = key.__id__;
		if(this.h.__keys__[id] == null) return false;
		delete(this.h[id]);
		delete(this.h.__keys__[id]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h.__keys__ ) {
		if(this.h.hasOwnProperty(key)) a.push(this.h.__keys__[key]);
		}
		return HxOverrides.iter(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i.__id__];
		}};
	}
	,__class__: haxe_ds_ObjectMap
};
var haxe_ds__$StringMap_StringMapIterator = function(map,keys) {
	this.map = map;
	this.keys = keys;
	this.index = 0;
	this.count = keys.length;
};
$hxClasses["haxe.ds._StringMap.StringMapIterator"] = haxe_ds__$StringMap_StringMapIterator;
haxe_ds__$StringMap_StringMapIterator.__name__ = ["haxe","ds","_StringMap","StringMapIterator"];
haxe_ds__$StringMap_StringMapIterator.prototype = {
	hasNext: function() {
		return this.index < this.count;
	}
	,next: function() {
		return this.map.get(this.keys[this.index++]);
	}
	,__class__: haxe_ds__$StringMap_StringMapIterator
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe_ds_StringMap;
haxe_ds_StringMap.__name__ = ["haxe","ds","StringMap"];
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	set: function(key,value) {
		if(__map_reserved[key] != null) this.setReserved(key,value); else this.h[key] = value;
	}
	,get: function(key) {
		if(__map_reserved[key] != null) return this.getReserved(key);
		return this.h[key];
	}
	,exists: function(key) {
		if(__map_reserved[key] != null) return this.existsReserved(key);
		return this.h.hasOwnProperty(key);
	}
	,setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) return null; else return this.rh["$" + key];
	}
	,existsReserved: function(key) {
		if(this.rh == null) return false;
		return this.rh.hasOwnProperty("$" + key);
	}
	,remove: function(key) {
		if(__map_reserved[key] != null) {
			key = "$" + key;
			if(this.rh == null || !this.rh.hasOwnProperty(key)) return false;
			delete(this.rh[key]);
			return true;
		} else {
			if(!this.h.hasOwnProperty(key)) return false;
			delete(this.h[key]);
			return true;
		}
	}
	,keys: function() {
		var _this = this.arrayKeys();
		return HxOverrides.iter(_this);
	}
	,arrayKeys: function() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) out.push(key);
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) out.push(key.substr(1));
			}
		}
		return out;
	}
	,iterator: function() {
		return new haxe_ds__$StringMap_StringMapIterator(this,this.arrayKeys());
	}
	,toString: function() {
		var s = new StringBuf();
		s.b += "{";
		var keys = this.arrayKeys();
		var _g1 = 0;
		var _g = keys.length;
		while(_g1 < _g) {
			var i = _g1++;
			var k = keys[i];
			if(k == null) s.b += "null"; else s.b += "" + k;
			s.b += " => ";
			s.add(Std.string(__map_reserved[k] != null?this.getReserved(k):this.h[k]));
			if(i < keys.length) s.b += ", ";
		}
		s.b += "}";
		return s.b;
	}
	,__class__: haxe_ds_StringMap
};
var haxe_rtti_Meta = function() { };
$hxClasses["haxe.rtti.Meta"] = haxe_rtti_Meta;
haxe_rtti_Meta.__name__ = ["haxe","rtti","Meta"];
haxe_rtti_Meta.getType = function(t) {
	var meta = haxe_rtti_Meta.getMeta(t);
	if(meta == null || meta.obj == null) return { }; else return meta.obj;
};
haxe_rtti_Meta.getMeta = function(t) {
	return t.__meta__;
};
haxe_rtti_Meta.getFields = function(t) {
	var meta = haxe_rtti_Meta.getMeta(t);
	if(meta == null || meta.fields == null) return { }; else return meta.fields;
};
var isl_ImageDataParser = function() {
	this.images = [];
};
$hxClasses["isl.ImageDataParser"] = isl_ImageDataParser;
isl_ImageDataParser.__name__ = ["isl","ImageDataParser"];
isl_ImageDataParser.prototype = {
	parse: function() {
		this.parsedResponse = JSON.parse(this.data);
	}
	,validate: function() {
		var _g = 0;
		var _g1 = this.parsedResponse;
		while(_g < _g1.length) {
			var image = _g1[_g];
			++_g;
			var _g2 = 0;
			var _g3 = ["url","description","date","location","photographer"];
			while(_g2 < _g3.length) {
				var field = _g3[_g2];
				++_g2;
				this._checkFieldExists(field,image);
			}
			var id = Reflect.field(image,"id");
			var url = Reflect.field(image,"url");
			var description = Reflect.field(image,"description");
			var date = Reflect.field(image,"date");
			var location = Reflect.field(image,"location");
			var photographer = Reflect.field(image,"photographer");
			var galleryImage = new valueObject_GalleryImage(id,url,description,date,location,photographer);
			this.images.push(galleryImage);
		}
		return true;
	}
	,_checkFieldExists: function(fieldName,image) {
		if(!Object.prototype.hasOwnProperty.call(image,fieldName)) throw new js__$Boot_HaxeError("field missing: " + fieldName);
	}
	,__class__: isl_ImageDataParser
};
var isl_PageLoader = function() {
	this.completed = new msignal_Signal1();
};
$hxClasses["isl.PageLoader"] = isl_PageLoader;
isl_PageLoader.__name__ = ["isl","PageLoader"];
isl_PageLoader.prototype = {
	load: function(endpoint) {
		var _g = this;
		var request = new yloader_valueObject_Request(endpoint);
		var loader = new yloader_impl_js_XMLHttpRequestLoader(request);
		loader.onResponse = function(response) {
			_g.completed.dispatch(response.data);
		};
		loader.load();
	}
	,__class__: isl_PageLoader
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
$hxClasses["js._Boot.HaxeError"] = js__$Boot_HaxeError;
js__$Boot_HaxeError.__name__ = ["js","_Boot","HaxeError"];
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
$hxClasses["js.Boot"] = js_Boot;
js_Boot.__name__ = ["js","Boot"];
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__cast = function(o,t) {
	if(js_Boot.__instanceof(o,t)) return o; else throw new js__$Boot_HaxeError("Cannot cast " + Std.string(o) + " to " + Std.string(t));
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
var js_Browser = function() { };
$hxClasses["js.Browser"] = js_Browser;
js_Browser.__name__ = ["js","Browser"];
js_Browser.createXMLHttpRequest = function() {
	if(typeof XMLHttpRequest != "undefined") return new XMLHttpRequest();
	if(typeof ActiveXObject != "undefined") return new ActiveXObject("Microsoft.XMLHTTP");
	throw new js__$Boot_HaxeError("Unable to create XMLHttpRequest object.");
};
var minject_ClassMap = function() {
	this.map = new haxe_ds_StringMap();
};
$hxClasses["minject.ClassMap"] = minject_ClassMap;
minject_ClassMap.__name__ = ["minject","ClassMap"];
minject_ClassMap.__interfaces__ = [haxe_IMap];
minject_ClassMap.prototype = {
	get: function(k) {
		var key = Type.getClassName(k);
		return this.map.get(key);
	}
	,set: function(k,v) {
		var key = Type.getClassName(k);
		this.map.set(key,v);
	}
	,exists: function(k) {
		var key = Type.getClassName(k);
		return this.map.exists(key);
	}
	,remove: function(k) {
		var key = Type.getClassName(k);
		return this.map.remove(key);
	}
	,keys: function() {
		return (function($this) {
			var $r;
			var _this;
			{
				var _g = [];
				var $it0 = $this.map.keys();
				while( $it0.hasNext() ) {
					var k = $it0.next();
					_g.push(Type.resolveClass(k));
				}
				_this = _g;
			}
			$r = HxOverrides.iter(_this);
			return $r;
		}(this));
	}
	,iterator: function() {
		return this.map.iterator();
	}
	,toString: function() {
		return this.map.toString();
	}
	,getKey: function(k) {
		return Type.getClassName(k);
	}
	,__class__: minject_ClassMap
};
var minject_InjectionConfig = function(request,injectionName) {
	this.request = request;
	this.injectionName = injectionName;
};
$hxClasses["minject.InjectionConfig"] = minject_InjectionConfig;
minject_InjectionConfig.__name__ = ["minject","InjectionConfig"];
minject_InjectionConfig.prototype = {
	getResponse: function(injector) {
		if(this.injector != null) injector = this.injector;
		if(this.result != null) return this.result.getResponse(injector);
		var parentConfig = injector.getAncestorMapping(this.request,this.injectionName);
		if(parentConfig != null) return parentConfig.getResponse(injector);
		return null;
	}
	,hasResponse: function(injector) {
		return this.result != null;
	}
	,hasOwnResponse: function() {
		return this.result != null;
	}
	,setResult: function(result) {
		if(this.result != null && result != null) console.log("Warning: Injector contains " + this.toString() + ".\nAttempting to overwrite this " + ("with mapping for [" + result.toString() + "].\nIf you have overwritten this mapping ") + "intentionally you can use `injector.unmap()` prior to your replacement mapping " + "in order to avoid seeing this message.");
		this.result = result;
	}
	,setInjector: function(injector) {
		this.injector = injector;
	}
	,toString: function() {
		var named;
		if(this.injectionName != null && this.injectionName != "") named = " named \"" + this.injectionName + "\" and"; else named = "";
		return "rule: [" + Type.getClassName(this.request) + ("]" + named + " mapped to [" + Std.string(this.result) + "]");
	}
	,__class__: minject_InjectionConfig
};
var minject_Injector = function() {
	this.injectionConfigs = new haxe_ds_StringMap();
	this.injecteeDescriptions = new minject_ClassMap();
	this.attendedToInjectees = new minject_InjecteeSet();
};
$hxClasses["minject.Injector"] = minject_Injector;
minject_Injector.__name__ = ["minject","Injector"];
minject_Injector.prototype = {
	mapValue: function(whenAskedFor,useValue,named) {
		if(named == null) named = "";
		var config = this.getMapping(whenAskedFor,named);
		config.setResult(new minject_result_InjectValueResult(useValue));
		return config;
	}
	,mapClass: function(whenAskedFor,instantiateClass,named) {
		if(named == null) named = "";
		var config = this.getMapping(whenAskedFor,named);
		config.setResult(new minject_result_InjectClassResult(instantiateClass));
		return config;
	}
	,mapSingleton: function(whenAskedFor,named) {
		if(named == null) named = "";
		return this.mapSingletonOf(whenAskedFor,whenAskedFor,named);
	}
	,mapSingletonOf: function(whenAskedFor,useSingletonOf,named) {
		if(named == null) named = "";
		var config = this.getMapping(whenAskedFor,named);
		config.setResult(new minject_result_InjectSingletonResult(useSingletonOf));
		return config;
	}
	,mapRule: function(whenAskedFor,useRule,named) {
		if(named == null) named = "";
		var config = this.getMapping(whenAskedFor,named);
		config.setResult(new minject_result_InjectOtherRuleResult(useRule));
		return useRule;
	}
	,getMapping: function(forClass,named) {
		if(named == null) named = "";
		var requestName = this.getClassName(forClass) + "#" + named;
		if(this.injectionConfigs.exists(requestName)) return this.injectionConfigs.get(requestName);
		var config = new minject_InjectionConfig(forClass,named);
		this.injectionConfigs.set(requestName,config);
		return config;
	}
	,injectInto: function(target) {
		if(this.attendedToInjectees.contains(target)) return;
		this.attendedToInjectees.add(target);
		var targetClass = Type.getClass(target);
		var injecteeDescription = null;
		if(this.injecteeDescriptions.exists(targetClass)) injecteeDescription = this.injecteeDescriptions.get(targetClass); else injecteeDescription = this.getInjectionPoints(targetClass);
		if(injecteeDescription == null) return;
		var injectionPoints = injecteeDescription.injectionPoints;
		var length = injectionPoints.length;
		var _g = 0;
		while(_g < length) {
			var i = _g++;
			var injectionPoint = injectionPoints[i];
			injectionPoint.applyInjection(target,this);
		}
	}
	,construct: function(theClass) {
		var injecteeDescription;
		if(this.injecteeDescriptions.exists(theClass)) injecteeDescription = this.injecteeDescriptions.get(theClass); else injecteeDescription = this.getInjectionPoints(theClass);
		var injectionPoint = injecteeDescription.ctor;
		return injectionPoint.applyInjection(theClass,this);
	}
	,instantiate: function(theClass) {
		var instance = this.construct(theClass);
		this.injectInto(instance);
		return instance;
	}
	,unmap: function(theClass,named) {
		if(named == null) named = "";
		var mapping = this.getConfigurationForRequest(theClass,named);
		if(mapping == null) throw new js__$Boot_HaxeError("Error while removing an injector mapping: No mapping defined for class " + this.getClassName(theClass) + ", named \"" + named + "\"");
		mapping.setResult(null);
	}
	,hasMapping: function(forClass,named) {
		if(named == null) named = "";
		var mapping = this.getConfigurationForRequest(forClass,named);
		if(mapping == null) return false;
		return mapping.hasResponse(this);
	}
	,getInstance: function(ofClass,named) {
		if(named == null) named = "";
		var mapping = this.getConfigurationForRequest(ofClass,named);
		if(mapping == null || !mapping.hasResponse(this)) throw new js__$Boot_HaxeError("Error while getting mapping response: No mapping defined for class " + this.getClassName(ofClass) + ", named \"" + named + "\"");
		return mapping.getResponse(this);
	}
	,createChildInjector: function() {
		var injector = new minject_Injector();
		injector.set_parentInjector(this);
		return injector;
	}
	,getAncestorMapping: function(forClass,named) {
		var parent = this.parentInjector;
		while(parent != null) {
			var parentConfig = parent.getConfigurationForRequest(forClass,named,false);
			if(parentConfig != null && parentConfig.hasOwnResponse()) return parentConfig;
			parent = parent.parentInjector;
		}
		return null;
	}
	,getInjectionPoints: function(forClass) {
		var typeMeta = haxe_rtti_Meta.getType(forClass);
		if(typeMeta != null && Object.prototype.hasOwnProperty.call(typeMeta,"interface")) throw new js__$Boot_HaxeError("Interfaces can't be used as instantiatable classes.");
		var fieldsMeta = this.getFields(forClass);
		var ctorInjectionPoint = null;
		var injectionPoints = [];
		var postConstructMethodPoints = [];
		var _g = 0;
		var _g1 = Reflect.fields(fieldsMeta);
		while(_g < _g1.length) {
			var field = _g1[_g];
			++_g;
			var fieldMeta = Reflect.field(fieldsMeta,field);
			var inject = Object.prototype.hasOwnProperty.call(fieldMeta,"inject");
			var post = Object.prototype.hasOwnProperty.call(fieldMeta,"post");
			var type = Reflect.field(fieldMeta,"type");
			var args = Reflect.field(fieldMeta,"args");
			if(field == "_") {
				if(args.length > 0) ctorInjectionPoint = new minject_point_ConstructorInjectionPoint(fieldMeta.args);
			} else if(Object.prototype.hasOwnProperty.call(fieldMeta,"args")) {
				if(inject) {
					var point = new minject_point_MethodInjectionPoint(field,fieldMeta.args);
					injectionPoints.push(point);
				} else if(post) {
					var order;
					if(fieldMeta.post == null) order = 0; else order = fieldMeta.post[0];
					var point1 = new minject_point_PostConstructInjectionPoint(field,order);
					postConstructMethodPoints.push(point1);
				}
			} else if(type != null) {
				var name;
				if(fieldMeta.inject == null) name = null; else name = fieldMeta.inject[0];
				var point2 = new minject_point_PropertyInjectionPoint(field,fieldMeta.type[0],name);
				injectionPoints.push(point2);
			}
		}
		if(postConstructMethodPoints.length > 0) {
			postConstructMethodPoints.sort(function(a,b) {
				return a.order - b.order;
			});
			var _g2 = 0;
			while(_g2 < postConstructMethodPoints.length) {
				var point3 = postConstructMethodPoints[_g2];
				++_g2;
				injectionPoints.push(point3);
			}
		}
		if(ctorInjectionPoint == null) ctorInjectionPoint = new minject_point_NoParamsConstructorInjectionPoint();
		var injecteeDescription = new minject_InjecteeDescription(ctorInjectionPoint,injectionPoints);
		this.injecteeDescriptions.set(forClass,injecteeDescription);
		return injecteeDescription;
	}
	,getConfigurationForRequest: function(forClass,named,traverseAncestors) {
		if(traverseAncestors == null) traverseAncestors = true;
		var requestName = this.getClassName(forClass) + "#" + named;
		if(!this.injectionConfigs.exists(requestName)) {
			if(traverseAncestors && this.parentInjector != null && this.parentInjector.hasMapping(forClass,named)) return this.getAncestorMapping(forClass,named);
			return null;
		}
		return this.injectionConfigs.get(requestName);
	}
	,set_parentInjector: function(value) {
		if(this.parentInjector != null && value == null) this.attendedToInjectees = new minject_InjecteeSet();
		this.parentInjector = value;
		if(this.parentInjector != null) this.attendedToInjectees = this.parentInjector.attendedToInjectees;
		return this.parentInjector;
	}
	,getClassName: function(forClass) {
		if(forClass == null) return "Dynamic"; else return Type.getClassName(forClass);
	}
	,getFields: function(type) {
		var meta = { };
		while(type != null) {
			var typeMeta = haxe_rtti_Meta.getFields(type);
			var _g = 0;
			var _g1 = Reflect.fields(typeMeta);
			while(_g < _g1.length) {
				var field = _g1[_g];
				++_g;
				Reflect.setField(meta,field,Reflect.field(typeMeta,field));
			}
			type = Type.getSuperClass(type);
		}
		return meta;
	}
	,__class__: minject_Injector
	,__properties__: {set_parentInjector:"set_parentInjector"}
};
var minject_InjecteeSet = function() {
};
$hxClasses["minject.InjecteeSet"] = minject_InjecteeSet;
minject_InjecteeSet.__name__ = ["minject","InjecteeSet"];
minject_InjecteeSet.prototype = {
	add: function(value) {
		value.__injected__ = true;
	}
	,contains: function(value) {
		return value.__injected__ == true;
	}
	,remove: function(value) {
		Reflect.deleteField(value,"__injected__");
	}
	,'delete': function(value) {
		this.remove(value);
	}
	,iterator: function() {
		return HxOverrides.iter([]);
	}
	,__class__: minject_InjecteeSet
};
var minject_InjecteeDescription = function(ctor,injectionPoints) {
	this.ctor = ctor;
	this.injectionPoints = injectionPoints;
};
$hxClasses["minject.InjecteeDescription"] = minject_InjecteeDescription;
minject_InjecteeDescription.__name__ = ["minject","InjecteeDescription"];
minject_InjecteeDescription.prototype = {
	__class__: minject_InjecteeDescription
};
var minject_Reflector = function() {
};
$hxClasses["minject.Reflector"] = minject_Reflector;
minject_Reflector.__name__ = ["minject","Reflector"];
minject_Reflector.prototype = {
	classExtendsOrImplements: function(classOrClassName,superClass) {
		var actualClass = null;
		if(js_Boot.__instanceof(classOrClassName,Class)) actualClass = js_Boot.__cast(classOrClassName , Class); else if(typeof(classOrClassName) == "string") try {
			actualClass = Type.resolveClass(js_Boot.__cast(classOrClassName , String));
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			throw new js__$Boot_HaxeError("The class name " + Std.string(classOrClassName) + " is not valid because of " + Std.string(e) + "\n" + Std.string(e.getStackTrace()));
		}
		if(actualClass == null) throw new js__$Boot_HaxeError("The parameter classOrClassName must be a Class or fully qualified class name.");
		var classInstance = Type.createEmptyInstance(actualClass);
		return js_Boot.__instanceof(classInstance,superClass);
	}
	,getClass: function(value) {
		if(js_Boot.__instanceof(value,Class)) return value;
		return Type.getClass(value);
	}
	,getFQCN: function(value) {
		var fqcn;
		if(typeof(value) == "string") return js_Boot.__cast(value , String);
		return Type.getClassName(value);
	}
	,__class__: minject_Reflector
};
var minject_point_InjectionPoint = function() { };
$hxClasses["minject.point.InjectionPoint"] = minject_point_InjectionPoint;
minject_point_InjectionPoint.__name__ = ["minject","point","InjectionPoint"];
minject_point_InjectionPoint.prototype = {
	__class__: minject_point_InjectionPoint
};
var minject_point_MethodInjectionPoint = function(name,args) {
	this.name = name;
	this.args = args;
	var _g = 0;
	while(_g < args.length) {
		var arg = args[_g];
		++_g;
		if(arg.type == "Dynamic") throw new js__$Boot_HaxeError("Error in method definition of injectee. Required parameters can't have non class type.");
	}
};
$hxClasses["minject.point.MethodInjectionPoint"] = minject_point_MethodInjectionPoint;
minject_point_MethodInjectionPoint.__name__ = ["minject","point","MethodInjectionPoint"];
minject_point_MethodInjectionPoint.__interfaces__ = [minject_point_InjectionPoint];
minject_point_MethodInjectionPoint.prototype = {
	applyInjection: function(target,injector) {
		Reflect.callMethod(target,Reflect.field(target,this.name),this.gatherArgs(target,injector));
		return target;
	}
	,gatherArgs: function(target,injector) {
		var values = [];
		var _g = 0;
		var _g1 = this.args;
		while(_g < _g1.length) {
			var arg = _g1[_g];
			++_g;
			var name;
			if(arg.name == null) name = ""; else name = arg.name;
			var config = injector.getMapping(Type.resolveClass(arg.type),arg.name);
			var injection = config.getResponse(injector);
			if(injection == null && !arg.opt) {
				var targetName = Type.getClassName(Type.getClass(target));
				var requestName = Type.getClassName(config.request);
				throw new js__$Boot_HaxeError("Injector is missing a rule to handle injection into target " + targetName + ". " + ("Target dependency: " + requestName + ", method: " + name + ", named: ") + arg.name);
			}
			values.push(injection);
		}
		return values;
	}
	,__class__: minject_point_MethodInjectionPoint
};
var minject_point_ConstructorInjectionPoint = function(args) {
	minject_point_MethodInjectionPoint.call(this,"new",args);
};
$hxClasses["minject.point.ConstructorInjectionPoint"] = minject_point_ConstructorInjectionPoint;
minject_point_ConstructorInjectionPoint.__name__ = ["minject","point","ConstructorInjectionPoint"];
minject_point_ConstructorInjectionPoint.__super__ = minject_point_MethodInjectionPoint;
minject_point_ConstructorInjectionPoint.prototype = $extend(minject_point_MethodInjectionPoint.prototype,{
	applyInjection: function(target,injector) {
		return Type.createInstance(target,this.gatherArgs(target,injector));
	}
	,__class__: minject_point_ConstructorInjectionPoint
});
var minject_point_NoParamsConstructorInjectionPoint = function() {
};
$hxClasses["minject.point.NoParamsConstructorInjectionPoint"] = minject_point_NoParamsConstructorInjectionPoint;
minject_point_NoParamsConstructorInjectionPoint.__name__ = ["minject","point","NoParamsConstructorInjectionPoint"];
minject_point_NoParamsConstructorInjectionPoint.__interfaces__ = [minject_point_InjectionPoint];
minject_point_NoParamsConstructorInjectionPoint.prototype = {
	applyInjection: function(target,injector) {
		return Type.createInstance(target,[]);
	}
	,__class__: minject_point_NoParamsConstructorInjectionPoint
};
var minject_point_PostConstructInjectionPoint = function(name,order) {
	if(order == null) order = 0;
	this.name = name;
	this.order = order;
};
$hxClasses["minject.point.PostConstructInjectionPoint"] = minject_point_PostConstructInjectionPoint;
minject_point_PostConstructInjectionPoint.__name__ = ["minject","point","PostConstructInjectionPoint"];
minject_point_PostConstructInjectionPoint.__interfaces__ = [minject_point_InjectionPoint];
minject_point_PostConstructInjectionPoint.prototype = {
	applyInjection: function(target,injector) {
		Reflect.callMethod(target,Reflect.field(target,this.name),[]);
		return target;
	}
	,__class__: minject_point_PostConstructInjectionPoint
};
var minject_point_PropertyInjectionPoint = function(name,type,injectionName) {
	this.name = name;
	this.type = type;
	this.injectionName = injectionName;
};
$hxClasses["minject.point.PropertyInjectionPoint"] = minject_point_PropertyInjectionPoint;
minject_point_PropertyInjectionPoint.__name__ = ["minject","point","PropertyInjectionPoint"];
minject_point_PropertyInjectionPoint.__interfaces__ = [minject_point_InjectionPoint];
minject_point_PropertyInjectionPoint.prototype = {
	applyInjection: function(target,injector) {
		var injectionConfig = injector.getMapping(Type.resolveClass(this.type),this.injectionName);
		var injection = injectionConfig.getResponse(injector);
		if(injection == null) throw new js__$Boot_HaxeError("Injector is missing a rule to handle injection into property \"" + this.name + "\" " + ("of object \"" + Std.string(target) + "\". Target dependency: \"" + this.type + "\", named \"" + this.injectionName + "\""));
		Reflect.setProperty(target,this.name,injection);
		return target;
	}
	,__class__: minject_point_PropertyInjectionPoint
};
var minject_result_InjectionResult = function() {
};
$hxClasses["minject.result.InjectionResult"] = minject_result_InjectionResult;
minject_result_InjectionResult.__name__ = ["minject","result","InjectionResult"];
minject_result_InjectionResult.prototype = {
	getResponse: function(injector) {
		return null;
	}
	,toString: function() {
		return "";
	}
	,__class__: minject_result_InjectionResult
};
var minject_result_InjectClassResult = function(responseType) {
	minject_result_InjectionResult.call(this);
	this.responseType = responseType;
};
$hxClasses["minject.result.InjectClassResult"] = minject_result_InjectClassResult;
minject_result_InjectClassResult.__name__ = ["minject","result","InjectClassResult"];
minject_result_InjectClassResult.__super__ = minject_result_InjectionResult;
minject_result_InjectClassResult.prototype = $extend(minject_result_InjectionResult.prototype,{
	getResponse: function(injector) {
		return injector.instantiate(this.responseType);
	}
	,toString: function() {
		return "class " + Type.getClassName(this.responseType);
	}
	,__class__: minject_result_InjectClassResult
});
var minject_result_InjectOtherRuleResult = function(rule) {
	minject_result_InjectionResult.call(this);
	this.rule = rule;
};
$hxClasses["minject.result.InjectOtherRuleResult"] = minject_result_InjectOtherRuleResult;
minject_result_InjectOtherRuleResult.__name__ = ["minject","result","InjectOtherRuleResult"];
minject_result_InjectOtherRuleResult.__super__ = minject_result_InjectionResult;
minject_result_InjectOtherRuleResult.prototype = $extend(minject_result_InjectionResult.prototype,{
	getResponse: function(injector) {
		return this.rule.getResponse(injector);
	}
	,toString: function() {
		return this.rule.toString();
	}
	,__class__: minject_result_InjectOtherRuleResult
});
var minject_result_InjectSingletonResult = function(responseType) {
	minject_result_InjectionResult.call(this);
	this.responseType = responseType;
};
$hxClasses["minject.result.InjectSingletonResult"] = minject_result_InjectSingletonResult;
minject_result_InjectSingletonResult.__name__ = ["minject","result","InjectSingletonResult"];
minject_result_InjectSingletonResult.__super__ = minject_result_InjectionResult;
minject_result_InjectSingletonResult.prototype = $extend(minject_result_InjectionResult.prototype,{
	getResponse: function(injector) {
		if(this.response == null) {
			this.response = this.createResponse(injector);
			injector.injectInto(this.response);
		}
		return this.response;
	}
	,createResponse: function(injector) {
		return injector.construct(this.responseType);
	}
	,toString: function() {
		return "singleton " + Type.getClassName(this.responseType);
	}
	,__class__: minject_result_InjectSingletonResult
});
var minject_result_InjectValueResult = function(value) {
	minject_result_InjectionResult.call(this);
	this.value = value;
};
$hxClasses["minject.result.InjectValueResult"] = minject_result_InjectValueResult;
minject_result_InjectValueResult.__name__ = ["minject","result","InjectValueResult"];
minject_result_InjectValueResult.__super__ = minject_result_InjectionResult;
minject_result_InjectValueResult.prototype = $extend(minject_result_InjectionResult.prototype,{
	getResponse: function(injector) {
		return this.value;
	}
	,toString: function() {
		return "instance of " + Type.getClassName(Type.getClass(this.value));
	}
	,__class__: minject_result_InjectValueResult
});
var mmvc_api_ICommandMap = function() { };
$hxClasses["mmvc.api.ICommandMap"] = mmvc_api_ICommandMap;
mmvc_api_ICommandMap.__name__ = ["mmvc","api","ICommandMap"];
mmvc_api_ICommandMap.prototype = {
	__class__: mmvc_api_ICommandMap
};
var mmvc_api_IMediator = function() { };
$hxClasses["mmvc.api.IMediator"] = mmvc_api_IMediator;
mmvc_api_IMediator.__name__ = ["mmvc","api","IMediator"];
mmvc_api_IMediator.prototype = {
	__class__: mmvc_api_IMediator
};
var mmvc_api_IMediatorMap = function() { };
$hxClasses["mmvc.api.IMediatorMap"] = mmvc_api_IMediatorMap;
mmvc_api_IMediatorMap.__name__ = ["mmvc","api","IMediatorMap"];
mmvc_api_IMediatorMap.prototype = {
	__class__: mmvc_api_IMediatorMap
	,__properties__: {set_enabled:"set_enabled",set_contextView:"set_contextView"}
};
var mmvc_api_ITriggerMap = function() { };
$hxClasses["mmvc.api.ITriggerMap"] = mmvc_api_ITriggerMap;
mmvc_api_ITriggerMap.__name__ = ["mmvc","api","ITriggerMap"];
mmvc_api_ITriggerMap.prototype = {
	__class__: mmvc_api_ITriggerMap
};
var mmvc_api_IViewContainer = function() { };
$hxClasses["mmvc.api.IViewContainer"] = mmvc_api_IViewContainer;
mmvc_api_IViewContainer.__name__ = ["mmvc","api","IViewContainer"];
mmvc_api_IViewContainer.prototype = {
	__class__: mmvc_api_IViewContainer
};
var mmvc_api_IViewMap = function() { };
$hxClasses["mmvc.api.IViewMap"] = mmvc_api_IViewMap;
mmvc_api_IViewMap.__name__ = ["mmvc","api","IViewMap"];
mmvc_api_IViewMap.prototype = {
	__class__: mmvc_api_IViewMap
	,__properties__: {set_enabled:"set_enabled",set_contextView:"set_contextView"}
};
var mmvc_base_CommandMap = function(injector) {
	this.injector = injector;
	this.signalMap = new haxe_ds_ObjectMap();
	this.signalClassMap = new minject_ClassMap();
	this.detainedCommands = new haxe_ds_ObjectMap();
};
$hxClasses["mmvc.base.CommandMap"] = mmvc_base_CommandMap;
mmvc_base_CommandMap.__name__ = ["mmvc","base","CommandMap"];
mmvc_base_CommandMap.__interfaces__ = [mmvc_api_ICommandMap];
mmvc_base_CommandMap.prototype = {
	mapSignalClass: function(signalClass,commandClass,oneShot) {
		if(oneShot == null) oneShot = false;
		var signal = this.getSignalClassInstance(signalClass);
		this.mapSignal(signal,commandClass,oneShot);
		return signal;
	}
	,mapSignal: function(signal,commandClass,oneShot) {
		if(oneShot == null) oneShot = false;
		if(this.hasSignalCommand(signal,commandClass)) return;
		var signalCommandMap;
		if(this.signalMap.h.__keys__[signal.__id__] != null) signalCommandMap = this.signalMap.h[signal.__id__]; else {
			signalCommandMap = new minject_ClassMap();
			this.signalMap.set(signal,signalCommandMap);
		}
		var me = this;
		var callbackFunction = Reflect.makeVarArgs(function(args) {
			me.routeSignalToCommand(signal,args,commandClass,oneShot);
		});
		signalCommandMap.set(commandClass,callbackFunction);
		signal.add(callbackFunction);
	}
	,unmapSignalClass: function(signalClass,commandClass) {
		var signal = this.getSignalClassInstance(signalClass);
		this.unmapSignal(signal,commandClass);
		if(!this.hasCommand(signal)) {
			this.injector.unmap(signalClass);
			this.signalClassMap.remove(signalClass);
		}
	}
	,unmapSignal: function(signal,commandClass) {
		var callbacksByCommandClass = this.signalMap.h[signal.__id__];
		if(callbacksByCommandClass == null) return;
		var callbackFunction = callbacksByCommandClass.get(commandClass);
		if(callbackFunction == null) return;
		if(!this.hasCommand(signal)) this.signalMap.remove(signal);
		signal.remove(callbackFunction);
		callbacksByCommandClass.remove(commandClass);
	}
	,getSignalClassInstance: function(signalClass) {
		if(this.signalClassMap.exists(signalClass)) return js_Boot.__cast(this.signalClassMap.get(signalClass) , msignal_Signal);
		return this.createSignalClassInstance(signalClass);
	}
	,createSignalClassInstance: function(signalClass) {
		var injectorForSignalInstance = this.injector;
		if(this.injector.hasMapping(minject_Injector)) injectorForSignalInstance = this.injector.getInstance(minject_Injector);
		var signal = injectorForSignalInstance.instantiate(signalClass);
		injectorForSignalInstance.mapValue(signalClass,signal);
		this.signalClassMap.set(signalClass,signal);
		return signal;
	}
	,hasCommand: function(signal) {
		var callbacksByCommandClass = this.signalMap.h[signal.__id__];
		if(callbacksByCommandClass == null) return false;
		var count = 0;
		var $it0 = callbacksByCommandClass.iterator();
		while( $it0.hasNext() ) {
			var key = $it0.next();
			count++;
		}
		return count > 0;
	}
	,hasSignalCommand: function(signal,commandClass) {
		var callbacksByCommandClass = this.signalMap.h[signal.__id__];
		if(callbacksByCommandClass == null) return false;
		var callbackFunction = callbacksByCommandClass.get(commandClass);
		return callbackFunction != null;
	}
	,routeSignalToCommand: function(signal,valueObjects,commandClass,oneshot) {
		this.injector.mapValue(msignal_Signal,signal);
		this.mapSignalValues(signal.valueClasses,valueObjects);
		var command = this.createCommandInstance(commandClass);
		this.injector.unmap(msignal_Signal);
		this.unmapSignalValues(signal.valueClasses,valueObjects);
		command.execute();
		this.injector.attendedToInjectees.remove(command);
		if(oneshot) this.unmapSignal(signal,commandClass);
	}
	,createCommandInstance: function(commandClass) {
		return this.injector.instantiate(commandClass);
	}
	,mapSignalValues: function(valueClasses,valueObjects) {
		var _g1 = 0;
		var _g = valueClasses.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.injector.mapValue(valueClasses[i],valueObjects[i]);
		}
	}
	,unmapSignalValues: function(valueClasses,valueObjects) {
		var _g1 = 0;
		var _g = valueClasses.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.injector.unmap(valueClasses[i]);
		}
	}
	,detain: function(command) {
		this.detainedCommands.set(command,true);
	}
	,release: function(command) {
		if(this.detainedCommands.h.__keys__[command.__id__] != null) this.detainedCommands.remove(command);
	}
	,__class__: mmvc_base_CommandMap
};
var mmvc_base_ContextError = function(message,id) {
	if(id == null) id = 0;
	if(message == null) message = "";
	this.message = message;
	this.id = id;
};
$hxClasses["mmvc.base.ContextError"] = mmvc_base_ContextError;
mmvc_base_ContextError.__name__ = ["mmvc","base","ContextError"];
mmvc_base_ContextError.prototype = {
	__class__: mmvc_base_ContextError
};
var mmvc_base_MediatorBase = function() {
	this.slots = [];
};
$hxClasses["mmvc.base.MediatorBase"] = mmvc_base_MediatorBase;
mmvc_base_MediatorBase.__name__ = ["mmvc","base","MediatorBase"];
mmvc_base_MediatorBase.__interfaces__ = [mmvc_api_IMediator];
mmvc_base_MediatorBase.prototype = {
	preRegister: function() {
		this.removed = false;
		this.onRegister();
	}
	,onRegister: function() {
	}
	,preRemove: function() {
		this.removed = true;
		this.onRemove();
	}
	,onRemove: function() {
		var _g = 0;
		var _g1 = this.slots;
		while(_g < _g1.length) {
			var slot = _g1[_g];
			++_g;
			slot.remove();
		}
	}
	,getViewComponent: function() {
		return this.view;
	}
	,setViewComponent: function(viewComponent) {
		this.view = viewComponent;
	}
	,mediate: function(slot) {
		this.slots.push(slot);
	}
	,__class__: mmvc_base_MediatorBase
};
var mmvc_base_ViewMapBase = function(contextView,injector) {
	this.viewListenerCount = 0;
	this.set_enabled(true);
	this.injector = injector;
	this.set_contextView(contextView);
};
$hxClasses["mmvc.base.ViewMapBase"] = mmvc_base_ViewMapBase;
mmvc_base_ViewMapBase.__name__ = ["mmvc","base","ViewMapBase"];
mmvc_base_ViewMapBase.prototype = {
	set_contextView: function(value) {
		if(value != this.contextView) {
			this.removeListeners();
			this.contextView = value;
			if(this.viewListenerCount > 0) this.addListeners();
		}
		return this.contextView;
	}
	,set_enabled: function(value) {
		if(value != this.enabled) {
			this.removeListeners();
			this.enabled = value;
			if(this.viewListenerCount > 0) this.addListeners();
		}
		return value;
	}
	,addListeners: function() {
	}
	,removeListeners: function() {
	}
	,onViewAdded: function(view) {
	}
	,onViewRemoved: function(view) {
	}
	,__class__: mmvc_base_ViewMapBase
	,__properties__: {set_enabled:"set_enabled",set_contextView:"set_contextView"}
};
var mmvc_base_MediatorMap = function(contextView,injector,reflector) {
	mmvc_base_ViewMapBase.call(this,contextView,injector);
	this.reflector = reflector;
	this.mediatorByView = new haxe_ds_ObjectMap();
	this.mappingConfigByView = new haxe_ds_ObjectMap();
	this.mappingConfigByViewClassName = new haxe_ds_StringMap();
	this.mediatorsMarkedForRemoval = new haxe_ds_ObjectMap();
	this.hasMediatorsMarkedForRemoval = false;
};
$hxClasses["mmvc.base.MediatorMap"] = mmvc_base_MediatorMap;
mmvc_base_MediatorMap.__name__ = ["mmvc","base","MediatorMap"];
mmvc_base_MediatorMap.__interfaces__ = [mmvc_api_IMediatorMap];
mmvc_base_MediatorMap.__super__ = mmvc_base_ViewMapBase;
mmvc_base_MediatorMap.prototype = $extend(mmvc_base_ViewMapBase.prototype,{
	mapView: function(viewClassOrName,mediatorClass,injectViewAs,autoCreate,autoRemove) {
		if(autoRemove == null) autoRemove = true;
		if(autoCreate == null) autoCreate = true;
		var viewClassName = this.reflector.getFQCN(viewClassOrName);
		if(this.mappingConfigByViewClassName.get(viewClassName) != null) throw new js__$Boot_HaxeError(new mmvc_base_ContextError("Mediator Class has already been mapped to a View Class in this context - " + Std.string(mediatorClass)));
		if(this.reflector.classExtendsOrImplements(mediatorClass,mmvc_api_IMediator) == false) throw new js__$Boot_HaxeError(new mmvc_base_ContextError("Mediator Class does not implement IMediator - " + Std.string(mediatorClass)));
		var config = new mmvc_base_MappingConfig();
		config.mediatorClass = mediatorClass;
		config.autoCreate = autoCreate;
		config.autoRemove = autoRemove;
		if(injectViewAs) {
			if((injectViewAs instanceof Array) && injectViewAs.__enum__ == null) {
				var _this;
				_this = js_Boot.__cast(injectViewAs , Array);
				config.typedViewClasses = _this.slice();
			} else if(js_Boot.__instanceof(injectViewAs,Class)) config.typedViewClasses = [injectViewAs];
		} else if(js_Boot.__instanceof(viewClassOrName,Class)) config.typedViewClasses = [viewClassOrName];
		this.mappingConfigByViewClassName.set(viewClassName,config);
		if(autoCreate || autoRemove) {
			this.viewListenerCount++;
			if(this.viewListenerCount == 1) this.addListeners();
		}
		if(autoCreate && this.contextView != null && viewClassName == Type.getClassName(Type.getClass(this.contextView))) this.createMediatorUsing(this.contextView,viewClassName,config);
	}
	,unmapView: function(viewClassOrName) {
		var viewClassName = this.reflector.getFQCN(viewClassOrName);
		var config = this.mappingConfigByViewClassName.get(viewClassName);
		if(config != null && (config.autoCreate || config.autoRemove)) {
			this.viewListenerCount--;
			if(this.viewListenerCount == 0) this.removeListeners();
		}
		this.mappingConfigByViewClassName.remove(viewClassName);
	}
	,createMediator: function(viewComponent) {
		return this.createMediatorUsing(viewComponent);
	}
	,registerMediator: function(viewComponent,mediator) {
		this.mediatorByView.set(viewComponent,mediator);
		var mapping;
		var key = Type.getClassName(Type.getClass(viewComponent));
		mapping = this.mappingConfigByViewClassName.get(key);
		this.mappingConfigByView.set(viewComponent,mapping);
		mediator.setViewComponent(viewComponent);
		mediator.preRegister();
	}
	,removeMediator: function(mediator) {
		if(mediator != null) {
			var viewComponent = mediator.getViewComponent();
			this.mediatorByView.remove(viewComponent);
			this.mappingConfigByView.remove(viewComponent);
			mediator.preRemove();
			mediator.setViewComponent(null);
		}
		return mediator;
	}
	,removeMediatorByView: function(viewComponent) {
		var mediator = this.removeMediator(this.retrieveMediator(viewComponent));
		this.injector.attendedToInjectees.remove(mediator);
		return mediator;
	}
	,retrieveMediator: function(viewComponent) {
		return this.mediatorByView.get(viewComponent);
	}
	,hasMapping: function(viewClassOrName) {
		var viewClassName = this.reflector.getFQCN(viewClassOrName);
		return this.mappingConfigByViewClassName.exists(viewClassName);
	}
	,hasMediatorForView: function(viewComponent) {
		return this.mediatorByView.exists(viewComponent);
	}
	,hasMediator: function(mediator) {
		var $it0 = this.mediatorByView.keys();
		while( $it0.hasNext() ) {
			var key = $it0.next();
			if(this.mediatorByView.h[key.__id__] == mediator) return true;
		}
		return false;
	}
	,addListeners: function() {
		if(this.contextView != null && this.enabled) {
			this.contextView.viewAdded = $bind(this,this.onViewAdded);
			this.contextView.viewRemoved = $bind(this,this.onViewRemoved);
		}
	}
	,removeListeners: function() {
		if(this.contextView != null) {
			this.contextView.viewAdded = null;
			this.contextView.viewRemoved = null;
		}
	}
	,onViewAdded: function(view) {
		if(this.mediatorsMarkedForRemoval.get(view) != null) {
			this.mediatorsMarkedForRemoval.remove(view);
			return;
		}
		var viewClassName = Type.getClassName(Type.getClass(view));
		var config = this.mappingConfigByViewClassName.get(viewClassName);
		if(config != null && config.autoCreate) this.createMediatorUsing(view,viewClassName,config);
	}
	,onViewRemoved: function(view) {
		var config = this.mappingConfigByView.get(view);
		if(config != null && config.autoRemove) this.removeMediatorByView(view);
	}
	,removeMediatorLater: function() {
		var $it0 = this.mediatorsMarkedForRemoval.iterator();
		while( $it0.hasNext() ) {
			var view = $it0.next();
			if(!this.contextView.isAdded(view)) this.removeMediatorByView(view);
			this.mediatorsMarkedForRemoval.remove(view);
		}
		this.hasMediatorsMarkedForRemoval = false;
	}
	,createMediatorUsing: function(viewComponent,viewClassName,config) {
		var mediator = this.mediatorByView.get(viewComponent);
		if(mediator == null) {
			if(viewClassName == null) viewClassName = Type.getClassName(Type.getClass(viewComponent));
			if(config == null) config = this.mappingConfigByViewClassName.get(viewClassName);
			if(config != null) {
				var _g = 0;
				var _g1 = config.typedViewClasses;
				while(_g < _g1.length) {
					var claxx = _g1[_g];
					++_g;
					this.injector.mapValue(claxx,viewComponent);
				}
				mediator = this.injector.instantiate(config.mediatorClass);
				var _g2 = 0;
				var _g11 = config.typedViewClasses;
				while(_g2 < _g11.length) {
					var clazz = _g11[_g2];
					++_g2;
					this.injector.unmap(clazz);
				}
				this.registerMediator(viewComponent,mediator);
			}
		}
		return mediator;
	}
	,__class__: mmvc_base_MediatorMap
});
var mmvc_base_MappingConfig = function() {
};
$hxClasses["mmvc.base.MappingConfig"] = mmvc_base_MappingConfig;
mmvc_base_MappingConfig.__name__ = ["mmvc","base","MappingConfig"];
mmvc_base_MappingConfig.prototype = {
	__class__: mmvc_base_MappingConfig
};
var mmvc_base_TriggerMap = function(injector) {
	this.injector = injector;
};
$hxClasses["mmvc.base.TriggerMap"] = mmvc_base_TriggerMap;
mmvc_base_TriggerMap.__name__ = ["mmvc","base","TriggerMap"];
mmvc_base_TriggerMap.__interfaces__ = [mmvc_api_ITriggerMap];
mmvc_base_TriggerMap.prototype = {
	map: function(trigger,command) {
		if(this.isClass(trigger)) return this.mapClass(trigger,command);
		if(this.isString(trigger)) return this.mapString(trigger,command);
		if(this.isEnumValue(trigger)) return this.mapEnumValue(trigger,command);
		throw new js__$Boot_HaxeError("Mapping type " + Std.string(Type["typeof"](trigger)) + " is not supported.");
	}
	,unmap: function(trigger,command) {
		if(this.isClass(trigger)) return this.unmapClass(trigger,command);
		if(this.isString(trigger)) return this.unmapString(trigger,command);
		if(this.isEnumValue(trigger)) return this.unmapEnumValue(trigger,command);
		throw new js__$Boot_HaxeError("Unmapping type " + Std.string(Type["typeof"](trigger)) + " is not supported.");
	}
	,dispatch: function(trigger) {
		if(this.isClassInstance(trigger)) return this.dispatchClass(trigger);
		if(this.isString(trigger)) return this.dispatchString(trigger);
		if(this.isEnumValue(trigger)) return this.dispatchEnumValue(trigger);
		throw new js__$Boot_HaxeError("Unmapping type " + Std.string(Type["typeof"](trigger)) + " is not supported.");
	}
	,mapClass: function(trigger,command) {
		if(this.classToCommand == null) this.classToCommand = new haxe_ds_StringMap();
		var key = Type.getClassName(trigger);
		var list = this.classToCommand.get(key);
		if(list == null) this.classToCommand.set(key,[command]); else list.push(command);
	}
	,unmapClass: function(trigger,command) {
		if(this.classToCommand == null) return;
		var key = Type.getClassName(trigger);
		var list = this.classToCommand.get(key);
		if(list != null) HxOverrides.remove(list,command);
	}
	,dispatchClass: function(trigger) {
		if(this.classToCommand == null) return;
		var triggerClass;
		if(trigger == null) triggerClass = null; else triggerClass = js_Boot.getClass(trigger);
		var key = Type.getClassName(triggerClass);
		var list = this.classToCommand.get(key);
		if(list != null) {
			var _g = 0;
			while(_g < list.length) {
				var commandClass = list[_g];
				++_g;
				this.invokeCommand(trigger,triggerClass,commandClass);
			}
		}
	}
	,mapString: function(trigger,command) {
		if(this.stringToCommand == null) this.stringToCommand = new haxe_ds_StringMap();
		var list = this.stringToCommand.get(trigger);
		if(list == null) this.stringToCommand.set(trigger,[command]); else list.push(command);
	}
	,unmapString: function(trigger,command) {
		if(this.stringToCommand == null) return;
		var list = this.stringToCommand.get(trigger);
		if(list != null) HxOverrides.remove(list,command);
	}
	,dispatchString: function(trigger) {
		if(this.stringToCommand == null) return;
		var list = this.stringToCommand.get(trigger);
		if(list != null) {
			var _g = 0;
			while(_g < list.length) {
				var commandClass = list[_g];
				++_g;
				this.invokeCommand(trigger,String,commandClass);
			}
		}
	}
	,mapEnumValue: function(trigger,command) {
		if(this.enumValueToCommand == null) this.enumValueToCommand = new haxe_ds_EnumValueMap();
		var list = this.enumValueToCommand.get(trigger);
		if(list == null) this.enumValueToCommand.set(trigger,[command]); else list.push(command);
	}
	,unmapEnumValue: function(trigger,command) {
		if(this.enumValueToCommand == null) return;
		var list = this.enumValueToCommand.get(trigger);
		if(list != null) HxOverrides.remove(list,command);
	}
	,dispatchEnumValue: function(trigger) {
		if(this.enumValueToCommand == null) return;
		var triggerClass;
		if(trigger == null) triggerClass = null; else triggerClass = js_Boot.getClass(trigger);
		var list = this.enumValueToCommand.get(trigger);
		if(list != null) {
			var _g = 0;
			while(_g < list.length) {
				var commandClass = list[_g];
				++_g;
				this.invokeCommand(trigger,triggerClass,commandClass);
			}
		}
	}
	,mapInstance: function(trigger,command) {
		if(!this.isClassInstance(trigger)) throw new js__$Boot_HaxeError("Trigger " + Std.string(trigger) + " is not an object.");
		if(this.instanceToCommand == null) this.instanceToCommand = new haxe_ds_ObjectMap();
		var list = this.instanceToCommand.h[trigger.__id__];
		if(list == null) this.instanceToCommand.set(trigger,[command]); else list.push(command);
	}
	,unmapInstance: function(trigger,command) {
		if(!this.isClassInstance(trigger)) throw new js__$Boot_HaxeError("Trigger " + Std.string(trigger) + " is not an object.");
		if(this.instanceToCommand == null) return;
		var list = this.instanceToCommand.h[trigger.__id__];
		if(list != null) HxOverrides.remove(list,command);
	}
	,dispatchInstance: function(trigger) {
		if(!this.isClassInstance(trigger)) throw new js__$Boot_HaxeError("Trigger " + Std.string(trigger) + " is not an object.");
		if(this.instanceToCommand == null) return;
		var triggerClass;
		if(trigger == null) triggerClass = null; else triggerClass = js_Boot.getClass(trigger);
		var list = this.instanceToCommand.h[trigger.__id__];
		if(list != null) {
			var _g = 0;
			while(_g < list.length) {
				var commandClass = list[_g];
				++_g;
				this.invokeCommand(trigger,triggerClass,commandClass);
			}
		}
	}
	,invokeCommand: function(trigger,triggerClass,commandClass) {
		if(commandClass == null) return;
		var command = this.injector.instantiate(commandClass);
		if(js_Boot.__instanceof(command,mmvc_impl_TriggerCommand)) {
			var triggerCommand = command;
			triggerCommand.trigger = trigger;
		}
		command.execute();
	}
	,isClass: function(source) {
		return js_Boot.__instanceof(source,Class);
	}
	,isString: function(source) {
		return typeof(source) == "string";
	}
	,isEnumValue: function(source) {
		return Reflect.isEnumValue(source);
	}
	,isClassInstance: function(source) {
		return Type.getClass(source) != null && !(typeof(source) == "string");
	}
	,__class__: mmvc_base_TriggerMap
};
var mmvc_base_ViewMap = function(contextView,injector) {
	mmvc_base_ViewMapBase.call(this,contextView,injector);
	this.mappedPackages = [];
	this.mappedTypes = new minject_ClassMap();
	this.injectedViews = new haxe_ds_ObjectMap();
};
$hxClasses["mmvc.base.ViewMap"] = mmvc_base_ViewMap;
mmvc_base_ViewMap.__name__ = ["mmvc","base","ViewMap"];
mmvc_base_ViewMap.__interfaces__ = [mmvc_api_IViewMap];
mmvc_base_ViewMap.__super__ = mmvc_base_ViewMapBase;
mmvc_base_ViewMap.prototype = $extend(mmvc_base_ViewMapBase.prototype,{
	mapPackage: function(packageName) {
		if(HxOverrides.indexOf(this.mappedPackages,packageName,0) > -1) return;
		this.mappedPackages.push(packageName);
		this.viewListenerCount++;
		if(this.viewListenerCount == 1) this.addListeners();
	}
	,unmapPackage: function(packageName) {
		if(!HxOverrides.remove(this.mappedPackages,packageName)) return;
		this.viewListenerCount--;
		if(this.viewListenerCount == 0) this.removeListeners();
	}
	,mapType: function(type) {
		if(this.mappedTypes.exists(type)) return;
		this.mappedTypes.set(type,type);
		this.viewListenerCount++;
		if(this.viewListenerCount == 1) this.addListeners();
		if(this.contextView != null && js_Boot.__instanceof(this.contextView,type)) this.injectInto(this.contextView);
	}
	,unmapType: function(type) {
		if(!this.mappedTypes.exists(type)) return;
		this.mappedTypes.remove(type);
		this.viewListenerCount--;
		if(this.viewListenerCount == 0) this.removeListeners();
	}
	,hasType: function(type) {
		return this.mappedTypes.exists(type);
	}
	,hasPackage: function(packageName) {
		return HxOverrides.indexOf(this.mappedPackages,packageName,0) > -1;
	}
	,addListeners: function() {
		if(this.contextView == null || !this.enabled) return;
		this.contextView.viewAdded = $bind(this,this.onViewAdded);
		this.contextView.viewRemoved = $bind(this,this.onViewAdded);
	}
	,removeListeners: function() {
		if(this.contextView == null) return;
		this.contextView.viewAdded = null;
		this.contextView.viewRemoved = null;
	}
	,onViewAdded: function(view) {
		if(this.injectedViews.exists(view)) return;
		var $it0 = this.mappedTypes.iterator();
		while( $it0.hasNext() ) {
			var type = $it0.next();
			if(js_Boot.__instanceof(view,type)) {
				this.injectInto(view);
				return;
			}
		}
		var len = this.mappedPackages.length;
		if(len > 0) {
			var className = Type.getClassName(Type.getClass(view));
			var _g = 0;
			while(_g < len) {
				var i = _g++;
				var packageName = this.mappedPackages[i];
				if(className.indexOf(packageName) == 0) {
					this.injectInto(view);
					return;
				}
			}
		}
	}
	,onViewRemoved: function(view) {
	}
	,injectInto: function(view) {
		this.injector.injectInto(view);
		this.injectedViews.set(view,true);
	}
	,__class__: mmvc_base_ViewMap
});
var mmvc_impl_Mediator = function() {
	mmvc_base_MediatorBase.call(this);
};
$hxClasses["mmvc.impl.Mediator"] = mmvc_impl_Mediator;
mmvc_impl_Mediator.__name__ = ["mmvc","impl","Mediator"];
mmvc_impl_Mediator.__super__ = mmvc_base_MediatorBase;
mmvc_impl_Mediator.prototype = $extend(mmvc_base_MediatorBase.prototype,{
	__class__: mmvc_impl_Mediator
});
var mmvc_impl_TriggerMediator = function() {
	mmvc_impl_Mediator.call(this);
};
$hxClasses["mmvc.impl.TriggerMediator"] = mmvc_impl_TriggerMediator;
mmvc_impl_TriggerMediator.__name__ = ["mmvc","impl","TriggerMediator"];
mmvc_impl_TriggerMediator.__super__ = mmvc_impl_Mediator;
mmvc_impl_TriggerMediator.prototype = $extend(mmvc_impl_Mediator.prototype,{
	dispatch: function(trigger) {
		this.triggerMap.dispatch(trigger);
	}
	,__class__: mmvc_impl_TriggerMediator
});
var msignal_Signal = function(valueClasses) {
	if(valueClasses == null) valueClasses = [];
	this.valueClasses = valueClasses;
	this.slots = msignal_SlotList.NIL;
	this.priorityBased = false;
};
$hxClasses["msignal.Signal"] = msignal_Signal;
msignal_Signal.__name__ = ["msignal","Signal"];
msignal_Signal.prototype = {
	add: function(listener) {
		return this.registerListener(listener);
	}
	,addOnce: function(listener) {
		return this.registerListener(listener,true);
	}
	,addWithPriority: function(listener,priority) {
		if(priority == null) priority = 0;
		return this.registerListener(listener,false,priority);
	}
	,addOnceWithPriority: function(listener,priority) {
		if(priority == null) priority = 0;
		return this.registerListener(listener,true,priority);
	}
	,remove: function(listener) {
		var slot = this.slots.find(listener);
		if(slot == null) return null;
		this.slots = this.slots.filterNot(listener);
		return slot;
	}
	,removeAll: function() {
		this.slots = msignal_SlotList.NIL;
	}
	,registerListener: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		if(this.registrationPossible(listener,once)) {
			var newSlot = this.createSlot(listener,once,priority);
			if(!this.priorityBased && priority != 0) this.priorityBased = true;
			if(!this.priorityBased && priority == 0) this.slots = this.slots.prepend(newSlot); else this.slots = this.slots.insertWithPriority(newSlot);
			return newSlot;
		}
		return this.slots.find(listener);
	}
	,registrationPossible: function(listener,once) {
		if(!this.slots.nonEmpty) return true;
		var existingSlot = this.slots.find(listener);
		if(existingSlot == null) return true;
		if(existingSlot.once != once) throw new js__$Boot_HaxeError("You cannot addOnce() then add() the same listener without removing the relationship first.");
		return false;
	}
	,createSlot: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		return null;
	}
	,get_numListeners: function() {
		return this.slots.get_length();
	}
	,__class__: msignal_Signal
	,__properties__: {get_numListeners:"get_numListeners"}
};
var msignal_Signal0 = function() {
	msignal_Signal.call(this);
};
$hxClasses["msignal.Signal0"] = msignal_Signal0;
msignal_Signal0.__name__ = ["msignal","Signal0"];
msignal_Signal0.__super__ = msignal_Signal;
msignal_Signal0.prototype = $extend(msignal_Signal.prototype,{
	dispatch: function() {
		var slotsToProcess = this.slots;
		while(slotsToProcess.nonEmpty) {
			slotsToProcess.head.execute();
			slotsToProcess = slotsToProcess.tail;
		}
	}
	,createSlot: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		return new msignal_Slot0(this,listener,once,priority);
	}
	,__class__: msignal_Signal0
});
var msignal_Signal1 = function(type) {
	msignal_Signal.call(this,[type]);
};
$hxClasses["msignal.Signal1"] = msignal_Signal1;
msignal_Signal1.__name__ = ["msignal","Signal1"];
msignal_Signal1.__super__ = msignal_Signal;
msignal_Signal1.prototype = $extend(msignal_Signal.prototype,{
	dispatch: function(value) {
		var slotsToProcess = this.slots;
		while(slotsToProcess.nonEmpty) {
			slotsToProcess.head.execute(value);
			slotsToProcess = slotsToProcess.tail;
		}
	}
	,createSlot: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		return new msignal_Slot1(this,listener,once,priority);
	}
	,__class__: msignal_Signal1
});
var msignal_Signal2 = function(type1,type2) {
	msignal_Signal.call(this,[type1,type2]);
};
$hxClasses["msignal.Signal2"] = msignal_Signal2;
msignal_Signal2.__name__ = ["msignal","Signal2"];
msignal_Signal2.__super__ = msignal_Signal;
msignal_Signal2.prototype = $extend(msignal_Signal.prototype,{
	dispatch: function(value1,value2) {
		var slotsToProcess = this.slots;
		while(slotsToProcess.nonEmpty) {
			slotsToProcess.head.execute(value1,value2);
			slotsToProcess = slotsToProcess.tail;
		}
	}
	,createSlot: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		return new msignal_Slot2(this,listener,once,priority);
	}
	,__class__: msignal_Signal2
});
var msignal_Slot = function(signal,listener,once,priority) {
	if(priority == null) priority = 0;
	if(once == null) once = false;
	this.signal = signal;
	this.set_listener(listener);
	this.once = once;
	this.priority = priority;
	this.enabled = true;
};
$hxClasses["msignal.Slot"] = msignal_Slot;
msignal_Slot.__name__ = ["msignal","Slot"];
msignal_Slot.prototype = {
	remove: function() {
		this.signal.remove(this.listener);
	}
	,set_listener: function(value) {
		if(value == null) throw new js__$Boot_HaxeError("listener cannot be null");
		return this.listener = value;
	}
	,__class__: msignal_Slot
	,__properties__: {set_listener:"set_listener"}
};
var msignal_Slot0 = function(signal,listener,once,priority) {
	if(priority == null) priority = 0;
	if(once == null) once = false;
	msignal_Slot.call(this,signal,listener,once,priority);
};
$hxClasses["msignal.Slot0"] = msignal_Slot0;
msignal_Slot0.__name__ = ["msignal","Slot0"];
msignal_Slot0.__super__ = msignal_Slot;
msignal_Slot0.prototype = $extend(msignal_Slot.prototype,{
	execute: function() {
		if(!this.enabled) return;
		if(this.once) this.remove();
		this.listener();
	}
	,__class__: msignal_Slot0
});
var msignal_Slot1 = function(signal,listener,once,priority) {
	if(priority == null) priority = 0;
	if(once == null) once = false;
	msignal_Slot.call(this,signal,listener,once,priority);
};
$hxClasses["msignal.Slot1"] = msignal_Slot1;
msignal_Slot1.__name__ = ["msignal","Slot1"];
msignal_Slot1.__super__ = msignal_Slot;
msignal_Slot1.prototype = $extend(msignal_Slot.prototype,{
	execute: function(value1) {
		if(!this.enabled) return;
		if(this.once) this.remove();
		if(this.param != null) value1 = this.param;
		this.listener(value1);
	}
	,__class__: msignal_Slot1
});
var msignal_Slot2 = function(signal,listener,once,priority) {
	if(priority == null) priority = 0;
	if(once == null) once = false;
	msignal_Slot.call(this,signal,listener,once,priority);
};
$hxClasses["msignal.Slot2"] = msignal_Slot2;
msignal_Slot2.__name__ = ["msignal","Slot2"];
msignal_Slot2.__super__ = msignal_Slot;
msignal_Slot2.prototype = $extend(msignal_Slot.prototype,{
	execute: function(value1,value2) {
		if(!this.enabled) return;
		if(this.once) this.remove();
		if(this.param1 != null) value1 = this.param1;
		if(this.param2 != null) value2 = this.param2;
		this.listener(value1,value2);
	}
	,__class__: msignal_Slot2
});
var msignal_SlotList = function(head,tail) {
	this.nonEmpty = false;
	if(head == null && tail == null) {
		if(msignal_SlotList.NIL != null) throw new js__$Boot_HaxeError("Parameters head and tail are null. Use the NIL element instead.");
		this.nonEmpty = false;
	} else if(head == null) throw new js__$Boot_HaxeError("Parameter head cannot be null."); else {
		this.head = head;
		if(tail == null) this.tail = msignal_SlotList.NIL; else this.tail = tail;
		this.nonEmpty = true;
	}
};
$hxClasses["msignal.SlotList"] = msignal_SlotList;
msignal_SlotList.__name__ = ["msignal","SlotList"];
msignal_SlotList.prototype = {
	get_length: function() {
		if(!this.nonEmpty) return 0;
		if(this.tail == msignal_SlotList.NIL) return 1;
		var result = 0;
		var p = this;
		while(p.nonEmpty) {
			++result;
			p = p.tail;
		}
		return result;
	}
	,prepend: function(slot) {
		return new msignal_SlotList(slot,this);
	}
	,append: function(slot) {
		if(slot == null) return this;
		if(!this.nonEmpty) return new msignal_SlotList(slot);
		if(this.tail == msignal_SlotList.NIL) return new msignal_SlotList(slot).prepend(this.head);
		var wholeClone = new msignal_SlotList(this.head);
		var subClone = wholeClone;
		var current = this.tail;
		while(current.nonEmpty) {
			subClone = subClone.tail = new msignal_SlotList(current.head);
			current = current.tail;
		}
		subClone.tail = new msignal_SlotList(slot);
		return wholeClone;
	}
	,insertWithPriority: function(slot) {
		if(!this.nonEmpty) return new msignal_SlotList(slot);
		var priority = slot.priority;
		if(priority >= this.head.priority) return this.prepend(slot);
		var wholeClone = new msignal_SlotList(this.head);
		var subClone = wholeClone;
		var current = this.tail;
		while(current.nonEmpty) {
			if(priority > current.head.priority) {
				subClone.tail = current.prepend(slot);
				return wholeClone;
			}
			subClone = subClone.tail = new msignal_SlotList(current.head);
			current = current.tail;
		}
		subClone.tail = new msignal_SlotList(slot);
		return wholeClone;
	}
	,filterNot: function(listener) {
		if(!this.nonEmpty || listener == null) return this;
		if(Reflect.compareMethods(this.head.listener,listener)) return this.tail;
		var wholeClone = new msignal_SlotList(this.head);
		var subClone = wholeClone;
		var current = this.tail;
		while(current.nonEmpty) {
			if(Reflect.compareMethods(current.head.listener,listener)) {
				subClone.tail = current.tail;
				return wholeClone;
			}
			subClone = subClone.tail = new msignal_SlotList(current.head);
			current = current.tail;
		}
		return this;
	}
	,contains: function(listener) {
		if(!this.nonEmpty) return false;
		var p = this;
		while(p.nonEmpty) {
			if(Reflect.compareMethods(p.head.listener,listener)) return true;
			p = p.tail;
		}
		return false;
	}
	,find: function(listener) {
		if(!this.nonEmpty) return null;
		var p = this;
		while(p.nonEmpty) {
			if(Reflect.compareMethods(p.head.listener,listener)) return p.head;
			p = p.tail;
		}
		return null;
	}
	,__class__: msignal_SlotList
	,__properties__: {get_length:"get_length"}
};
var triggers_LoadTrigger = function() {
	core_trigger_Trigger.call(this);
};
$hxClasses["triggers.LoadTrigger"] = triggers_LoadTrigger;
triggers_LoadTrigger.__name__ = ["triggers","LoadTrigger"];
triggers_LoadTrigger.__super__ = core_trigger_Trigger;
triggers_LoadTrigger.prototype = $extend(core_trigger_Trigger.prototype,{
	__class__: triggers_LoadTrigger
});
var valueObject_GalleryImage = function(id,url,description,date,location,photographer) {
	this.id = id;
	this.url = url;
	this.description = description;
	this.date = date;
	this.location = location;
	this.photographer = photographer;
};
$hxClasses["valueObject.GalleryImage"] = valueObject_GalleryImage;
valueObject_GalleryImage.__name__ = ["valueObject","GalleryImage"];
valueObject_GalleryImage.prototype = {
	__class__: valueObject_GalleryImage
};
var view_GalleryList = function(props) {
	core_view_MediatedComponent.call(this,props);
};
$hxClasses["view.GalleryList"] = view_GalleryList;
view_GalleryList.__name__ = ["view","GalleryList"];
view_GalleryList.create = function(root) {
	return React.createElement(view_GalleryList,{ root : root});
};
view_GalleryList.__super__ = core_view_MediatedComponent;
view_GalleryList.prototype = $extend(core_view_MediatedComponent.prototype,{
	render: function() {
		var children = this.createChildren();
		return React.createElement("div",{ id : "gallery"},children);
	}
	,createChildren: function() {
		if(this.state != null) {
			var _g = [];
			var _g1 = 0;
			var _g2 = this.state.images;
			while(_g1 < _g2.length) {
				var entry = _g2[_g1];
				++_g1;
				_g.push(view_GalleryListItem.create(entry));
			}
			return _g;
		} else return null;
	}
	,__class__: view_GalleryList
});
var view_GalleryListItem = function() {
	React.Component.call(this);
};
$hxClasses["view.GalleryListItem"] = view_GalleryListItem;
view_GalleryListItem.__name__ = ["view","GalleryListItem"];
view_GalleryListItem.create = function(data) {
	return React.createElement(view_GalleryListItem,{ data : data, key : data.id});
};
view_GalleryListItem.__super__ = React.Component;
view_GalleryListItem.prototype = $extend(React.Component.prototype,{
	render: function() {
		return React.createElement("img",{ src : this.props.data.url, alt : this.props.data.description, width : 200});
	}
	,__class__: view_GalleryListItem
});
var view_GalleryListMediator = function() {
	mmvc_impl_TriggerMediator.call(this);
};
$hxClasses["view.GalleryListMediator"] = view_GalleryListMediator;
view_GalleryListMediator.__name__ = ["view","GalleryListMediator"];
view_GalleryListMediator.__super__ = mmvc_impl_TriggerMediator;
view_GalleryListMediator.prototype = $extend(mmvc_impl_TriggerMediator.prototype,{
	onRegister: function() {
		mmvc_impl_TriggerMediator.prototype.onRegister.call(this);
		this.trigger = new triggers_LoadTrigger();
		this.mediate(this.trigger.completed.add($bind(this,this.loadCompleted)));
		this.mediate(this.trigger.failed.add($bind(this,this.loadFailed)));
		this.dispatch(this.trigger);
	}
	,onRemove: function() {
		mmvc_impl_TriggerMediator.prototype.onRemove.call(this);
	}
	,loadCompleted: function(images) {
		this.view.setState({ images : images});
	}
	,loadFailed: function(error) {
		console.log("load failed");
	}
	,__class__: view_GalleryListMediator
});
var view_Root = function(props) {
	core_view_Component.call(this,props);
	new AppContext(this);
};
$hxClasses["view.Root"] = view_Root;
view_Root.__name__ = ["view","Root"];
view_Root.__interfaces__ = [core_interfaces_IRoot,mmvc_api_IViewContainer];
view_Root.init = function() {
	var container = window.document.getElementById("galleryContainer");
	ReactDOM.render(React.createElement(view_Root),container);
};
view_Root.__super__ = core_view_Component;
view_Root.prototype = $extend(core_view_Component.prototype,{
	isAdded: function(view1) {
		return this._isAdded;
	}
	,componentDidMount: function() {
		this._isAdded = true;
	}
	,render: function() {
		return React.createElement(view_GalleryList,{ root : this});
	}
	,onViewAdded: function(view1) {
		this.viewAdded(view1);
	}
	,onViewRemoved: function(view1) {
		this.viewRemoved(view1);
	}
	,__class__: view_Root
});
var yloader_ILoader = function() { };
$hxClasses["yloader.ILoader"] = yloader_ILoader;
yloader_ILoader.__name__ = ["yloader","ILoader"];
yloader_ILoader.prototype = {
	__class__: yloader_ILoader
};
var yloader_enums_Method = { __ename__ : true, __constructs__ : ["CONNECT","DELETE","GET","HEAD","OPTIONS","POST","PUT"] };
yloader_enums_Method.CONNECT = ["CONNECT",0];
yloader_enums_Method.CONNECT.toString = $estr;
yloader_enums_Method.CONNECT.__enum__ = yloader_enums_Method;
yloader_enums_Method.DELETE = ["DELETE",1];
yloader_enums_Method.DELETE.toString = $estr;
yloader_enums_Method.DELETE.__enum__ = yloader_enums_Method;
yloader_enums_Method.GET = ["GET",2];
yloader_enums_Method.GET.toString = $estr;
yloader_enums_Method.GET.__enum__ = yloader_enums_Method;
yloader_enums_Method.HEAD = ["HEAD",3];
yloader_enums_Method.HEAD.toString = $estr;
yloader_enums_Method.HEAD.__enum__ = yloader_enums_Method;
yloader_enums_Method.OPTIONS = ["OPTIONS",4];
yloader_enums_Method.OPTIONS.toString = $estr;
yloader_enums_Method.OPTIONS.__enum__ = yloader_enums_Method;
yloader_enums_Method.POST = ["POST",5];
yloader_enums_Method.POST.toString = $estr;
yloader_enums_Method.POST.__enum__ = yloader_enums_Method;
yloader_enums_Method.PUT = ["PUT",6];
yloader_enums_Method.PUT.toString = $estr;
yloader_enums_Method.PUT.__enum__ = yloader_enums_Method;
var yloader_enums_Status = function() { };
$hxClasses["yloader.enums.Status"] = yloader_enums_Status;
yloader_enums_Status.__name__ = ["yloader","enums","Status"];
var yloader_impl_js_XMLHttpRequestLoader = function(request) {
	this.request = request;
};
$hxClasses["yloader.impl.js.XMLHttpRequestLoader"] = yloader_impl_js_XMLHttpRequestLoader;
yloader_impl_js_XMLHttpRequestLoader.__name__ = ["yloader","impl","js","XMLHttpRequestLoader"];
yloader_impl_js_XMLHttpRequestLoader.__interfaces__ = [yloader_ILoader];
yloader_impl_js_XMLHttpRequestLoader.prototype = {
	createXHR: function() {
		return js_Browser.createXMLHttpRequest();
	}
	,load: function() {
		this.cancel();
		this.xhr = this.createXHR();
		this.prepareXHR(this.xhr);
		this.xhr.send(this.request.data);
	}
	,cancel: function() {
		if(this.xhr != null) this.disposeXHR(this.xhr);
		this.xhr = null;
	}
	,getStatus: function(xhr) {
		var result;
		try {
			result = xhr.status;
		} catch( error ) {
			if (error instanceof js__$Boot_HaxeError) error = error.val;
			result = -1;
		}
		if(result == undefined) return -1; else return result;
	}
	,getHeaders: function(xhr) {
		var text = xhr.getAllResponseHeaders();
		var result = yloader_util_HeaderUtil.toParameters(text);
		return result;
	}
	,getResponse: function(xhr) {
		var status = this.getStatus(xhr);
		var success = this.isSuccess(status);
		var headers = this.getHeaders(xhr);
		return new yloader_valueObject_Response(success,xhr.responseText,status,xhr.statusText,headers);
	}
	,isSuccess: function(status) {
		return status >= 200 && status < 400;
	}
	,handleResponse: function(xhr) {
		if(this.onResponse == null) return;
		var response = this.getResponse(xhr);
		this.onResponse(response);
	}
	,dispose: function() {
		this.cancel();
	}
	,prepareXHR: function(xhr) {
		var method = Std.string(this.request.method);
		xhr.onreadystatechange = $bind(this,this.onXHRReadyStateChange);
		xhr.open(method,this.request.get_urlWithQuery(),true);
		if(this.withCredentials) xhr.withCredentials = true;
		var _g = 0;
		var _g1 = this.request.headers;
		while(_g < _g1.length) {
			var header = _g1[_g];
			++_g;
			xhr.setRequestHeader(header.name,header.value);
		}
	}
	,disposeXHR: function(xhr) {
		xhr.onreadystatechange = null;
		try {
			xhr.abort();
		} catch( error ) {
			if (error instanceof js__$Boot_HaxeError) error = error.val;
		}
	}
	,onXHRReadyStateChange: function(event) {
		if(this.xhr.readyState != 4) return;
		this.handleResponse(this.xhr);
		this.dispose();
	}
	,__class__: yloader_impl_js_XMLHttpRequestLoader
};
var yloader_util_HeaderUtil = function() { };
$hxClasses["yloader.util.HeaderUtil"] = yloader_util_HeaderUtil;
yloader_util_HeaderUtil.__name__ = ["yloader","util","HeaderUtil"];
yloader_util_HeaderUtil.toParameters = function(text) {
	var lines = text.split("\n");
	var result = [];
	var _g = 0;
	while(_g < lines.length) {
		var line = lines[_g];
		++_g;
		if(line == "") continue;
		var data = line.split(":");
		var name = StringTools.trim(data.shift());
		var value = StringTools.trim(data.join(":"));
		result.push(new yloader_valueObject_Parameter(name,value));
	}
	return result;
};
var yloader_util_ParameterUtil = function() { };
$hxClasses["yloader.util.ParameterUtil"] = yloader_util_ParameterUtil;
yloader_util_ParameterUtil.__name__ = ["yloader","util","ParameterUtil"];
yloader_util_ParameterUtil.update = function(list,parameter) {
	var found = false;
	var _g = 0;
	while(_g < list.length) {
		var item = list[_g];
		++_g;
		if(item.name == parameter.name) {
			item.value = parameter.value;
			found = true;
		}
	}
	if(!found) list.push(parameter);
};
yloader_util_ParameterUtil.urlEncode = function(list) {
	var result = null;
	var _g = 0;
	while(_g < list.length) {
		var item = list[_g];
		++_g;
		result = (result == null?"":result + "&") + encodeURIComponent(item.name) + "=" + encodeURIComponent(item.value);
	}
	return result;
};
var yloader_valueObject_Parameter = function(name,value) {
	this.name = name;
	this.value = value;
};
$hxClasses["yloader.valueObject.Parameter"] = yloader_valueObject_Parameter;
yloader_valueObject_Parameter.__name__ = ["yloader","valueObject","Parameter"];
yloader_valueObject_Parameter.prototype = {
	__class__: yloader_valueObject_Parameter
};
var yloader_valueObject_Request = function(url) {
	this.url = url;
	this.method = yloader_enums_Method.GET;
	this.headers = [];
	this.getParameters = [];
};
$hxClasses["yloader.valueObject.Request"] = yloader_valueObject_Request;
yloader_valueObject_Request.__name__ = ["yloader","valueObject","Request"];
yloader_valueObject_Request.prototype = {
	get_urlWithQuery: function() {
		var query = yloader_util_ParameterUtil.urlEncode(this.getParameters);
		var result = this.url;
		if(query != null) result += (result.indexOf("?") == -1?"?":"&") + query;
		return result;
	}
	,setHeader: function(header) {
		yloader_util_ParameterUtil.update(this.headers,header);
	}
	,setGetParameter: function(parameter) {
		yloader_util_ParameterUtil.update(this.getParameters,parameter);
	}
	,__class__: yloader_valueObject_Request
	,__properties__: {get_urlWithQuery:"get_urlWithQuery"}
};
var yloader_valueObject_Response = function(success,data,status,statusText,headers) {
	this.success = success;
	this.data = data;
	this.status = status;
	this.statusText = statusText;
	this.headers = headers;
};
$hxClasses["yloader.valueObject.Response"] = yloader_valueObject_Response;
yloader_valueObject_Response.__name__ = ["yloader","valueObject","Response"];
yloader_valueObject_Response.prototype = {
	__class__: yloader_valueObject_Response
};
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
$hxClasses.Math = Math;
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
$hxClasses.Array = Array;
Array.__name__ = ["Array"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
var __map_reserved = {}
msignal_SlotList.NIL = new msignal_SlotList(null,null);
mmvc_api_IContext.__meta__ = { obj : { 'interface' : null}};
mmvc_api_ICommand.__meta__ = { obj : { 'interface' : null}};
mmvc_impl_TriggerCommand.__meta__ = { fields : { contextView : { type : ["mmvc.api.IViewContainer"], inject : null}, commandMap : { type : ["mmvc.api.ICommandMap"], inject : null}, injector : { type : ["minject.Injector"], inject : null}, mediatorMap : { type : ["mmvc.api.IMediatorMap"], inject : null}, triggerMap : { type : ["mmvc.api.ITriggerMap"], inject : null}}};
core_interfaces_IRoot.__meta__ = { obj : { 'interface' : null}};
core_view_Component.displayName = "Component";
core_view_MediatedComponent.displayName = "MediatedComponent";
haxe_IMap.__meta__ = { obj : { 'interface' : null}};
haxe_ds_ObjectMap.count = 0;
js_Boot.__toStr = {}.toString;
minject_point_InjectionPoint.__meta__ = { obj : { 'interface' : null}};
mmvc_api_ICommandMap.__meta__ = { obj : { 'interface' : null}};
mmvc_api_IMediator.__meta__ = { obj : { 'interface' : null}};
mmvc_api_IMediatorMap.__meta__ = { obj : { 'interface' : null}};
mmvc_api_ITriggerMap.__meta__ = { obj : { 'interface' : null}};
mmvc_api_IViewContainer.__meta__ = { obj : { 'interface' : null}};
mmvc_api_IViewMap.__meta__ = { obj : { 'interface' : null}};
mmvc_impl_Mediator.__meta__ = { fields : { injector : { type : ["minject.Injector"], inject : null}, contextView : { type : ["mmvc.api.IViewContainer"], inject : null}, mediatorMap : { type : ["mmvc.api.IMediatorMap"], inject : null}}};
mmvc_impl_TriggerMediator.__meta__ = { fields : { triggerMap : { type : ["mmvc.api.ITriggerMap"], inject : null}}};
view_GalleryList.displayName = "GalleryList";
view_GalleryListItem.displayName = "GalleryListItem";
view_Root.displayName = "Root";
yloader_ILoader.__meta__ = { obj : { 'interface' : null}};
yloader_enums_Status.UNKNOWN = -2;
yloader_enums_Status.FAILED_TO_CONNECT_OR_RESOLVE_HOST = -1;
yloader_enums_Status.UNKNOWN_HOST = 12007;
yloader_enums_Status.FAILED_TO_CONNECT_TO_HOST = 12029;
Main.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);

//# sourceMappingURL=gallery-haxe-react.js.map