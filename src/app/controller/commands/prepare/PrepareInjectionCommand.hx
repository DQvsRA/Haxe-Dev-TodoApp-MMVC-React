package app.controller.commands.prepare;
import app.controller.signals.ApplicationMediatorNotificationSignal;
import app.controller.signals.InfoPopupMediatorNotificationSignal;
import app.controller.signals.todoform.CreateTodoSignal;
import app.controller.signals.TodoFormMediatorNotificationSignal;
import app.controller.signals.todolist.DeleteTodoSignal;
import app.controller.signals.todolist.ToggleTodoSignal;
import app.controller.signals.todolist.UpdateTodoSignal;
import app.controller.signals.TodoListMediatorNotificationSignal;
import app.model.TodoModel;
import mmvc.impl.Command;

class PrepareInjectionCommand extends Command
{
    override public function execute():Void
    {
        trace("-> execute");

        injector.mapSingleton( CreateTodoSignal );
        injector.mapSingleton( ToggleTodoSignal );
        injector.mapSingleton( UpdateTodoSignal );
        injector.mapSingleton( DeleteTodoSignal );

        injector.mapSingleton( ApplicationMediatorNotificationSignal );
        injector.mapSingleton( InfoPopupMediatorNotificationSignal );
        injector.mapSingleton( TodoListMediatorNotificationSignal );
        injector.mapSingleton( TodoFormMediatorNotificationSignal );

        injector.mapSingleton( TodoModel );
    }

    public function new() { super(); }
}