package mmvc.impl;
import mmvc.impl.AsyncCommand;
import mmvc.api.ICommand;
import msignal.Signal.Signal0;
class AsyncMacroCommand extends AsyncCommand
{
    private var _subCommands	    : Array<Class<ICommand>> = new Array<Class<ICommand>>();
    private var _subSignalCommands  : Array<Signal0> = new Array<Signal0>();

    public function new() { super(); }

    //==================================================================================================
    public /* abstract */ function initializeMacroCommand(): Void { }
    //==================================================================================================

    //==================================================================================================
    public function addSubCommand( commandClassRef : Class<ICommand> ): Void {
    //==================================================================================================
        var subCommandSignal:Signal0 = new Signal0();
        _subSignalCommands.push(subCommandSignal);
        _subCommands.push(commandClassRef);
        commandMap.mapSignal(subCommandSignal, commandClassRef, true);
    }

    //==================================================================================================
    override public function execute() : Void {
    //==================================================================================================
        initializeMacroCommand();
        ExecuteNextCommand();
    }

    private function ExecuteNextCommand():Void {
        if (_subSignalCommands.length > 0) NextCommand();
        else {
            if(_onComplete != null) _onComplete();
        }
    }

    private function NextCommand () : Void {
        var commandClassRef	: Class<ICommand> = _subCommands.shift();
        var signalTrigger	: Signal0 = _subSignalCommands.shift();
        var isAsync			: Bool = Type.getSuperClass(commandClassRef) == AsyncCommand;

        trace("-> NextCommand > isAsync = " + isAsync + " : " + (Type.getSuperClass(commandClassRef) == AsyncCommand));

        if (isAsync) signalTrigger.addOnce( ExecuteNextCommand );
        signalTrigger.dispatch();
        if (!isAsync) ExecuteNextCommand();
    }

}
