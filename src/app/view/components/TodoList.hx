package app.view.components;

import app.view.components.todolist.TodoListItem;
import core.view.Component.Refs;
import core.view.Component.State;
import core.view.MediatedComponent.MediatedProps;
import core.view.MediatedComponent;
import react.React;
import react.ReactComponent.ReactElement;

typedef ActionCallback = Bool->Void;

class TodoList extends MediatedComponent<MediatedProps, TodoListState, Refs>
{
	public function new(props) {
		super(props);
		event.add( handleTodoListItemEvent );
	}

	public function setTodos(value:Array<ReactElement>)
	{
		this.setState(cast ({todos:value}:TodoListState));
	}

	override function defaultState()
	{
		return cast ({todos:[]}:TodoListState);
	}

	override public function render()
	{
		var length = state.todos.length;
		return React.createElement('div', {className:getClassName()},
			(length > 0 ? state.todos : renderLoading()));
	}

	function renderLoading() {
		return React.createElement("div", {className:"loading"}, "LOADING ...");
	}

	public function createTodoListItem(index, id, text, completed)
	{
		return React.createElement(
			TodoListItem, {
				key:id,
				text:text,
				index:index,
				isCompleted:completed,
				event:event
			}
		);
	}

	private function handleTodoListItemEvent(event:String, data:Dynamic):Void {
		trace("event : " + event);
	}
}

typedef TodoListState = {>State,
	var todos:Array<ReactElement>;
}



