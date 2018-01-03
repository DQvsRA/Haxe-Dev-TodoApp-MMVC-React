package ;
import app.ApplicationContext;
import app.view.components.popups.InfoPopup;
import app.view.components.TodoForm;
import app.view.components.TodoList;
import core.interfaces.IApplication;
import core.view.Component;
import js.Browser.document;
import js.Browser.window;
import mmvc.api.IViewContainer;
import react.React;
import react.ReactDOM;

class Application extends Component<Props, State, Refs> implements IViewContainer implements IApplication
{
	private var _context:ApplicationContext;

	public var viewAdded:Dynamic -> Void;
	public var viewRemoved:Dynamic -> Void;

	var _isAdded:Bool;

	static public function init()
	{
		var appContainer = document.getElementById("container");
		ReactDOM.render(React.createElement(Application), appContainer);
	}

	function new(props:Dynamic)
	{
		super(props);
		_context = new ApplicationContext(this, true);
	}

	public function isAdded(view:Dynamic):Bool
	{
		return _isAdded;
	}

	override function componentDidMount()
	{
		_isAdded = true;
	}

	override public function render()
	{
		return React.createElement(
			"div",
			{
				key: "application",
				id: "app"
			},
			React.createElement(TodoForm, {root:this}),
			React.createElement(TodoList, {root:this}),
			React.createElement(InfoPopup, {root:this})
		);
	}

	public function onViewAdded(view:Dynamic):Void
	{
		viewAdded(view);
	}

	public function onViewRemoved(view:Dynamic):Void
	{
		viewRemoved(view);
	}
}
