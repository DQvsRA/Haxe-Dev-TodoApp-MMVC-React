package app.view.mediators;

import data.dto.todoListItem.TodoListItemUpdateDTO;
import data.dto.todoListItem.TodoListItemDeleteDTO;
import data.dto.todoListItem.TodoListItemToggleDTO;
import app.controller.signals.todolist.DeleteTodoSignal;
import app.controller.signals.todolist.ToggleTodoSignal;
import app.controller.signals.todolist.UpdateTodoSignal;
import app.controller.signals.TodoListMediatorNotificationSignal;
import app.view.components.TodoList;
import data.vo.Todo;
import enums.events.TodoListEvent;
import mmvc.impl.Mediator;

class TodoListMediator extends Mediator<TodoList>
{
	@inject public var todoListMediatorNotificationSignal:TodoListMediatorNotificationSignal;

	@inject public var deleteTodoSignal:DeleteTodoSignal;
	@inject public var updateTodoSignal:UpdateTodoSignal;
	@inject public var toggleTodoSignal:ToggleTodoSignal;

	override public function onRegister()
	{
		super.onRegister();

		// This is another way how to handle system messages - notification broadcasting
		// First parameter of any notification is a type (or name, or key)
		// Second parameter is usually payload (any data)
		mediate(todoListMediatorNotificationSignal.add(handleNotification));
		
		// This is a special event bus to which every component under MediatedComponent
		// can dispatch event with additional data (usually as DTO)
		mediate(view.event.addWithPriority(handleViewEvents, -1));
	}

	private function handleViewEvents (event:String, ?data:Dynamic):Void
	{
		trace("> handleViewEvents: event = " + event + " | data = " + data);
		if (event == TodoListEvent.TOGGLE_TODO)
			processTodoEventToggle(Std.instance(data, TodoListItemToggleDTO));

		else if (event == TodoListEvent.DELETE_TODO)
			processTodoEventDelete(Std.instance(data, TodoListItemDeleteDTO));

		else if (event == TodoListEvent.UPDATE_TODO)
			processTodoEventUpdate(Std.instance(data, TodoListItemUpdateDTO));
	}

	private function handleNotification(type:String, ?data:Dynamic):Void
	{
		trace("> handleNotification: type = " + type);
		switch(type)
		{
			case TodoListMediatorNotificationSignal.SETUP_TODOS:
			{
				var todos:Array<Todo> = cast data;
				var result = [];
				var index:Int = 0;
				result = todos.map(function(todo:Todo) {
					return view.createTodoListItem(
						index++,
						todo.id,
						todo.text,
						todo.completed
					);
				});
				view.setTodos(result);
			}
		}
	}

	private function processTodoEventToggle(vo:TodoListItemToggleDTO):Void {
		toggleTodoSignal.dispatch(vo.index);
	}

	private function processTodoEventDelete(vo:TodoListItemDeleteDTO):Void {
		deleteTodoSignal.dispatch(vo.index);
	}

	private function processTodoEventUpdate(vo:TodoListItemUpdateDTO):Void {
		updateTodoSignal.dispatch(vo.index, vo.text);
	}
}
