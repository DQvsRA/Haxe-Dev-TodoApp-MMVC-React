package app.model;
import msignal.Signal.Signal1;
import mmvc.impl.Actor;

class MessageModel extends Actor
{
	public var messageAddedSignal:Signal1<String> = new Signal1<String>();

	private var _messageStack:Array<String> = [];

	public var length(get, null):Int;
	public function get_length():Int
	{
		return _messageStack.length;
	}

	public var isMessageAnimating(default, set):Bool = false;
	public function set_isMessageAnimating(value:Bool):Bool
	{
		isMessageAnimating = value;
		if(value == false && _messageStack.length > 0)
		{
			messageAddedSignal.dispatch(_messageStack.shift());
		}
		return value;
	}

	public function addMessage(text:String)
	{
		if(isMessageAnimating == false)
		{
			messageAddedSignal.dispatch(text);
		}
		else
		{
			_messageStack.push(text);
		}
	}
}
