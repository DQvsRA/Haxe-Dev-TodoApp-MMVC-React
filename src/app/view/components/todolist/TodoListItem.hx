package app.view.components.todolist;
import app.view.components.TodoList.ActionCallback;
import enums.actions.TodoAction;
import core.view.Component.Props;
import core.view.Component.Refs;
import core.view.Component.State;
import core.view.Component;
import react.React;

class TodoListItem extends Component<TodoListItemProps, TodoListItemState, Refs>
{
	private static var PROPS_TOGGLE = {
		type: "checkbox",
		checked: false,
		className: "todo-list-item-toggle",
		onChange: null
	};

	private static var PROPS_TEXT = {
		type: "text",
		className: "",
		onChange: null,
		value: "",
	}

	private static var PROPS_BUTTON = {
		children: "",
		className: "todo-list-item-btn",
		onClick: null
	}

	override function defaultState()
	{
		return ({
			text: props.text,
			isLocked: false,
			isEditing: false,
			isCompleted: props.isCompleted
		}:TodoListItemState);
	}

	override public function render()
	{
		return React.createElement('div',
		{
			key: props.key,
			className: getClassName()
		},
			renderToggle(),
			renderButton(),
			renderTextField()
		);
	}

	override public function shouldComponentUpdate(nextProps:TodoListItemProps, nextState:TodoListItemState):Bool
	{
		var shouldBeUpdated:Bool =
			(nextProps.text != this.props.text || nextProps.isCompleted != this.props.isCompleted)
		|| 	(	nextState.text != state.text || nextState.isLocked != state.isLocked
			|| 	nextState.isEditing != state.isEditing || nextState.isCompleted != state.isCompleted);

		trace("Component should be updated: " + Std.string(shouldBeUpdated));
		return shouldBeUpdated;
	}

	override public function getClassName():String
	{
		return "todo-list-item" + (this.state.isLocked ? " locked" : "");
	}

	private function renderButton()
	{
		PROPS_BUTTON.children = this.state.isEditing ? "Update" : "Delete";
		PROPS_BUTTON.onClick = handleButton;
		return React.createElement("button", PROPS_BUTTON);
	}

	private function renderTextField()
	{
		PROPS_TEXT.onChange = handleChange;
		PROPS_TEXT.value = this.state.text;
		PROPS_TEXT.className = "todo-list-item-input" + (this.state.isCompleted ? " completed" : "");
		return React.createElement("input", PROPS_TEXT);
	}

	private function renderToggle()
	{
		PROPS_TOGGLE.checked = this.state.isCompleted;
		PROPS_TOGGLE.onChange = handleToggle;
		return React.createElement("input", PROPS_TOGGLE);
	}

	private function handleChange(event)
	{
		this.setState({
			text: event.target.value,
			isEditing: event.target.value != this.props.text,
		});
	}

	private function handleButton():Void
	{
		var index:Int = this.props.index;
		var action:TodoAction = TodoAction.DELETE;
		var data = null;

		if(this.state.isEditing) {
			action = TodoAction.UPDATE;
			data = this.state.text;
		}

		lock();

		this.props.actionHandler(index, action, function(success:Bool):Void
		{
			if(action == TodoAction.UPDATE)
			{
				this.setState({
					isEditing: false,
					isLocked: false,
				});
			}
		}, data);
	}

	private function handleToggle(event):Void
	{
		event.preventDefault();

		lock();

		this.props.actionHandler(
			this.props.index,
			TodoAction.TOGGLE,
			function(success:Bool):Void
			{
				this.setState({
					isLocked: false,
					isCompleted: !this.state.isCompleted
				});
			}
		);
	}

	private function lock():Void
	{
		this.setState({
			isLocked: true,
		});
	}
}

typedef TodoListItemProps = {>Props,
	var text:String;
	var index:Int;
	var isCompleted:Bool;
	var actionHandler:Int->TodoAction->?ActionCallback->?Dynamic->Void;
}

typedef TodoListItemState = {>State,
	@:optional var text:String;
	@:optional var isEditing:Bool;
	@:optional var isLocked:Bool;
	@:optional var isCompleted:Bool;
}
