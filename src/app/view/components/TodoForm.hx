package app.view.components;
import core.view.Component.Refs;
import core.view.Component.State;
import core.view.MediatedComponent;
import react.React;

class TodoForm extends MediatedComponent<MediatedProps, TodoFormState, Refs>
{
	private static var PROPS_BUTTON_ADD = {
		children: "Add",
		onClick: null,
		className: ""
	}

	private static var PROPS_INPUT_TEXT = {
		type: "text",
		onChange: null,
		onKeyPress: null,
		value: "",
		className: ""
	};

	public var addTodoButtonClickHandler:String->Void;

	override function defaultState()
	{
		return {text:"", isLocked:false};
	}

	private function HandleInputOnChange(event)
	{
		this.setState({text: event.target.value});
	}

	private function HandleAddTodoButtonClick(event)
	{
		if(addTodoButtonClickHandler != null) {
			addTodoButtonClickHandler(this.state.text);
		}
	}

	private function handleEnter(event)
	{
		if(event.key == "Enter") {
			HandleAddTodoButtonClick(event);
		}
	}

	override public function render()
	{
		return React.createElement('div',
		{
			className: getClassName()
		},
			renderInputText(),
			renderButton()
		);
	}

	override public function getClassName():String
	{
		return "todo-form" + (this.state.isLocked ? " locked" : "");
	}

	private function renderButton()
	{
		PROPS_BUTTON_ADD.onClick = HandleAddTodoButtonClick;
		PROPS_BUTTON_ADD.className = "todo-form-btn-add" + (this.state.isLocked ? " locked" : "");
		return React.createElement("button", PROPS_BUTTON_ADD);
	}

	private function renderInputText()
	{
		PROPS_INPUT_TEXT.onChange = HandleInputOnChange;
		PROPS_INPUT_TEXT.value = this.state.text;
		PROPS_INPUT_TEXT.className = "todo-form-inp-text" + (this.state.isLocked ? " locked" : "");
		PROPS_INPUT_TEXT.onKeyPress = handleEnter;
		return React.createElement("input", PROPS_INPUT_TEXT);
	}

	public function lock():Void
	{
		this.setState({isLocked:true});
	}

	public function unlock():Void
	{
		this.setState({isLocked:false});
	}

	public function clear():Void
	{
		this.setState({text:""});
	}
}

typedef TodoFormState = {>State,
	@:optional var text:String;
	@:optional var isLocked:Bool;
}
