package app.controller.signals.todoform;
import msignal.Signal.Signal1;

class CreateTodoSignal extends Signal1<String>{

    public var complete:Signal1<Bool> = new Signal1<Bool>();

    public function new() {
        super(String);
    }
}
