package app.controller.signals.todolist.action;
import msignal.Signal.Signal1;

class ToggleTodoActionSignal extends Signal1<Int>{

	public var complete:Signal1<Bool> = new Signal1<Bool>();

	public function new() {
		super(Int);
	}
}
