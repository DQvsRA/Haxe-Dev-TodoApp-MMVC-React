package app.view.components;

import enums.events.TodoFormEvent;
import core.view.Component.Refs;
import core.view.Component.State;
import core.view.MediatedComponent;
import react.React;

class TodoForm extends MediatedComponent<MediatedProps, TodoFormState, Refs>
{
	override function defaultState()
	{
		return {text:"", isLocked:false};
	}

	private function handleAddTodoButtonClick()
	{
		event.dispatch(TodoFormEvent.ADD_BUTTON_CLICKED, state.text);
	}

	override public function render()
	{
		var lockedClassName = (state.isLocked ? "-locked" : "");
		return React.createElement('div', {className: getClassName() + lockedClassName}, renderInputText(), renderButton());
	}

	private function renderButton()
	{
		var className = getClassName() + "-btn-add";
		var onClick = handleAddTodoButtonClick;
		return React.createElement("button", {onClick:onClick, className:className}, "+");
	}

	private function renderInputText()
	{
		var className = getClassName() + "-inp-txt";
		return React.createElement("input", {type:"text", onChange:handleInputOnChange, onKeyPress:handleEnter,
			value:state.text, className:className});
	}

	private function handleInputOnChange(event)
	{
		if( state.isLocked == false )
			this.setState({text: event.target.value});
	}

	private function handleEnter(event)
	{
		if(event.key == "Enter") {
			handleAddTodoButtonClick();
		}
	}

	public function lock():Void
	{
		setState({isLocked:true});
	}

	public function unlock():Void
	{
		setState({isLocked:false});
	}

	public function clear():Void
	{
		setState({text:""});
	}
}

typedef TodoFormState = {>State,
	@:optional var text:String;
	@:optional var isLocked:Bool;
}
