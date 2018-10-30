package app.controller.signals.message;

import msignal.Signal.Signal1;

class ShowMessageSignal extends Signal1<String>
{
    public function new() {
        super(String);
    }
}
