package app.controller.commands.prepare;
import app.controller.signals.InfoPopupMediatorNotificationSignal;
import app.controller.signals.TodoListMediatorNotificationSignal;
import app.model.TodoModel;
import consts.strings.MessageStrings;
import mmvc.impl.Command;

class PrepareCompleteCommand extends Command
{
    @inject public var todoModel:TodoModel;

    @inject public var infoPopupNotificationSignal	:InfoPopupMediatorNotificationSignal;
    @inject public var todoListNotificationSignal	:TodoListMediatorNotificationSignal;

    override public function execute():Void
    {
        trace("-> execute");

		infoPopupNotificationSignal.dispatch( InfoPopupMediatorNotificationSignal.SHOW_INFO, MessageStrings.PREPARING );

		todoModel.loadTodos(function(todos)
        {
            trace("-> loadTodos: length = " + todos.length);
            var message:String = MessageStrings.FAIL_TO_LOAD_DATA;

			if(todos != null)
			{
                todoListNotificationSignal.dispatch(TodoListMediatorNotificationSignal.SETUP_TODOS, todos);
                message = MessageStrings.DATA_READY;
            }

            infoPopupNotificationSignal.dispatch(InfoPopupMediatorNotificationSignal.SHOW_INFO, message);
        });
    }

    public function new() { super(); }
}
