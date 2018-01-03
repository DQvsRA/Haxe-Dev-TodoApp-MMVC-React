package app.controller.signals.todolist;
import msignal.Signal;

class UpdateTodoSignal extends Signal2<Int, String>
{
    public var complete:Signal1<Bool> = new Signal1<Bool>();

    public function new() {
        super(Int, String);
    }
}
