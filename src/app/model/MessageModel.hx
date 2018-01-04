package app.model;
import msignal.Signal.Signal1;
import mmvc.impl.Actor;

class MessageModel extends Actor
{
	public var messageAddedSignal:Signal1<String> = new Signal1<String>();

	private var _messageStack:Array<String> = [];

	public var length(get, null):Int;
	public var isMessageAnimating(default, set):Bool = false;

	function get_length():Int
	{
		return _messageStack.length;
	}

	function set_isMessageAnimating(value:Bool):Bool
	{
		if (isMessageAnimating != value)
		{
			isMessageAnimating = value;
			if(value == false && _messageStack.length > 0)
				messageAddedSignal.dispatch(_messageStack.shift());
		}
		return isMessageAnimating;
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
