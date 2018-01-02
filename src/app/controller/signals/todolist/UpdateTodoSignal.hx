package app.controller.signals.todolist;
import msignal.Signal.Signal1;
import msignal.Signal.Signal2;

class UpdateTodoSignal extends Signal2<Int, String>
{
    public var complete:Signal1<Bool> = new Signal1<Bool>();

    public function new() {
        super(Int, String);
    }
}
