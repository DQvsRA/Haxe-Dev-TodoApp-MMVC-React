package app.view.components.popups;
import msignal.Signal.Signal0;
import core.view.Component.Refs;
import core.view.Component.State;
import core.view.MediatedComponent;
import js.html.DivElement;
import react.React;

class InfoPopup extends MediatedComponent<MediatedProps, InfoPopupState, Refs>
{
	public var animationCompleteSignal:Signal0 = new Signal0();

	public var domInfoPopup:DivElement;

	public var message(default, set):String = "";
	private function set_message(value:String):String
	{
		if (message != value)
		{
			message = value;
			setState({message:value});
		}
		return value;
	}

	private var animationClassName(get, null):String;
	private function get_animationClassName():String {
		return getClassName() + "-animation";
	}

	override function defaultState()
	{
		return {message:message};
	}

	override public function render()
	{
		return React.createElement('div', {className:getClassName(), onAnimationEnd:onAnimationEnd,
			ref:function(dom) { domInfoPopup = dom; }, children:state.message});
	}

	public function isActive():Bool
	{
		return state.message.length > 0;
	}

	override function componentDidUpdate(prevProps:MediatedProps, prevState:InfoPopupState):Void
	{
		if(isActive())
		{
			domInfoPopup.addEventListener("animationend", handlerAnimationEnd, false);

			haxe.Timer.delay(function()
			{
				domInfoPopup.classList.add(animationClassName);
			}, 0);
		}
	}

	override function componentWillUnmount()
	{
		domInfoPopup.removeEventListener("animationend", handlerAnimationEnd);
		super.componentWillUnmount();
	}

	private function handlerAnimationEnd()
	{
		domInfoPopup.classList.remove(animationClassName);
		animationCompleteSignal.dispatch();
	}

	function onAnimationEnd()
	{
		trace("ontransition end");
	}
}

typedef InfoPopupState = {>State,
	@:optional var message:String;
}
