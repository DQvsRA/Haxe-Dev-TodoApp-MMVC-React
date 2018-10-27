package core.view;

import msignal.Signal.Signal2;
import react.ReactComponent.ReactComponentOf;

/**
 * define default state by overriding defaultState() method
 * define defaultProps by defining static variable on final component
 **/

class Component<TProps:Props, TState:State, TRefs:Refs> extends ReactComponentOf<TProps, TState, TRefs>
{
    function new(props:TProps)
    {
        super(props);
        state = defaultState();
    }

    function defaultState():TState
    {
        return null;
    }

    function getClassName():String
    {
        return Type.getClassName(Type.getClass(this)).split(".").pop();
    }
}

typedef Props = {
	@:optional var event:Signal2<String, Dynamic>;
    @:optional var className:String;
    @:optional var ref:Dynamic;
    @:optional var key:String;
}

typedef State = {
}

typedef Refs = {
}