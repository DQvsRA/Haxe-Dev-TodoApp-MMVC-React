package app.view.components;
import app.model.vos.Todo;
import app.view.components.todolist.TodoListItem;
import consts.actions.TodoAction;
import core.view.Component.Refs;
import core.view.Component.State;
import core.view.MediatedComponent.MediatedProps;
import core.view.MediatedComponent;
import react.React;
import react.ReactComponent.ReactElement;

typedef TodoListState = {>State,
	@:optional var locked:Bool;
	@:optional var todos:Array<Todo>;
}

typedef ActionCallback = Bool->Void;

class TodoList extends MediatedComponent<MediatedProps, TodoListState, Refs>
{
    public var onAction(null, set):Int->TodoAction->?ActionCallback->?Dynamic->Void;
    public function set_onAction(value:Int->TodoAction->?ActionCallback->?Dynamic->Void){
        this.onAction = value;
        return value;
    }

	private var children:Array<ReactElement>;

	override function defaultState()
	{
		return {todos:[], locked:false};
	}

    public function new(props:MediatedProps)
	{
		super(props);
    }

	override public function render()
	{
		var isLocked = this.state.locked;
		children = ConstructTodoList();

		return React.createElement('div', {
			key: "todoList",
			className: isLocked ? "todo-list-locked" : "todo-list"
		}, children);
	}

	private function ConstructTodoList()
	{
		var result = [];
		var index:Int = 0;
		for (todo in this.state.todos)
		{
			result.push(React.createElement(TodoListItem, {
				key: todo.id,
				index: index++,
				text: todo.text,
				completed: todo.completed,
				actionHandler: onAction,
//				handleUpdate: HandleUpdate
			}));
		}
		return result;
	}

	private function HandleUpdate(index:Int, text:String) {
		var todo = this.state.todos;
		todo[index].text = text;
		this.setState({todos: this.state.todos.copy()});
	}
}

