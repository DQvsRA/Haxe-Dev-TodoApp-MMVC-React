package app.view.components.popups;
import js.Browser;
import consts.strings.MessageStrings;
import core.view.Component.State;
import core.view.Component.Refs;
import core.view.MediatedComponent;
import react.React;
import motion.Actuate;
import motion.easing.Quad;

typedef InfoPopupState = {>State,
	@:optional var message:String;
	@:optional var active:Bool;
}

class InfoPopup extends MediatedComponent<MediatedProps, InfoPopupState, Refs>
{
	public static var ID:String = "infoPopup";
	public static var ANIMATION_CLASS_NAME:String = "popup-info-animation";

	public var handleAnimationComplete:Void->Void;

	public var domInfoPopup:Dynamic;

    public function new(props:MediatedProps) {
		super(props);
    }

	override function defaultState()
	{
		return {message: "", active:false};
	}

	override public function render()
	{
		return React.createElement('div', {
			key: ID,
			className: "popup-info",
			ref:function(dom) { this.domInfoPopup = dom; },
			children: this.state.message
		});
	}

	override function componentDidUpdate(props, state):Void
	{
		if(this.state.active)
		{
			haxe.Timer.delay(function() {
				domInfoPopup.classList.add(ANIMATION_CLASS_NAME);
			}, 0);

			domInfoPopup.addEventListener("animationend", HandlerAnimationEnd, false);
		}
	}

	override function componentWillUnmount() {
		domInfoPopup.removeEventListener("animationend", HandlerAnimationEnd);
	}

	private function HandlerAnimationEnd() {
		domInfoPopup.classList.remove(ANIMATION_CLASS_NAME);
		if(handleAnimationComplete!=null)
			handleAnimationComplete();
	}

}
