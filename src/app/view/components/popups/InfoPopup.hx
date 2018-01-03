package app.view.components.popups;
import core.view.Component.Refs;
import core.view.Component.State;
import core.view.MediatedComponent;
import js.html.DivElement;
import react.React;

class InfoPopup extends MediatedComponent<MediatedProps, InfoPopupState, Refs>
{
	public static var ID:String = "infoPopup";
	public static var ANIMATION_CLASS_NAME:String = "popup-info-animation";

	public var handleAnimationComplete:Void->Void;

	public var domInfoPopup:DivElement;

	public var message(default, set):String = "";

	private function set_message(value:String):String
	{
		if (message != value)
		{
			message = value;
			setState({ message: value });
		}
		return value;
	}

	override function defaultState()
	{
		return {message:message};
	}

	override public function render()
	{
		return React.createElement('div', {
			key: ID,
			className: getClassName(),
			onAnimationEnd: onAnimationEnd,
			ref:function(dom) { this.domInfoPopup = dom; },
			children: this.state.message
		});
	}

	public function isActive():Bool
	{
		return state.message.length > 0;
	}

	override function getClassName():String
	{
		return "popup-info";
	}

	override function componentDidUpdate(prevProps:MediatedProps, prevState:InfoPopupState):Void
	{
		if(isActive())
		{
			domInfoPopup.addEventListener("animationend", handlerAnimationEnd, false);

			haxe.Timer.delay(function() {
				domInfoPopup.classList.add(ANIMATION_CLASS_NAME);
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
		domInfoPopup.classList.remove(ANIMATION_CLASS_NAME);
		if(handleAnimationComplete!=null)
			handleAnimationComplete();
	}

	function onAnimationEnd()
	{
		trace("ontransition end");
	}
}

typedef InfoPopupState = {>State,
	@:optional var message:String;
}
