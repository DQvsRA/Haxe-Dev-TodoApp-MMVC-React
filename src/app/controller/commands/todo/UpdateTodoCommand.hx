package app.controller.commands.todo;
import app.controller.signals.TodoListMediatorNotificationSignal;
import app.controller.signals.InfoPopupMediatorNotificationSignal;
import app.controller.signals.todolist.UpdateTodoSignal;
import app.model.TodoModel;
import consts.strings.MessageStrings;
import mmvc.impl.Command;

class UpdateTodoCommand extends Command
{
    @inject public var infoPopupMediatorSignal		:InfoPopupMediatorNotificationSignal;
	@inject public var todoListNotificationSignal	:TodoListMediatorNotificationSignal;

    @inject public var todoModel:TodoModel;

    @inject public var index:Int;
    @inject public var text:String;

    override public function execute():Void
    {
        trace("-> execute");
        var isNotEmpty:Bool = text.length > 0;

		if(isNotEmpty){
            todoModel.updateTodo(index, text, UpdateTodoCallback);
        } else {
            infoPopupMediatorSignal.dispatch(
                InfoPopupMediatorNotificationSignal.SHOW_INFO,
                MessageStrings.TODO_CANT_BE_UPDATED
            );
        }
    }

    private function UpdateTodoCallback(success:Bool):Void
    {
        var updateSignal:UpdateTodoSignal = cast signal;
        updateSignal.complete.dispatch(success);

		todoListNotificationSignal.dispatch(
			TodoListMediatorNotificationSignal.SETUP_TODOS,
			todoModel.getTodos()
		);

		var message:String = success ?
            MessageStrings.TODO_UPDATED
        :   MessageStrings.PROBLEM_UPDATE_TODO
        ;

        infoPopupMediatorSignal.dispatch(
            InfoPopupMediatorNotificationSignal.SHOW_INFO,
            StringTools.replace(message, "%id%", Std.string(index + 1))
        );
    }

    public function new() { super(); }
}
