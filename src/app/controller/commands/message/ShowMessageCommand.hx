package app.controller.commands.message;

import app.controller.signals.notifications.MessagePopupMediatorNotification;
import app.model.MessageModel;
import mmvc.impl.Command;

class ShowMessageCommand extends Command
{
	@inject public var messagePopupMediatorNotification:MessagePopupMediatorNotification;

	@inject public var messageModel:MessageModel;

	@inject public var message:String;

	override public function execute():Void
	{
		trace("-> execute : text = " + message);

		if (messageModel.isMessageAnimating == false) {
			messageModel.isMessageAnimating = true;
			messageModel.currentMessage = message;
			messagePopupMediatorNotification.dispatch(
				MessagePopupMediatorNotification.SHOW_MESSAGE,
				messageModel.currentMessage
			);
		} else {
			messageModel.saveMessageInQueue(message);
		}
	}
}
