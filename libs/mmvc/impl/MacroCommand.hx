package mmvc.impl;

import Array;
import mmvc.api.ICommand;
import msignal.Signal.Signal0;

class MacroCommand extends Command
{
    private var _subSignalCommands:Array<Signal0> = new Array<Signal0>();

    public function new() { super(); }

    public function initializeMacroCommand(): Void { }
    public function addSubCommand( commandClassRef : Class<ICommand> ): Void {
        var subCommandSignal:Signal0 = new Signal0();
        _subSignalCommands.push(subCommandSignal);
        commandMap.mapSignal(subCommandSignal, commandClassRef, true);
    }

    override public function execute() : Void {
        initializeMacroCommand();
        var subCommandSignal : Signal0;
        while(_subSignalCommands.length > 0) {
            subCommandSignal = _subSignalCommands.shift();
            subCommandSignal.dispatch();
        }
    }
}
