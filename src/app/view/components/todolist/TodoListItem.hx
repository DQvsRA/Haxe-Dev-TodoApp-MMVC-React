package app.view.components.todolist;
import app.controller.signals.todolist.action.ToggleTodoActionSignal;
import app.controller.signals.todolist.UpdateTodoSignal;
import app.controller.signals.todolist.DeleteTodoSignal;
import core.view.Component.Props;
import core.view.Component.Refs;
import core.view.Component.State;
import core.view.Component;
import react.React;

class TodoListItem extends Component<TodoListItemProps, TodoListItemState, Refs>
{
	override function defaultState()
	{
		return ({text:props.text, isLocked:false, isEditing:false, isCompleted:props.isCompleted}:TodoListItemState);
	}

	override public function render()
	{
		return React.createElement('div', {key:props.key, className:getClassName()}, renderToggle(), renderButton(),
			renderTextField());
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
		return super.getClassName() + (state.isLocked ? " locked" : "");
	}

	private function renderButton()
	{
		return React.createElement("button", {className:"button", onClick:handleButton},
			(state.isEditing ? "Update" : "Delete"));
	}

	private function renderTextField()
	{
		return React.createElement("input", {type:"text",
			className:("text" + (state.isCompleted ? " completed" : "")), onChange:handleChange,
			value: state.text});
	}

	private function renderToggle()
	{
		return React.createElement("input", {type:"checkbox", checked:state.isCompleted,
			className:"toggle", onChange:handleToggle});
	}

	private function handleChange(event)
	{
		setState({text:event.target.value, isEditing:(event.target.value != props.text)});
	}

	private function handleButton():Void
	{
		lock();

		if(state.isEditing) {
			props.updateActionSignal.complete.addOnce(callbackUpdateAction);
			props.updateActionSignal.dispatch(props.index, state.text);
		} else {
			props.deleteActionSignal.dispatch(props.index);
		}
	}

	private function handleToggle(event):Void
	{
		event.preventDefault();

		lock();

		props.toggleActionSignal.complete.addOnce(callbackToggleAction);
		props.toggleActionSignal.dispatch(props.index);
	}

	private function callbackToggleAction(success:Bool):Void
	{
		if(success) {
			setState({isLocked: false, isCompleted: !state.isCompleted});
		}
	}

	private function callbackUpdateAction(success:Bool):Void
	{
		setState({isEditing: false, isLocked: false});
	}

	private function lock():Void
	{
		setState({isLocked: true});
	}
}

typedef TodoListItemProps = {>Props,
	var text:String;
	var index:Int;
	var isCompleted:Bool;
	var toggleActionSignal:ToggleTodoActionSignal;
	var deleteActionSignal:DeleteTodoSignal;
	var updateActionSignal:UpdateTodoSignal;
}

typedef TodoListItemState = {>State,
	@:optional var text:String;
	@:optional var isEditing:Bool;
	@:optional var isLocked:Bool;
	@:optional var isCompleted:Bool;
}