package app.controller.commands.todo;

import app.controller.signals.message.ShowMessageSignal;
import app.controller.signals.notifications.TodoFormMediatorNotification;
import app.controller.signals.notifications.TodoListMediatorNotification;
import app.model.TodoModel;
import enums.strings.MessageStrings;
import mmvc.impl.Command;
import data.vo.Todo;

class CreateTodoCommand extends Command
{
	@inject public var listTodoMediatorNotification:TodoListMediatorNotification;
	@inject public var formTodoMediatorNotification:TodoFormMediatorNotification;

	@inject public var showMessageSignal:ShowMessageSignal;

	@inject public var todoModel:TodoModel;
	@inject public var text:String;

	override public function execute():Void
	{
		trace("-> execute : text = " + text);

		var isNotEmpty:Bool = text.length > 0;

		if (isNotEmpty) todoModel.createTodo(text, createTodoCallback);
		else formTodoMediatorNotification.dispatch(TodoFormMediatorNotification.UNLOCK, null);

		showMessageSignal.dispatch(isNotEmpty ? MessageStrings.SAVING_NEW_TODO : MessageStrings.EMPTY_TODO);
	}

	private function createTodoCallback(todoVO:Todo = null):Void
	{
		var success:Bool = todoVO != null;

		if (success)
		{
			listTodoMediatorNotification.dispatch(TodoListMediatorNotification.SETUP_TODOS, todoModel.getTodos());
			formTodoMediatorNotification.dispatch(TodoFormMediatorNotification.CLEAR, null);
		}

		showMessageSignal.dispatch(success ? MessageStrings.TODO_SAVED	: MessageStrings.PROBLEM_SAVING_TODO);

		formTodoMediatorNotification.dispatch(TodoFormMediatorNotification.UNLOCK, null);
	}
}
