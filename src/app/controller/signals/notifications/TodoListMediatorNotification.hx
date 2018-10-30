package app.controller.signals.notifications;

import msignal.Signal;

class TodoListMediatorNotification extends Signal2<String, Dynamic>
{
    private static var PREFIX(default, never):String = "todolist_mediator_notification_";

    public static var SETUP_TODOS(default, never):String = PREFIX + "setdata";
    public static var ADD_TODO(default, never):String = PREFIX + "addtodo";
}
