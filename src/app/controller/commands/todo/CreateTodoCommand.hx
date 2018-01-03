package app.controller.commands.todo;
import app.controller.signals.InfoPopupMediatorNotificationSignal;
import app.controller.signals.todoform.CreateTodoSignal;
import app.controller.signals.TodoFormMediatorNotificationSignal;
import app.controller.signals.TodoListMediatorNotificationSignal;
import app.model.TodoModel;
import valueObject.Todo;
import enums.strings.MessageStrings;
import mmvc.impl.Command;

class CreateTodoCommand extends Command
{
	@inject public var infoPopupMediatorSignal:InfoPopupMediatorNotificationSignal;
	@inject public var todoListMediatorSignal:TodoListMediatorNotificationSignal;
	@inject public var todoFormMediatorSignal:TodoFormMediatorNotificationSignal;

	@inject public var todoModel:TodoModel;
	@inject public var text:String;

	private var createSignal(get, null):CreateTodoSignal;
	private function get_createSignal():CreateTodoSignal{
		return cast signal;
	}

	override public function execute():Void
	{
		trace("-> execute : text = " + text);

		var isNotEmpty:Bool = text.length > 0;
		var message:String;

		if(isNotEmpty)
		{
			message = MessageStrings.SAVING_NEW_TODO;
			todoModel.createTodo(text, createTodoCallback);
		}
		else
		{
			message = MessageStrings.EMPTY_TODO;
			createSignal.complete.dispatch(false);
		}

		infoPopupMediatorSignal.dispatch(
			InfoPopupMediatorNotificationSignal.SHOW_INFO,
			message
		);
	}

	private function createTodoCallback(todoVO:Todo = null):Void
	{
		var success:Bool = todoVO != null;

		if(success)
		{
			todoListMediatorSignal.dispatch(
				TodoListMediatorNotificationSignal.SETUP_TODOS,
				todoModel.getTodos()
			);

			todoFormMediatorSignal.dispatch(
				TodoFormMediatorNotificationSignal.CLEAR_FORM,
				null
			);
		}

		infoPopupMediatorSignal.dispatch(
			InfoPopupMediatorNotificationSignal.SHOW_INFO,
			success
				? MessageStrings.TODO_SAVED
				: MessageStrings.PROBLEM_SAVING_TODO
		);

		createSignal.complete.dispatch(success);
	}
}
