package app.controller.commands.prepare;
import valueObject.Todo;
import haxe.ds.Vector;
import app.controller.signals.TodoListMediatorNotificationSignal;
import app.model.MessageModel;
import app.model.TodoModel;
import enums.strings.MessageStrings;
import mmvc.impl.Command;

class PrepareCompleteCommand extends Command
{
	@inject public var todoModel:TodoModel;
	@inject public var messageModel:MessageModel;

	@inject public var todoListNotificationSignal:TodoListMediatorNotificationSignal;

	override public function execute():Void
	{
		trace("-> execute");

		messageModel.addMessage(MessageStrings.PREPARING);
		todoModel.loadTodos(callbackLoadTodosComplete);
	}

	private function callbackLoadTodosComplete (todos:Array<Todo>):Void
	{
		trace("-> loadTodos: length = " + todos.length);
		var message:String = MessageStrings.FAIL_TO_LOAD_DATA;

		if(todos != null)
		{
			todoListNotificationSignal.dispatch(TodoListMediatorNotificationSignal.SETUP_TODOS, todos);
			message = MessageStrings.DATA_READY;
		}

		messageModel.addMessage(message);
	}
}
