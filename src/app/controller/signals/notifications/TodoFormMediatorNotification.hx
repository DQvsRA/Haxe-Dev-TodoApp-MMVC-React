package app.controller.signals.notifications;

import msignal.Signal.Signal2;

class TodoFormMediatorNotification extends Signal2<String, Dynamic>
{
    private static var PREFIX(default, never):String = "todoform_mediator_notification_";

    public static var CLEAR(default, never):String = PREFIX + "clear";
    public static var UNLOCK(default, never):String = PREFIX + "unlock";
}
