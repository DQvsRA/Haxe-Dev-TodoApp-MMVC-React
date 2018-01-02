package mmvc.impl;

class AsyncCommand extends Command {

    public

    public function setOnComplete ( value:Void->Void ) : Void {
        signal.addOnce(value);
    }

    public function new() { super(); }
}
