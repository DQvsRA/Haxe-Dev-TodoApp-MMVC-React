package app.view.mediators;

import enums.events.MessagePopupEvent;
import app.controller.signals.message.HiddenMessageSignal;
import app.controller.signals.notifications.MessagePopupMediatorNotification;
import app.view.components.popups.MessagePopup;
import mmvc.impl.Mediator;

class MessagePopupMediator extends Mediator<MessagePopup>
{
	@inject public var messagePopupMediatorNotification:MessagePopupMediatorNotification;

	@inject public var hiddenMessageSignal:HiddenMessageSignal;

	override public function onRegister()
	{
		super.onRegister();
		trace("-> onRegister");

		messagePopupMediatorNotification.add(handleNotification);
		mediate(view.event.addWithPriority(handleViewEvents, -1));
	}

	private function handleNotification(type:String, ?data:Dynamic):Void
	{
		trace("handleNotification: type = " + type);

		switch(type)
		{
			case MessagePopupMediatorNotification.SHOW_MESSAGE:
				view.message = Std.string(data);
		}
	}

	private function handleViewEvents(event:String, ?data:Dynamic):Void
	{
		trace("handleAnimationComplete: event = " + event);
		if (event == MessagePopupEvent.ANIMATION_ENDED) hiddenMessageSignal.dispatch();
	}
}
