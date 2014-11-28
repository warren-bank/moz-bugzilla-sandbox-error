const Cc = Components.classes;
const Ci = Components.interfaces;
const Cu = Components.utils;

const CONSOLE = Cc["@mozilla.org/consoleservice;1"].getService(Ci.nsIConsoleService);

var log, eval_result;

log = function(s){
	CONSOLE.logStringMessage(s);
};

log('moz-bugzilla-sandbox-error: starting..');

// https://developer.mozilla.org/en-US/docs/Components.utils.Sandbox
// https://developer.mozilla.org/en-US/docs/Components.utils.evalInSandbox
// https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XPCOM/Reference/Interface/nsIPrincipal
// https://developer.mozilla.org/en-US/docs/Security_check_basics
eval_result = (function(){
	var host_variables, null_principal, sandbox_options, sandbox, code, result;

	host_variables	= {
		"object"				: {"a":1,"b":2,"c":3},
		"array"					: [1,2,3],
		"number"				: 123,
		"string"				: "123"
	};

	null_principal	= Cc["@mozilla.org/nullprincipal;1"].createInstance(Ci.nsIPrincipal);
	sandbox_options	= {
		"sandboxName"			: "test_01",
		"sandboxPrototype"		: {},
		"wantXrays"				: false,
		"wantComponents"		: false,
		"wantExportHelpers"		: false,
		"wantXHRConstructor"	: false,
		"wantGlobalProperties"	: []
	};
	sandbox			= new Cu.Sandbox(null_principal, sandbox_options);
	sandbox.obj		= host_variables['object'];
	sandbox.arr		= host_variables['array'];
	sandbox.num		= host_variables['number'];
	sandbox.str		= host_variables['string'];
	code			= '' +
						'(function(){' +
							'var sandboxed_variables = {};' +
							'sandboxed_variables["object"] = obj;' +
							'sandboxed_variables["array"]  = arr;' +
							'sandboxed_variables["number"] = num;' +
							'sandboxed_variables["string"] = str;' +
							'var obj_keys = [];' +
							'for (var obj_key in obj){ obj_keys.push(obj_key); }' +
							'sandboxed_variables["object_keys"] = obj_keys;' +
							'return JSON.stringify(sandboxed_variables);' +
						'})()';
	result			= Cu.evalInSandbox(code, sandbox);
	return result
})();

log('moz-bugzilla-sandbox-error: eval result = ' + eval_result);
