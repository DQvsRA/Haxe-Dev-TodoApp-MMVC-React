package app.controller.commands.prepare;
import app.view.components.popups.MessagePopup;
import app.view.components.TodoForm;
import app.view.components.TodoList;
import app.view.mediators.MessagePopupMediator;
import app.view.mediators.TodoFormMediator;
import app.view.mediators.TodoListMediator;
import mmvc.impl.Command;

class PrepareViewCommand extends Command
{
	override public function execute():Void
	{
		trace("-> execute");
		mediatorMap.mapView(TodoList, TodoListMediator);
		mediatorMap.mapView(TodoForm, TodoFormMediator);
		mediatorMap.mapView(MessagePopup, MessagePopupMediator);
	}
}
