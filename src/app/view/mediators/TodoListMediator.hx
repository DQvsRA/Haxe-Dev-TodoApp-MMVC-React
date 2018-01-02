package app.view.mediators;
import app.model.vos.Todo;
import app.controller.signals.todolist.DeleteTodoSignal;
import app.controller.signals.todolist.ToggleTodoSignal;
import app.controller.signals.todolist.UpdateTodoSignal;
import app.controller.signals.TodoListMediatorNotificationSignal;
import app.view.components.TodoList;
import consts.actions.TodoAction;
import mmvc.impl.Mediator;

class TodoListMediator extends Mediator<TodoList>
{
    @inject public var notificationSignal:TodoListMediatorNotificationSignal;

    @inject public var deleteTodoSignal:DeleteTodoSignal;
    @inject public var updateTodoSignal:UpdateTodoSignal;
    @inject public var toggleTodoSignal:ToggleTodoSignal;

    override public function onRegister()
    {
        super.onRegister();

		notificationSignal.add(HandleNotification);

        var todoList:TodoList = cast getViewComponent();
        todoList.onAction = HandleTodoListAction;
    }

    private function HandleTodoListAction(index:Int, action:TodoAction, ?callback:ActionCallback, ?data:Dynamic):Void {

        trace(index+":"+action+":"+callback);

		switch(action)
		{
            case TodoAction.UPDATE:
            {
				if(callback != null) updateTodoSignal.complete.addOnce(callback);
				var text:String = Std.string(data);
                updateTodoSignal.dispatch(index, text);
            }

            case TodoAction.TOGGLE:
            {
				if(callback != null) toggleTodoSignal.complete.addOnce(callback);
				toggleTodoSignal.dispatch(index);
            }

            case TodoAction.DELETE:
            {
				if(callback!=null) deleteTodoSignal.complete.addOnce(callback);
				deleteTodoSignal.dispatch(index);
            }
        }
    }

    private function HandleNotification(type:String, ?data:Dynamic):Void
    {
		trace("> HandleNotification: type = " + type);
        switch(type)
		{
            case TodoListMediatorNotificationSignal.SETUP_TODOS:
            {
                var todoList:TodoList = cast getViewComponent();
				todoList.setState({todos: data});
            }
        }
    }
}
