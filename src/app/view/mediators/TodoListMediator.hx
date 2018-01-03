package app.view.mediators;
import app.controller.signals.todolist.DeleteTodoSignal;
import app.controller.signals.todolist.ToggleTodoSignal;
import app.controller.signals.todolist.UpdateTodoSignal;
import app.controller.signals.TodoListMediatorNotificationSignal;
import app.view.components.TodoList;
import enums.actions.TodoAction;
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

		mediate(notificationSignal.add(handleNotification));

		view.onAction = handleTodoListAction;

	}

	private function handleTodoListAction(index:Int, action:TodoAction, ?callback:ActionCallback, ?data:Dynamic):Void {

		trace(index+":"+action+":"+callback);

		switch(action)
		{
			case TodoAction.UPDATE:
				if(callback != null) updateTodoSignal.complete.addOnce(callback);
				var text:String = Std.string(data);
				updateTodoSignal.dispatch(index, text);

			case TodoAction.TOGGLE:
				if(callback != null) toggleTodoSignal.complete.addOnce(callback);
				toggleTodoSignal.dispatch(index);

			case TodoAction.DELETE:
				if(callback!=null) deleteTodoSignal.complete.addOnce(callback);
				deleteTodoSignal.dispatch(index);
		}
	}

	private function handleNotification(type:String, ?data:Dynamic):Void
	{
		trace("> HandleNotification: type = " + type);
		switch(type)
		{
			case TodoListMediatorNotificationSignal.SETUP_TODOS:
			{
				view.setTodos(data);
			}
		}
	}
}
