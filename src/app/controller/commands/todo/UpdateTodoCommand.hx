package app.controller.commands.todo;
import app.controller.signals.InfoPopupMediatorNotificationSignal;
import app.controller.signals.todolist.UpdateTodoSignal;
import app.controller.signals.TodoListMediatorNotificationSignal;
import app.model.TodoModel;
import enums.strings.MessageStrings;
import mmvc.impl.Command;

class UpdateTodoCommand extends Command
{
	@inject public var infoPopupMediatorSignal:InfoPopupMediatorNotificationSignal;
	@inject public var todoListNotificationSignal:TodoListMediatorNotificationSignal;

	@inject public var todoModel:TodoModel;

	@inject public var index:Int;
	@inject public var text:String;

	override public function execute():Void
	{
		trace("-> execute");
		var isNotEmpty:Bool = text.length > 0;

		if(isNotEmpty){
			todoModel.updateTodo(index, text, updateTodoCallback);
		} else {
			infoPopupMediatorSignal.dispatch(
				InfoPopupMediatorNotificationSignal.SHOW_INFO,
				MessageStrings.TODO_CANT_BE_UPDATED
			);
		}
	}

	private function updateTodoCallback(success:Bool):Void
	{
		var updateSignal:UpdateTodoSignal = cast signal;
		updateSignal.complete.dispatch(success);

		var message:String = success ?
			MessageStrings.TODO_UPDATED
		:   MessageStrings.PROBLEM_UPDATE_TODO
		;

		infoPopupMediatorSignal.dispatch(
			InfoPopupMediatorNotificationSignal.SHOW_INFO,
			StringTools.replace(message, "%id%", Std.string(index + 1))
		);
	}
}
