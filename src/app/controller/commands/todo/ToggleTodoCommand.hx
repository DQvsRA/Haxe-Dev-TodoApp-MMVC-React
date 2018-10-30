package app.controller.commands.todo;

import app.controller.signals.notifications.TodoListMediatorNotification;
import app.controller.signals.message.ShowMessageSignal;
import app.model.TodoModel;
import enums.strings.MessageStrings;
import mmvc.impl.Command;
import data.vo.Todo;

class ToggleTodoCommand extends Command
{
	@inject public var listTodoMediatorNotification:TodoListMediatorNotification;

	@inject public var showMessageSignal:ShowMessageSignal;

	@inject public var todoModel:TodoModel;

	@inject public var index:Int;

	override public function execute():Void
	{
		trace("-> execute | index = " + index);
		todoModel.toggleTodo(index, toggleTodoCallback);
	}

	private function toggleTodoCallback(success:Bool):Void
	{
		extendAndShowMessage(success ? MessageStrings.TODO_COMPETE : MessageStrings.PROBLEM_UPDATE_TODO);
		listTodoMediatorNotification.dispatch(TodoListMediatorNotification.SETUP_TODOS, todoModel.getTodos());
	}

	private function extendAndShowMessage(message:String):Void {
		var todo:Todo = todoModel.getTodoByIndex(index);
		showMessageSignal.dispatch(StringTools.replace(StringTools.replace(message, "%id%", Std.string(index + 1)),
			"%completed%", Std.string(todo.completed)));
	}
}
