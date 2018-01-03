package app.controller.commands.todo;
import app.controller.signals.InfoPopupMediatorNotificationSignal;
import app.controller.signals.todolist.ToggleTodoSignal;
import app.controller.signals.TodoListMediatorNotificationSignal;
import app.model.TodoModel;
import valueObject.Todo;
import enums.strings.MessageStrings;
import mmvc.impl.Command;

class ToggleTodoCommand extends Command
{
	@inject public var infoPopupMediatorSignal:InfoPopupMediatorNotificationSignal;
	@inject public var todoListNotificationSignal:TodoListMediatorNotificationSignal;

	@inject public var todoModel:TodoModel;

	@inject public var index:Int;

	override public function execute():Void
	{
		trace("-> execute");
		todoModel.toggleTodo(index, toggleTodoCallback);
	}

	private function toggleTodoCallback(success:Bool):Void
	{
		var message:String = success
			? MessageStrings.TODO_COMPETE
			: MessageStrings.PROBLEM_UPDATE_TODO;

		var todo:Todo = todoModel.getTodoByIndex(index);

		infoPopupMediatorSignal.dispatch(
			InfoPopupMediatorNotificationSignal.SHOW_INFO,
			StringTools.replace(
				StringTools.replace(message, "%id%", Std.string(index + 1)),
				"%completed%", Std.string(todo.completed)
			)
		);

		var toggleSignal:ToggleTodoSignal = cast signal;
		toggleSignal.complete.dispatch(success);
	}
}
