package data.dto.todoListItem;

class TodoListItemUpdateDTO {
	public var index:Int;
	public var text:String;
	public function new(index:Int, text:String) {
		this.index = index;
		this.text = text;
	}
}
