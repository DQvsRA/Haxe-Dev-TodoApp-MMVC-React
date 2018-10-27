package app.controller.commands.todo;
import app.controller.signals.todolist.ToggleTodoSignal;
import app.controller.signals.TodoListMediatorNotificationSignal;
import app.model.MessageModel;
import app.model.TodoModel;
import enums.strings.MessageStrings;
import mmvc.impl.Command;
import data.vo.Todo;

class ToggleTodoCommand extends Command
{
	@inject public var todoListMediatorNotificationSignal:TodoListMediatorNotificationSignal;

	@inject public var messageModel:MessageModel;
	@inject public var todoModel:TodoModel;

	@inject public var index:Int;

	override public function execute():Void
	{
		trace("-> execute | index = " + index);
		todoModel.toggleTodo(index, toggleTodoCallback);
	}

	private function toggleTodoCallback(success:Bool):Void
	{
		var message:String = success
			? MessageStrings.TODO_COMPETE
			: MessageStrings.PROBLEM_UPDATE_TODO;

		var todo:Todo = todoModel.getTodoByIndex(index);

		messageModel.addMessage(StringTools.replace(StringTools.replace(message, "%id%", Std.string(index + 1)),
			"%completed%", Std.string(todo.completed)));

		var toggleSignal:ToggleTodoSignal = cast signal;
		toggleSignal.complete.dispatch(success);

		todoListMediatorNotificationSignal.dispatch(
			TodoListMediatorNotificationSignal.SETUP_TODOS,
			todoModel.getTodos()
		);
	}
}
