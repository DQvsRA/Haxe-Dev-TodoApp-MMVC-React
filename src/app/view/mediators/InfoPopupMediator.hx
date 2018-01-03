package app.view.mediators;
import app.controller.signals.InfoPopupMediatorNotificationSignal;
import app.view.components.popups.InfoPopup;
import mmvc.impl.Mediator;

class InfoPopupMediator extends Mediator<InfoPopup>
{
	@inject public var notificationsSignal:InfoPopupMediatorNotificationSignal;

	private var _messageStack:Array<String> = [];

	override public function onRegister()
	{
		super.onRegister();

		notificationsSignal.add(handleNotification);

		view.handleAnimationComplete = handleAnimationComplete;
	}

	private function handleAnimationComplete():Void
	{
		trace("handleAnimationComplete: messages = " + _messageStack.length);

		var message = "";
		if(_messageStack.length > 0)
		{
			message = Std.string(_messageStack.shift());
		}
		view.message = message;
	}

	private function handleNotification(type:String, ?data:Dynamic):Void
	{
		switch(type)
		{
			case InfoPopupMediatorNotificationSignal.SHOW_INFO:
				if(view.isActive())
				{
					_messageStack.push(Std.string(data));
				}
				else
				{
					view.message = Std.string(data);
				}
		}
	}
}
