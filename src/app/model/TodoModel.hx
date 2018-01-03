package app.model;
import app.model.service.ServerService;
import valueObject.Todo;
import enums.network.ServerAPI;
import mmvc.impl.Actor;
import yloader.enums.Method;

class TodoModel extends Actor
{
	private var _data:Array<Todo> = new Array<Todo>();
	private var _serverService:ServerService = ServerService.getInstance();

	private var SERVER_TODO_ROUTE(default, never):String = ServerAPI.GATEWAY + ServerAPI.ROUTE_TODOS;

	public function findTodoByID(value:Int):Todo { for(todo in _data) { if(todo.id == value) return todo; } return null; }

	public function getTodoByIndex(value:Int):Todo { return _data[value]; }
	public function getTodoPosition(todo:Todo):Int { return _data.indexOf(todo); }
	public function getTodos():Array<Todo> { return _data; }

	public function toggleTodo(index:Int, callback:Bool -> Void):Void
	{
		var todoVO:Todo = getTodoByIndex(index);
		_serverService.performRequest(

			SERVER_TODO_ROUTE + "/" + todoVO.id,
			Method.PUT,

			function(error:String, result:Dynamic):Void
			{
				trace("-> updateTodo: error = " + error + " result = " + result);
				var success:Bool = error == null;
				if(success) todoVO.completed = !todoVO.completed;
				callback(success);
			},

			[
				"text" => todoVO.text,
				"completed" => !todoVO.completed,
				"createdAt" => todoVO.createdAt
			]
		);
	}

	public function updateTodo(index:Int, text:String, callback:Bool -> Void):Void
	{
		trace("-> updateTodo: id = " + index + " text = " + text);

		var todoVO:Todo = getTodoByIndex(index);
		_serverService.performRequest(

			SERVER_TODO_ROUTE + "/" + todoVO.id,
			Method.PUT,

			function(error:String, result:Dynamic):Void
			{
				trace("-> updateTodo: error = " + error + " result = " + result);
				todoVO.text = text;
				callback(error == null);
			},
			[
				"text" => text,
				"completed" => todoVO.completed,
				"createdAt" => todoVO.createdAt
			]
		);
	}

	public function createTodo(text:String, callback:Todo -> Void):Void
	{
		trace("-> createTodo: text = " + text);

		_serverService.performRequest(

			SERVER_TODO_ROUTE,
			Method.POST,

			function(error:String, result:Dynamic):Void
			{
				if(error != null) callback(null);
				else {
					var todoVO:Todo = new Todo(
						result.id,
						result.text,
						result.completed ? result.completed != "false" : false,
						result.createdAt != null ? result.createdAt : -1
					);
					_data.push(todoVO);
					callback(todoVO);
				}
			},

			["text" => text, "completed" => false]
		);
	}

	public function deleteTodo(index:Int, callback:Bool -> Void):Void
	{
		trace("-> deleteTodo: id = " + index);

		var todoVO:Todo = getTodoByIndex(index);
		_serverService.performRequest(

			SERVER_TODO_ROUTE + "/" + todoVO.id,
			Method.DELETE,

			function(error:String, result:Dynamic):Void
			{
				var success:Bool = (error == null);
				_data.remove(todoVO);
				callback(success);
			}
		);
	}

	public function loadTodos( callback: Array<Todo> -> Void):Void
	{
		trace("-> loadTodos");

		_serverService.performRequest(

			SERVER_TODO_ROUTE,
			Method.GET,

			function(error:String, result:Array<Dynamic>):Void
			{
				if(error != null) {
					callback(null);
				} else {
					var iter:Iterator<Dynamic> = result.iterator();
					var item:Dynamic;
					while(iter.hasNext())
					{
						item = iter.next();
						_data.push(new Todo(
							item.id,
							item.text,
							item.completed ? item.completed != "false" : false,
							item.createdAt != null ? item.createdAt : -1
						));
					}
					callback(_data);
				}
			}
		);
	}

	public function new() { super(); }
}
