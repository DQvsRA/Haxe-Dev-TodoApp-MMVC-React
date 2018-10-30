package app.controller.commands.todo;

import app.controller.signals.notifications.TodoListMediatorNotification;
import app.controller.signals.message.ShowMessageSignal;
import app.controller.signals.todolist.UpdateTodoSignal;
import app.model.MessageModel;
import app.model.TodoModel;
import enums.strings.MessageStrings;
import mmvc.impl.Command;

class UpdateTodoCommand extends Command
{
	@inject public var todoListMediatorNotificationSignal:TodoListMediatorNotification;

	@inject public var showMessageSignal:ShowMessageSignal;

	@inject public var todoModel:TodoModel;

	@inject public var index:Int;
	@inject public var text:String;

	override public function execute():Void
	{
		trace("-> execute");
		var isNotEmpty:Bool = text.length > 0;

		if (isNotEmpty) todoModel.updateTodo(index, text, updateTodoCallback);
		else showMessageSignal.dispatch(MessageStrings.TODO_CANT_BE_UPDATED);
	}

	private function updateTodoCallback(success:Bool):Void
	{
		var message:String = success ? MessageStrings.TODO_UPDATED : MessageStrings.PROBLEM_UPDATE_TODO;
		showMessageSignal.dispatch(StringTools.replace(message, "%id%", Std.string(index + 1)));

		todoListMediatorNotificationSignal.dispatch(TodoListMediatorNotification.SETUP_TODOS, todoModel.getTodos());
	}
}
