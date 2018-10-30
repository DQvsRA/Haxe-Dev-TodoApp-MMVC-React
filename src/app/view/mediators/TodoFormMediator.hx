package app.view.mediators;

import enums.events.TodoFormEvent;
import app.controller.signals.notifications.TodoFormMediatorNotification;
import app.controller.signals.todoform.CreateTodoSignal;
import app.view.components.TodoForm;
import mmvc.impl.Mediator;

class TodoFormMediator extends Mediator<TodoForm>
{
	@inject public var todoFormMediatorNotification:TodoFormMediatorNotification;

	@inject public var createTodoSignal:CreateTodoSignal;

	override public function onRegister()
	{
		super.onRegister();
		trace("-> onRegister");

		mediate(todoFormMediatorNotification.add(handleNotification));
		mediate(view.event.add(handleViewEvent));
	}

	private function handleNotification(type:String, ?data:Dynamic):Void
	{
		switch(type)
		{
			case TodoFormMediatorNotification.CLEAR:
				view.clear();
			case TodoFormMediatorNotification.UNLOCK:
				view.unlock();
		}
	}

	private function handleViewEvent(event:String, data:?Dynamic):Void
	{
		if (event == TodoFormEvent.ADD_BUTTON_CLICKED)
		{
			view.lock();
			createTodoSignal.dispatch( text );
		}
	}
}
