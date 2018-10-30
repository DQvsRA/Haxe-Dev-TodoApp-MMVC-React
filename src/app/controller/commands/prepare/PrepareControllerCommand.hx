package app.controller.commands.prepare;
import app.controller.commands.message.HiddenMessageCommand;
import app.controller.commands.message.ShowMessageCommand;
import app.controller.signals.message.ShowMessageSignal;
import app.controller.signals.message.HiddenMessageSignal;
import app.controller.commands.todo.CreateTodoCommand;
import app.controller.commands.todo.DeleteTodoCommand;
import app.controller.commands.todo.ToggleTodoCommand;
import app.controller.commands.todo.UpdateTodoCommand;
import app.controller.signals.todoform.CreateTodoSignal;
import app.controller.signals.todolist.DeleteTodoSignal;
import app.controller.signals.todolist.ToggleTodoSignal;
import app.controller.signals.todolist.UpdateTodoSignal;
import mmvc.impl.Command;

class PrepareControllerCommand extends Command
{
	@inject public var createTodoSignal:CreateTodoSignal;
	@inject public var deleteTodoSignal:DeleteTodoSignal;
	@inject public var toggleTodoSignal:ToggleTodoSignal;
	@inject public var updateTodoSignal:UpdateTodoSignal;

	@inject public var showMessageSignal:ShowMessageSignal;
	@inject public var hiddenMessageSignal:HiddenMessageSignal;

	override public function execute():Void
	{
		trace("-> execute");

		commandMap.mapSignal(createTodoSignal, CreateTodoCommand);
		commandMap.mapSignal(deleteTodoSignal, DeleteTodoCommand);
		commandMap.mapSignal(toggleTodoSignal, ToggleTodoCommand);
		commandMap.mapSignal(updateTodoSignal, UpdateTodoCommand);

		commandMap.mapSignal(showMessageSignal, ShowMessageCommand);
		commandMap.mapSignal(hiddenMessageSignal, HiddenMessageCommand);
	}
}
