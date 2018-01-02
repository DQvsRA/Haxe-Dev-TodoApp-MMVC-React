package app.controller.signals;
import msignal.Signal.Signal2;

class InfoPopupMediatorNotificationSignal extends Signal2<String, Dynamic> {

    private static var PREFIX(default, never):String = "infopopup_mediator_signal__";

    public static var SHOW_INFO(default, never):String = PREFIX + "show_info";

    public function new() { super(); }
}
