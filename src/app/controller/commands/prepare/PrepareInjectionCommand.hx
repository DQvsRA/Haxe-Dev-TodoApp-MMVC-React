package app.controller.commands.prepare;
import app.controller.signals.todoform.CreateTodoSignal;
import app.controller.signals.TodoFormMediatorNotificationSignal;
import app.controller.signals.todolist.DeleteTodoSignal;
import app.controller.signals.todolist.ToggleTodoSignal;
import app.controller.signals.todolist.UpdateTodoSignal;
import app.controller.signals.TodoListMediatorNotificationSignal;
import app.model.MessageModel;
import app.model.TodoModel;
import mmvc.impl.Command;

class PrepareInjectionCommand extends Command
{
	override public function execute():Void
	{
		trace("-> execute");

		injector.mapSingleton(CreateTodoSignal);
		injector.mapSingleton(ToggleTodoSignal);
		injector.mapSingleton(UpdateTodoSignal);
		injector.mapSingleton(DeleteTodoSignal);

		injector.mapSingleton(TodoListMediatorNotificationSignal);
		injector.mapSingleton(TodoFormMediatorNotificationSignal);

		injector.mapSingleton(TodoModel);
		injector.mapSingleton(MessageModel);
	}
}
