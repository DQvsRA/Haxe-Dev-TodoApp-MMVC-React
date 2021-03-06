package app.controller.commands.prepare;

import app.controller.signals.message.ShowMessageSignal;
import app.controller.signals.notifications.TodoListMediatorNotification;
import data.vo.Todo;
import app.model.MessageModel;
import app.model.TodoModel;
import enums.strings.MessageStrings;
import mmvc.impl.Command;

class PrepareCompleteCommand extends Command
{
	@inject public var todoModel:TodoModel;
	@inject public var messageModel:MessageModel;

	@inject public var showMessageSignal:ShowMessageSignal;

	@inject public var ListTodoMediatorNotificationSignal:TodoListMediatorNotification;

	override public function execute():Void
	{
		trace("-> execute: ");

		todoModel.loadTodos(callbackLoadTodosComplete);
	}

	private function callbackLoadTodosComplete (todos:Array<Todo>):Void
	{
		trace("-> loadTodos: length = " + (todos != null));

		var isNotEmpty:Bool = todos != null;
		if (isNotEmpty)
			ListTodoMediatorNotificationSignal.dispatch(TodoListMediatorNotification.SETUP_TODOS, todos);

		showMessageSignal.dispatch(isNotEmpty ? MessageStrings.DATA_READY : MessageStrings.FAIL_TO_LOAD_DATA);
	}
}
