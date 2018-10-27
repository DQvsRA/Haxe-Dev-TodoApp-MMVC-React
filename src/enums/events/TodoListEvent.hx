package enums.events;

class TodoListEvent {
	static private var PREFIX : String = "event_todolist_";

	static public var UPDATE_TODO : String = PREFIX + "update";
	static public var DELETE_TODO : String = PREFIX + "delete";
	static public var TOGGLE_TODO : String = PREFIX + "toggle";
}
