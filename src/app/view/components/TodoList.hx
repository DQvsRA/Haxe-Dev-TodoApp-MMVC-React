package app.view.components;
import valueObject.Todo;
import app.view.components.todolist.TodoListItem;
import enums.actions.TodoAction;
import core.view.Component.Refs;
import core.view.Component.State;
import core.view.MediatedComponent.MediatedProps;
import core.view.MediatedComponent;
import react.React;
import react.ReactComponent.ReactElement;

typedef ActionCallback = Bool->Void;

class TodoList extends MediatedComponent<MediatedProps, TodoListState, Refs>
{
	public var onAction(null, default):Int->TodoAction->?ActionCallback->?Dynamic->Void;

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
		return React.createElement('div', {
			className: getClassName()
		}, constructTodoList());
	}

	override public function getClassName():String
	{
		return "todo-list";
	}

	private function constructTodoList()
	{
		var result = [];
		var index:Int = 0;
		for (todo in this.state.todos)
		{
			result.push(React.createElement(TodoListItem, {
				key: todo.id,
				text: todo.text,
				index: index++,
				isCompleted: todo.completed,
				actionHandler: onAction,
			}));
		}
		return result;
	}
}

typedef TodoListState = {>State,
	var todos:Array<Todo>;
}



