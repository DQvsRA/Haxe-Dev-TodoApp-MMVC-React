package core.view;

import msignal.Signal.Signal2;
import core.interfaces.IApplication;

class MediatedComponent<TProps:MediatedProps, TState:Component.State, TRefs:Component.Refs> extends Component<TProps, TState, TRefs>
{
	public var event:Signal2<String, Dynamic> = new Signal2<String, Dynamic>();

    override function componentDidMount()
    {
        if (props.root != null) {
            props.root.onViewAdded(this);
        }
    }

    override function componentWillUnmount()
    {
        if (props.root != null)
            props.root.onViewRemoved(this);
    }
}

typedef MediatedProps = {>Component.Props,
    var root:IApplication;
}