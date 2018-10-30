package app.controller.commands.todo;

import app.controller.signals.message.ShowMessageSignal;
import app.controller.signals.notifications.TodoListMediatorNotification;
import app.model.TodoModel;
import enums.strings.MessageStrings;
import mmvc.impl.Command;

class DeleteTodoCommand extends Command
{
	@inject public var listTodoMediatorNotification:TodoListMediatorNotification;

	@inject public var showMessageSignal:ShowMessageSignal;

	@inject public var todoModel:TodoModel;
	@inject public var index:Int;

	override public function execute():Void
	{
		trace("-> execute: id = " + index);
		todoModel.deleteTodo(index, deleteTodoCallback);
	}

	private function deleteTodoCallback(success:Bool):Void
	{
		var message:String = success ? MessageStrings.DELETE_ITEM_SUCCESS : MessageStrings.PROBLEM_DELETE_ITEM;
		showMessageSignal.dispatch(StringTools.replace(message, "%id%", Std.string(index + 1)));

		listTodoMediatorNotification.dispatch(TodoListMediatorNotification.SETUP_TODOS, todoModel.getTodos());
	}
}
