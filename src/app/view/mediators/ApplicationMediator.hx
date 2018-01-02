package app.view.mediators;
import app.controller.signals.ApplicationMediatorNotificationSignal;
import mmvc.impl.Mediator;

class ApplicationMediator extends Mediator<Application>
{
    public function new() { super(); }

    @inject public var applicationNotificatyionsSignal:ApplicationMediatorNotificationSignal;

    override public function onRegister()
    {
        super.onRegister();

//		trace("-> onRegister: interestsSignal = " + applicationNotificatyionsSignal);
//		trace("-> onRegister: view = " + view);

        applicationNotificatyionsSignal.add(HandleNotification);

//        var displayObject:Sprite = view;
//        if(displayObject != null) {
//            var g:Graphics = displayObject.graphics;
//            g.beginFill(0xffcc00);
//            g.drawRect(0,0,
//                displayObject.width,
//                displayObject.height * Defaults.COMPONENT__FACTOR__HEADER
//            );
//            g.endFill();
//        }
    }

    private function HandleNotification(type:String, ?data:Dynamic):Void {
        switch(type) {
            case ApplicationMediatorNotificationSignal.NOTIFICATION:

        }
    }

    /**
	@see mmvc.impl.Mediator
	*/
    override public function onRemove():Void
    {
        super.onRemove();
    }
}
