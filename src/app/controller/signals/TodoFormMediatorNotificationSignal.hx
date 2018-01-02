package app.controller.signals;
import msignal.Signal.Signal2;

class TodoFormMediatorNotificationSignal extends Signal2<String, Dynamic>
{
    private static var PREFIX(default, never):String = "todoform_mediator_signal__";

    public static var CLEAR_FORM(default, never):String = PREFIX + "clear_form";
}
