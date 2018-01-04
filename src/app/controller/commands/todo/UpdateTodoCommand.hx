package app.controller.commands.todo;
import app.controller.signals.todolist.UpdateTodoSignal;
import app.controller.signals.TodoListMediatorNotificationSignal;
import app.model.MessageModel;
import app.model.TodoModel;
import enums.strings.MessageStrings;
import mmvc.impl.Command;

class UpdateTodoCommand extends Command
{
	@inject public var todoListNotificationSignal:TodoListMediatorNotificationSignal;

	@inject public var messageModel:MessageModel;
	@inject public var todoModel:TodoModel;

	@inject public var index:Int;
	@inject public var text:String;

	override public function execute():Void
	{
		trace("-> execute");
		var isNotEmpty:Bool = text.length > 0;

		if(isNotEmpty)
		{
			todoModel.updateTodo(index, text, updateTodoCallback);
		}
		else
		{
			messageModel.addMessage(MessageStrings.TODO_CANT_BE_UPDATED);
		}
	}

	private function updateTodoCallback(success:Bool):Void
	{
		var updateSignal:UpdateTodoSignal = cast signal;
		var message:String = success ? MessageStrings.TODO_UPDATED : MessageStrings.PROBLEM_UPDATE_TODO;

		messageModel.addMessage(StringTools.replace(message, "%id%", Std.string(index + 1)));
		updateSignal.complete.dispatch(success);
	}
}
