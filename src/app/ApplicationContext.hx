package app;
import app.controller.commands.StartupCommand;
import mmvc.api.IViewContainer;
import mmvc.impl.Context;
import msignal.Signal.Signal0;

class ApplicationContext extends Context
{
    private var START_UP_SIGNAL:Signal0 = new Signal0();

    public function new( ?contextView : IViewContainer = null, ?autoStartup : Bool = true )
    {
        commandMap.mapSignal(START_UP_SIGNAL, StartupCommand, true);

        super(contextView, autoStartup);
    }

    override public function startup():Void
    {
        //map commands/models/mediators here
        trace("-> Startup");
        START_UP_SIGNAL.dispatch();
        START_UP_SIGNAL = null;
    }
}
