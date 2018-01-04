package app.view.mediators;
import app.controller.signals.todolist.DeleteTodoSignal;
import app.controller.signals.todolist.ToggleTodoSignal;
import app.controller.signals.todolist.UpdateTodoSignal;
import app.controller.signals.TodoListMediatorNotificationSignal;
import app.view.components.TodoList;
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

		// This is another way how to handle system messages - notification broadcasting
		// First parameter of any notification is a type (or name, or key)
		// Second parameter is usually payload (any data)
		mediate(notificationSignal.add(handleNotification));
		mediate(view.toggleActionSignal.add(handleToggleTodoAction));

		// It is different approach how to trigger the command
		// Since we don't do any data processing in mediator
		// and listening for view signal just duplicate the firing logic from TodoListItem
		// we can pass one-way reference and trigger command execution directly from view component (TodoListItem)
		view.updateActionSignal = updateTodoSignal;
		view.deleteActionSignal = deleteTodoSignal;
	}

	private function handleToggleTodoAction (index:Int):Void
	{
		toggleTodoSignal.complete.addOnce(view.toggleActionSignal.complete.dispatch);
		toggleTodoSignal.dispatch(index);
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
