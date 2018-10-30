package app.view.components.popups;

import enums.events.MessagePopupEvent;
import core.view.Component.Refs;
import core.view.Component.State;
import core.view.MediatedComponent;
import js.html.DivElement;
import react.React;

class MessagePopup extends MediatedComponent<MediatedProps, MessagePopupState, Refs>
{
	private var _domInfoPopup:DivElement;

	public var message(default, set):String = "empty";
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
			ref:function(dom) { _domInfoPopup = dom; }, children:state.message});
	}

	public function isActive():Bool
	{
		return state.message.length > 0;
	}

	override function componentDidUpdate(prevProps:MediatedProps, prevState:MessagePopupState):Void
	{
		if(isActive())
		{
			_domInfoPopup.addEventListener("animationend", handlerAnimationEnd, false);

			haxe.Timer.delay(function()
			{
				_domInfoPopup.classList.add(animationClassName);
			}, 0);
		}
	}

	override function componentWillUnmount()
	{
		_domInfoPopup.removeEventListener("animationend", handlerAnimationEnd);
		super.componentWillUnmount();
	}

	private function handlerAnimationEnd()
	{
		_domInfoPopup.classList.remove(animationClassName);
		event.dispatch(MessagePopupEvent.ANIMATION_ENDED, null);
	}

	function onAnimationEnd()
	{
		trace("ontransition end");
	}
}

typedef MessagePopupState = {>State,
	@:optional var message:String;
}
