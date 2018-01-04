package app.view.mediators;
import app.model.MessageModel;
import app.view.components.popups.InfoPopup;
import mmvc.impl.Mediator;

class InfoPopupMediator extends Mediator<InfoPopup>
{
	@inject public var messageModel:MessageModel;

	override public function onRegister()
	{
		super.onRegister();

		mediate(view.animationCompleteSignal.add(handleAnimationComplete));
		mediate(messageModel.messageAddedSignal.add(handleMessage));
	}

	private function handleMessage(text:String):Void
	{
		messageModel.isMessageAnimating = true;
		view.message = text;
	}

	private function handleAnimationComplete():Void
	{
		trace("handleAnimationComplete: messages = " + messageModel.length);
		messageModel.isMessageAnimating = false;
	}
}
