package app.view.mediators;
import app.controller.signals.todoform.CreateTodoSignal;
import app.controller.signals.TodoFormMediatorNotificationSignal;
import app.view.components.TodoForm;
import mmvc.impl.Mediator;

class TodoFormMediator extends Mediator<TodoForm>
{
	@inject public var notificationsSignal:TodoFormMediatorNotificationSignal;

	@inject public var createTodoSignal:CreateTodoSignal;

	override public function onRegister()
	{
		super.onRegister();

		notificationsSignal.add(handleNotification);

		view.addTodoButtonClickHandler = handleAddTodo;
	}

	private function handleNotification(type:String, ?data:Dynamic):Void
	{
		switch(type)
		{
			case TodoFormMediatorNotificationSignal.CLEAR_FORM:
				view.clear();
		}
	}

	private function handleAddTodo(text:String):Void
	{
		view.lock();

		createTodoSignal.complete.addOnce(function(success:Bool)
		{
			view.unlock();
		});
		createTodoSignal.dispatch(text);
	}
}
