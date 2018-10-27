package app.view.components.todolist;

import data.dto.todoListItem.TodoListItemUpdateDTO;
import data.dto.todoListItem.TodoListItemDeleteDTO;
import data.dto.todoListItem.TodoListItemToggleDTO;
import enums.events.TodoListEvent;
import core.view.Component.Props;
import core.view.Component.Refs;
import core.view.Component.State;
import core.view.Component;
import react.React;

class TodoListItem extends Component<TodoListItemProps, TodoListItemState, Refs>
{
	override function defaultState()
	{
		return ({
			text:props.text,
			isLocked:false,
			isEditing:false,
			isCompleted:props.isCompleted
		}:TodoListItemState);
	}

	override public function render()
	{
		return React.createElement('div', {key:props.key, className:getClassName()},
			renderDeleteButton(),
			renderCompletionToggle(),
			renderTextField()
		);
	}

	override function componentWillUpdate(nextProps, nextState):Void
	{
		if (state.isLocked)
			lock(false);

		if(nextProps.text != props.text)
			edit(false);

		if (nextProps.isCompleted != state.isCompleted)
			complete(nextProps.isCompleted);

		if (nextProps.text != state.text && !state.isEditing)
			update(nextProps.text);
	}

	override public function shouldComponentUpdate(nextProps:TodoListItemProps, nextState:TodoListItemState):Bool
	{
		var shouldBeUpdated:Bool =
			(nextProps.text != this.props.text || nextProps.isCompleted != this.props.isCompleted) ||
			(	nextState.text != state.text || nextState.isLocked != state.isLocked ||
				nextState.isEditing != state.isEditing || nextState.isCompleted != state.isCompleted
			);

		trace("Component should be updated: " + Std.string(shouldBeUpdated));
		return shouldBeUpdated;
	}

	override public function getClassName():String
	{
		return super.getClassName() + (state.isLocked ? " locked" : "");
	}

	private function renderDeleteButton()
	{
		return React.createElement("button", {className:"button",
			onClick:handleButton}, (state.isEditing ? "@" : "x"));
	}

	private function renderTextField()
	{
		var className = "text" + (state.isCompleted ? " completed" : "");
		return React.createElement("input", {type:"text",
			className:className, onChange:handleChange, value: state.text});
	}

	private function renderCompletionToggle()
	{
		var className = "toggle" + (state.isEditing ? " disabled" : "");
		return React.createElement("input", {type:"checkbox", checked:state.isCompleted,
			className:className, onChange:handleToggle});
	}

	private function handleChange(event)
	{
		var text = event.target.value;
		edit(text != props.text);
		update(text);
	}

	private function handleButton():Void
	{
		lock(true);

		if(state.isEditing) {
			props.event.dispatch( TodoListEvent.UPDATE_TODO, new TodoListItemUpdateDTO(props.index, state.text) );
		} else {
			props.event.dispatch( TodoListEvent.DELETE_TODO, new TodoListItemDeleteDTO(props.index) );
		}
	}

	private function handleToggle(event):Void
	{
		event.preventDefault();

		lock(true);
		props.event.dispatch( TodoListEvent.TOGGLE_TODO, new TodoListItemToggleDTO(props.index));
	}

	private function edit(value:Bool):Void
	{
		setState({isEditing: value});
	}

	private function lock(value:Bool):Void
	{
		setState({isLocked: value});
	}

	private function complete(value:Bool):Void
	{
		setState({isCompleted: value});
	}

	private function update(value:String):Void
	{
		setState({text: value});
	}
}

typedef TodoListItemProps = {>Props,
	var text:String;
	var index:Int;
	var isCompleted:Bool;
}

typedef TodoListItemState = {>State,
	@:optional var text:String;
	@:optional var isEditing:Bool;
	@:optional var isLocked:Bool;
	@:optional var isCompleted:Bool;
}