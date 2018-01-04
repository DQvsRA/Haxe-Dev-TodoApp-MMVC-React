package app.controller.commands.todo;
import app.controller.signals.todolist.DeleteTodoSignal;
import app.controller.signals.TodoListMediatorNotificationSignal;
import app.model.MessageModel;
import app.model.TodoModel;
import enums.strings.MessageStrings;
import mmvc.impl.Command;

class DeleteTodoCommand extends Command
{
	@inject public var todoListNotificationSignal:TodoListMediatorNotificationSignal;

	@inject public var messageModel:MessageModel;
	@inject public var todoModel:TodoModel;
	@inject public var index:Int;

	override public function execute():Void
	{
		trace("-> execute: id = " + index);
		todoModel.deleteTodo(index, deleteTodoCallback);
	}

	private function deleteTodoCallback(success:Bool):Void
	{
		var deleteSignal:DeleteTodoSignal = cast signal;
		var message:String = success ? MessageStrings.DELETE_ITEM_SUCCESS : MessageStrings.PROBLEM_DELETE_ITEM;

		todoListNotificationSignal.dispatch(TodoListMediatorNotificationSignal.SETUP_TODOS, todoModel.getTodos());
		messageModel.addMessage(StringTools.replace(message, "%id%", Std.string(index + 1)));

		deleteSignal.complete.dispatch(success);
	}
}
