package app.controller.commands.message;

import app.controller.signals.message.ShowMessageSignal;
import app.controller.signals.notifications.MessagePopupMediatorNotification;
import app.model.MessageModel;
import mmvc.impl.Command;

class HiddenMessageCommand extends Command
{
	@inject public var infoPopupMediatorNotification:MessagePopupMediatorNotification;

	@inject public var showMessageSignal:ShowMessageSignal;

	@inject public var messageModel:MessageModel;

	override public function execute():Void
	{
		trace("-> execute : messages = " + messageModel.getMessageQueueLength());
		messageModel.isMessageAnimating = false;

		if (messageModel.getMessageQueueLength() > 0) {
			showMessageSignal.dispatch(messageModel.shiftMessageFromQueue());
		}
	}
}
