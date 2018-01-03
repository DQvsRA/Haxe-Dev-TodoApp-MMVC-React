package app.controller.commands;
import app.controller.commands.prepare.PrepareCompleteCommand;
import app.controller.commands.prepare.PrepareControllerCommand;
import app.controller.commands.prepare.PrepareInjectionCommand;
import app.controller.commands.prepare.PrepareViewCommand;
import mmvc.api.ICommand;
import mmvc.impl.Command;
import msignal.Signal.Signal0;

class StartupCommand extends Command
{
	private var _subSignalCommands:Array<Signal0> = new Array<Signal0>();

	public function initializeMacroCommand():Void
	{
		trace("> initializeMacroCommand");
		addSubCommand(PrepareInjectionCommand);
		addSubCommand(PrepareControllerCommand);
		addSubCommand(PrepareViewCommand);
		addSubCommand(PrepareCompleteCommand);
	}

	public function addSubCommand(commandClassRef:Class<ICommand>):Void
	{
		var subCommandSignal:Signal0 = new Signal0();
		_subSignalCommands.push(subCommandSignal);
		commandMap.mapSignal(subCommandSignal, commandClassRef, true);
	}

	override public function execute():Void
	{
		initializeMacroCommand();
		var subCommandSignal:Signal0;
		while(_subSignalCommands.length > 0) {
			subCommandSignal = _subSignalCommands.shift();
			subCommandSignal.dispatch();
		}
	}
}
