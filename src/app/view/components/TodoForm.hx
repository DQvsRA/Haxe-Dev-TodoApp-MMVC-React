package app.view.components;
import core.view.Component.Refs;
import core.view.Component.State;
import core.view.MediatedComponent;
import js.Browser.document;
import react.React;

typedef TodoFormState = {>State,
	@:optional var text:String;
	@:optional var locked:Bool;
}

class TodoForm extends MediatedComponent<MediatedProps, TodoFormState, Refs>
{
	private static var PROPS_BUTTON_ADD = {
		key: "btnAddTodo",
		children: "Add",
		onClick: null,
		className: ""
	}
	private static var PROPS_INPUT_TEXT = {
		key: "inpTodoText",
		type: "text",
		onChange: null,
		onKeyPress: null,
		value: "",
		className: ""
	};

	public var handleAddTodoButtonClick:String->Void;

	override function defaultState()
	{
		return {text:"", locked:false};
	}

	public function new(props:MediatedProps)
	{
		super(props);
	}

	private function HandleInputOnChange(event)
	{
		this.setState({text: event.target.value});
	}

	private function HandleAddTodoButtonClick(event)
	{
		if(handleAddTodoButtonClick != null) {
			handleAddTodoButtonClick(this.state.text);
		}
	}

	private function HandleEnter(event)
	{
		if(event.key == "Enter") {
			HandleAddTodoButtonClick(event);
		}
	}

	override public function render()
	{
		var isLocked:Bool = this.state.locked;

		PROPS_INPUT_TEXT.onChange = HandleInputOnChange;
		PROPS_INPUT_TEXT.value = this.state.text;
		PROPS_INPUT_TEXT.className = "todo-form-inp-text" + (isLocked ? " locked" : "");
		PROPS_INPUT_TEXT.onKeyPress = HandleEnter;

		PROPS_BUTTON_ADD.onClick = HandleAddTodoButtonClick;
		PROPS_BUTTON_ADD.className = "todo-form-btn-add" + (isLocked ? " locked" : "");

		return React.createElement('div',
		{
			key: "todoForm",
			className: "todo-form" + (isLocked ? " locked" : "")
		}, [
			React.createElement("input", PROPS_INPUT_TEXT),
			React.createElement("button", PROPS_BUTTON_ADD)
		]);
	}

	public function lock():Void
	{
		this.setState({locked:true});
	}

	public function unlock():Void
	{
		this.setState({locked:false});
	}

	public function clear():Void
	{
		this.setState({text:""});
	}
}
