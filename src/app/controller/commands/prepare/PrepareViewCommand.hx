package app.controller.commands.prepare;
import app.view.components.popups.InfoPopup;
import app.view.components.TodoForm;
import app.view.components.TodoList;
import app.view.mediators.ApplicationMediator;
import app.view.mediators.InfoPopupMediator;
import app.view.mediators.TodoFormMediator;
import app.view.mediators.TodoListMediator;
import mmvc.impl.Command;

class PrepareViewCommand extends Command
{
    override public function execute():Void
    {
        trace("-> execute");
		mediatorMap.mapView( Application, 	ApplicationMediator );
		mediatorMap.mapView( TodoList, 		TodoListMediator 	);
		mediatorMap.mapView( TodoForm, 		TodoFormMediator 	);
		mediatorMap.mapView( InfoPopup, 	InfoPopupMediator 	);
    }

    public function new() { super(); }
}
