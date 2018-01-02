package app.controller.commands.todo;
import app.controller.signals.TodoListMediatorNotificationSignal;
import app.controller.signals.InfoPopupMediatorNotificationSignal;
import app.controller.signals.todolist.ToggleTodoSignal;
import app.model.TodoModel;
import app.model.vos.Todo;
import consts.strings.MessageStrings;
import mmvc.impl.Command;

class ToggleTodoCommand extends Command
{
    @inject public var infoPopupMediatorSignal		:InfoPopupMediatorNotificationSignal;
	@inject public var todoListNotificationSignal	:TodoListMediatorNotificationSignal;

    @inject public var todoModel:TodoModel;

    @inject public var index:Int;

    override public function execute():Void
    {
        trace("-> execute");
        todoModel.toggleTodo(index, ToggleTodoCallback);
    }

    private function ToggleTodoCallback(success:Bool):Void
    {
		var todo:Todo = todoModel.getTodoByIndex(index);

        var toggleSignal:ToggleTodoSignal = cast signal;
		toggleSignal.complete.dispatch(success);

		todoListNotificationSignal.dispatch(TodoListMediatorNotificationSignal.SETUP_TODOS, todoModel.getTodos());

        var message:String = success ?
            MessageStrings.TODO_COMPETE
        :   MessageStrings.PROBLEM_UPDATE_TODO
        ;

        infoPopupMediatorSignal.dispatch(
            InfoPopupMediatorNotificationSignal.SHOW_INFO,
            StringTools.replace(
                StringTools.replace(message, "%id%", Std.string(index + 1)),
                "%completed%", Std.string(todo.completed)
            )
        );
    }

    public function new() { super(); }
}
