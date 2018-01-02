package app.view.components.todolist;
import app.view.components.TodoList.ActionCallback;
import consts.actions.TodoAction;
import core.view.Component.Props;
import core.view.Component.Refs;
import core.view.Component.State;
import react.React;
import react.ReactComponent.ReactComponentOf;

typedef TodoListItemProps = {
	var text:String;
	var index:Int;
	var completed:Bool;

	var actionHandler:Int->TodoAction->?ActionCallback->?Dynamic->Void;
//	var handleUpdate:Int->String->Void;
}

typedef TodoListItemState = {>State,
	var text:String;
	var isEditing:Bool;
	var isLocked:Bool;
}

class TodoListItem extends ReactComponentOf<TodoListItemProps, TodoListItemState, Refs>
{
	private static var PROPS = {
		key: "todoListItem",
		className: ""
	};

	private static var PROPS_TOGGLE = {
		key: "chbTriggerTodo",
		type: "checkbox",
		checked: false,
		className: "todo-list-item-toggle",
		onChange: null
	};

	private static var PROPS_TEXT = {
		key: "inpTodoText",
		type: "text",
		className: "",
		onChange: null,
		value: "",
	}

	private static var PROPS_BUTTON = {
		key: "btnDeleteTodo",
		children: "",
		className: "todo-list-item-btn",
		onClick: null
	}

	function new(props:TodoListItemProps)
	{
		super(props);
		this.state = ({
			text: props.text,
			isLocked: false,
			isEditing: false
		}:TodoListItemState);
	}

	override public function render()
	{
		var isCompleted = this.props.completed;
		var isLocked 	= this.state.isLocked;
		var isEditing 	= this.state.isEditing;

		PROPS_TOGGLE.checked = isCompleted;
		PROPS_TOGGLE.onChange = HandleToggle;

		PROPS_TEXT.onChange = HandleChange;
		PROPS_TEXT.value = this.state.text;
		PROPS_TEXT.className = "todo-list-item-input" + (isCompleted ? " completed" : "");

		PROPS_BUTTON.children = isEditing ? "Update" : "Delete";
		PROPS_BUTTON.onClick = HandleButton;

		PROPS.className = "todo-list-item" + (isLocked ? " locked" : "");
//		PROPS.onBlur = HandleLooseFocus;

		return React.createElement('div', PROPS,
		[
			React.createElement("input", PROPS_TOGGLE),
			React.createElement("button", PROPS_BUTTON),
			React.createElement("input", PROPS_TEXT)
		]);
	}

//	private function HandleLooseFocus(event)
//	{
//		this.setState({
//			text:this.props.text,
//			isEditing:false
//		});
//	}

	private function HandleChange(event)
	{
		this.setState({
			text: event.target.value,
			isEditing: event.target.value != this.props.text
		});
//		this.props.handleUpdate(this.props.index, event.target.value);
	}

    private function HandleButton():Void
	{
		var actionHandler = this.props.actionHandler;
		var index:Int = this.props.index;
		var action:TodoAction = TodoAction.DELETE;
		var data = null;

		if(this.state.isEditing) {
			action = TodoAction.UPDATE;
			data = this.state.text;
		}

		Lock();
		actionHandler(index, action, function(success:Bool):Void {
			UnLock();
			this.setState({
				isEditing:false
			});
		}, data);
    }

    private function HandleToggle(event):Void {
		event.preventDefault();
		Lock();
		this.props.actionHandler(
			this.props.index,
			TodoAction.TOGGLE,
			function(success:Bool):Void {
				UnLock();
			}
		);
    }

	private function Lock():Void {
		this.setState({isLocked:true});
	}

	private function UnLock():Void {
		this.setState({isLocked:false});
	}
}
