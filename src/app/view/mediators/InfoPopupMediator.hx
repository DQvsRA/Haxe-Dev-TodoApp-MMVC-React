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

        notificationsSignal.add(HandleNotification);

		var infoPopup:InfoPopup = cast getViewComponent();
		infoPopup.handleAnimationComplete = HandleAnimationComplete;
    }

	private function HandleAnimationComplete():Void
	{
		trace("handleAnimationComplete: messages = " + _messageStack.length);
		var infoPopup:InfoPopup = cast getViewComponent();

		var state = { message: "", active: false };
		if(_messageStack.length > 0)
		{
			state.message = Std.string(_messageStack.shift());
			state.active = true;
		}
		infoPopup.setState(state);
	}

    private function HandleNotification(type:String, ?data:Dynamic):Void
	{
        switch(type)
		{
            case InfoPopupMediatorNotificationSignal.SHOW_INFO:
			{
				var infoPopup:InfoPopup = cast getViewComponent();
				if(infoPopup.state.active)
				{
					_messageStack.push(Std.string(data));
				}
				else
				{
					infoPopup.setState({message: data, active: true});
				}
			}
        }
    }
}
