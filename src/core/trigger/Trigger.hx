package core.trigger;

import msignal.Signal;

class Trigger<TResult, TError> {

    public var completed:Signal1<TResult>;
    public var failed:Signal1<TError>;
    public var cancelled:Signal0;
    public var disposed:Signal0;

    function new()
    {
        completed = new Signal1();
        failed = new Signal1();
        cancelled = new Signal0();
        disposed = new Signal0();
    }

    public function complete(result:TResult)
    {
        completed.dispatch(result);
        dispose();
    }

    public function fail(error:TError)
    {
        failed.dispatch(error);
        dispose();
    }

    public function cancel()
    {
        cancelled.dispatch();
        dispose();
    }

    function dispose()
    {
        completed.removeAll();
        completed = null;

        failed.removeAll();
        failed = null;

        cancelled.removeAll();
        cancelled = null;

        disposed.dispatch();
        disposed.removeAll();
        disposed = null;
    }

}