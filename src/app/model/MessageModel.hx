package app.model;

import mmvc.impl.Actor;

class MessageModel extends Actor
{
	private var _messageStack:Array<String> = [];

	public var currentMessage:String;
	public var isMessageAnimating:Bool = false;

	public function getMessageQueueLength():Int { return _messageStack.length; }
	public function shiftMessageFromQueue() { return _messageStack.shift(); }
	public function saveMessageInQueue(text:String) { _messageStack.push(text); }
}
