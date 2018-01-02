package app.controller.signals.todolist;
import msignal.Signal.Signal1;

class ToggleTodoSignal extends Signal1<Int>{

    public var complete:Signal1<Bool> = new Signal1<Bool>();

    public function new() { super(Int); }
}
