package app.view.components;
import app.controller.signals.todolist.action.ToggleTodoActionSignal;
import app.controller.signals.todolist.UpdateTodoSignal;
import app.controller.signals.todolist.DeleteTodoSignal;
import app.controller.signals.todolist.ToggleTodoSignal;
import valueObject.Todo;
import app.view.components.todolist.TodoListItem;
import core.view.Component.Refs;
import core.view.Component.State;
import core.view.MediatedComponent.MediatedProps;
import core.view.MediatedComponent;
import react.React;

typedef ActionCallback = Bool->Void;

class TodoList extends MediatedComponent<MediatedProps, TodoListState, Refs>
{
	public var toggleActionSignal:ToggleTodoActionSignal = new ToggleTodoActionSignal();

	public var deleteActionSignal:DeleteTodoSignal;
	public var updateActionSignal:UpdateTodoSignal;

	public function setTodos(value:Array<Todo>)
	{
		this.setState({todos:value});
	}

	override function defaultState()
	{
		return {todos:[]};
	}

	override public function render()
	{
		return React.createElement('div', {className:getClassName()}, constructTodoList());
	}

	private function constructTodoList()
	{
		var result = [];
		var index:Int = 0;
		for (todo in state.todos)
		{
			result.push(React.createElement(TodoListItem, {key:todo.id, text:todo.text, index:index++,
				isCompleted:todo.completed, toggleActionSignal:toggleActionSignal, deleteActionSignal:deleteActionSignal,
				updateActionSignal:updateActionSignal}));
		}
		return result;
	}
}

typedef TodoListState = {>State,
	var todos:Array<Todo>;
}



