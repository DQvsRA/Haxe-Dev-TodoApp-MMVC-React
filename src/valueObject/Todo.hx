package valueObject;

class Todo
{
    public var id:Int;
    public var text:String;
    public var completed:Bool;
    public var createdAt:Int;

    public function new(id:Int, text:String, completed:Bool, createdAt:Int)
	{
        this.id = id;
        this.text = text;
        this.completed = completed;
		this.createdAt = createdAt;
    }

	public function toggle()
	{
		return new Todo(id, text, !completed, createdAt);
	}
}
