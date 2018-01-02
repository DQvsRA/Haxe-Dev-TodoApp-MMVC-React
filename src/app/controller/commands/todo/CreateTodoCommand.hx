package app.controller.commands.todo;
import app.controller.signals.InfoPopupMediatorNotificationSignal;
import app.controller.signals.todoform.CreateTodoSignal;
import app.controller.signals.TodoFormMediatorNotificationSignal;
import app.controller.signals.TodoListMediatorNotificationSignal;
import app.model.TodoModel;
import app.model.vos.Todo;
import consts.strings.MessageStrings;
import mmvc.impl.Command;

class CreateTodoCommand extends Command
{
    @inject public var infoPopupMediatorSignal	:InfoPopupMediatorNotificationSignal;
    @inject public var todoListMediatorSignal	:TodoListMediatorNotificationSignal;
    @inject public var todoFormMediatorSignal	:TodoFormMediatorNotificationSignal;

	@inject public var todoModel:TodoModel;
    @inject public var text:String;

    override public function execute():Void
    {
        trace("-> execute : text = " + text);

        var isNotEmpty:Bool = text.length > 0;
        var message:String;

        if(isNotEmpty)
        {
            message = MessageStrings.SAVING_NEW_TODO;
            todoModel.createTodo(text, CreateTodoCallback);
        }
        else
        {
            message = MessageStrings.EMPTY_TODO;
            var createSignal:CreateTodoSignal = cast signal;
            createSignal.complete.dispatch(false);
        }

        infoPopupMediatorSignal.dispatch(
            InfoPopupMediatorNotificationSignal.SHOW_INFO,
            message
        );
    }

    private function CreateTodoCallback(?todoVO:Todo = null):Void
    {
        var success:Bool = todoVO != null;

        var createSignal:CreateTodoSignal = cast signal;
        createSignal.complete.dispatch(success);

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
            success ?
                MessageStrings.TODO_SAVED
            :   MessageStrings.PROBLEM_SAVING_TODO
        );
    }

    public function new() { super(); }
}
