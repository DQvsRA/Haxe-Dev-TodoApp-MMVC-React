package app.view.components;
import msignal.Signal.Signal1;
import core.view.Component.Refs;
import core.view.Component.State;
import core.view.MediatedComponent;
import react.React;

class TodoForm extends MediatedComponent<MediatedProps, TodoFormState, Refs>
{
	public var addTodoButtonClickSignal:Signal1<String> = new Signal1<String>();

	override function defaultState()
	{
		return {text:"", isLocked:false};
	}

	private function handleInputOnChange(event)
	{
		this.setState({text: event.target.value});
	}

	private function handleAddTodoButtonClick(event)
	{
		addTodoButtonClickSignal.dispatch(state.text);
	}

	private function handleEnter(event)
	{
		if(event.key == "Enter") {
			handleAddTodoButtonClick(event);
		}
	}

	override public function render()
	{
		var lockedClassName = (state.isLocked ? "-locked" : "");
		return React.createElement('div', {className: getClassName() + lockedClassName}, renderInputText(), renderButton());
	}

	private function renderButton()
	{
		return React.createElement("button", {onClick:handleAddTodoButtonClick, className:(getClassName() + "-btn-add")},
			"Add");
	}

	private function renderInputText()
	{
		return React.createElement("input", {type:"text", onChange:handleInputOnChange, onKeyPress:handleEnter,
			value:state.text, className:(getClassName() + "-inp-txt")});
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
