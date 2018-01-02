package app.view.mediators;
import app.controller.signals.todoform.CreateTodoSignal;
import app.controller.signals.TodoFormMediatorNotificationSignal;
import app.view.components.TodoForm;
import mmvc.impl.Mediator;

class TodoFormMediator extends Mediator<TodoForm>
{
    @inject public var notificationsSignal:TodoFormMediatorNotificationSignal;

    @inject public var createTodoSignal:CreateTodoSignal;

    override public function onRegister()
    {
        super.onRegister();

        notificationsSignal.add(HandleNotification);

        var todoForm:TodoForm = cast getViewComponent();
        todoForm.handleAddTodoButtonClick = HandleAddTodo;
    }

    private function HandleNotification(type:String, ?data:Dynamic):Void
    {
        switch(type)
		{
            case TodoFormMediatorNotificationSignal.CLEAR_FORM:
            {
                var todoForm:TodoForm = cast getViewComponent();
                todoForm.clear();
            }
        }
    }

    private function HandleAddTodo(text:String):Void
    {
		var todoForm:TodoForm = cast getViewComponent();
		todoForm.lock();

		createTodoSignal.complete.addOnce(function(success:Bool)
		{
		    todoForm.unlock();
        });
        createTodoSignal.dispatch(text);
    }

    public function new() { super(); }
}
