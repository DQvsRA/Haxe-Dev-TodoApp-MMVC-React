package app.controller.signals.notifications;

import msignal.Signal.Signal2;

class MessagePopupMediatorNotification extends Signal2<String, Dynamic>
{
    private static var PREFIX(default, never):String = "infopopup_mediator_notification_";

    public static var SHOW_MESSAGE(default, never):String = PREFIX + "set_message";
}
