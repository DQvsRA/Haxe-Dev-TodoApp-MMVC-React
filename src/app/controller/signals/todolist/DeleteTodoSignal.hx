package app.controller.signals.todolist;
import msignal.Signal.Signal1;

class DeleteTodoSignal extends Signal1<Int>{

    public var complete:Signal1<Dynamic> = new Signal1<Dynamic>();

    public function new() {
        super(Int);
    }
}
