package app.controller.commands.prepare;

import app.controller.signals.message.HiddenMessageSignal;
import app.controller.signals.message.ShowMessageSignal;
import app.controller.signals.notifications.MessagePopupMediatorNotification;
import app.controller.signals.notifications.TodoFormMediatorNotification;
import app.controller.signals.notifications.TodoListMediatorNotification;
import app.controller.signals.todoform.CreateTodoSignal;
import app.controller.signals.todolist.DeleteTodoSignal;
import app.controller.signals.todolist.ToggleTodoSignal;
import app.controller.signals.todolist.UpdateTodoSignal;
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

		injector.mapSingleton(ShowMessageSignal);
		injector.mapSingleton(HiddenMessageSignal);

		injector.mapSingleton(TodoListMediatorNotification);
		injector.mapSingleton(TodoFormMediatorNotification);
		injector.mapSingleton(MessagePopupMediatorNotification);

		injector.mapSingleton(TodoModel);
		injector.mapSingleton(MessageModel);
	}
}
