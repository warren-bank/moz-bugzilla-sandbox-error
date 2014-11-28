# [moz-bugzilla-sandbox-error](https://github.com/warren-bank/moz-bugzilla-sandbox-error)

Firefox add-on that illustrates an apparent bug in the current implementation of the Mozilla sandbox:

documentation:
  * [API: Sandbox](https://developer.mozilla.org/en-US/docs/Components.utils.Sandbox)
  * [API: evalInSandbox](https://developer.mozilla.org/en-US/docs/Components.utils.evalInSandbox)

related reading:
  * [API: nsIPrincipal](https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XPCOM/Reference/Interface/nsIPrincipal)
  * [article: "Security check basics"](https://developer.mozilla.org/en-US/docs/Security_check_basics)
  * [article: "XPConnect wrappers"](https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XPCOM/Language_bindings/XPConnect/XPConnect_wrappers)

expected output, logged by the "Browser Console":

```
moz-bugzilla-sandbox-error: starting..
moz-bugzilla-sandbox-error: eval result = {"object":{"a":1,"b":2,"c":3},"array":[1,2,3],"number":123,"string":"123","object_keys":["a","b","c"]}
```

helpful hints:
  * open the "Browser Console" via the top navmenu:<br>
    `Tools -> Web Developer -> Browser Console`
  * open the "Browser Console" via the keyboard shortcut:<br>
    `Ctrl + Shift + J`
  * filter the console output with:<br>
    `moz-bugzilla-sandbox-error:`

actual output, as logged by various versions of Firefox:
  * 10.0.2

    ```
    moz-bugzilla-sandbox-error: starting..
    moz-bugzilla-sandbox-error: eval result = {"object":{"a":1,"b":2,"c":3},"array":{"0":1,"1":2,"2":3},"number":123,"string":"123","object_keys":["a","b","c"]}
    ```
  * 12.0

    ```
    moz-bugzilla-sandbox-error: starting..
    moz-bugzilla-sandbox-error: eval result = {"object":{"a":1,"b":2,"c":3},"array":[1,2,3],"number":123,"string":"123","object_keys":["a","b","c"]}
    ```
  * 16.0.2

    ```
    moz-bugzilla-sandbox-error: starting..
    moz-bugzilla-sandbox-error: eval result = {"object":{"a":1,"b":2,"c":3},"array":[1,2,3],"number":123,"string":"123","object_keys":["a","b","c"]}
    ```
  * 17.0

    ```
    moz-bugzilla-sandbox-error: starting..
    moz-bugzilla-sandbox-error: eval result = {"object":{},"array":[1,2,3],"number":123,"string":"123","object_keys":[]}
    ```
  * 24.0

    ```
    moz-bugzilla-sandbox-error: starting..
    moz-bugzilla-sandbox-error: eval result = {"object":{},"array":[1,2,3],"number":123,"string":"123","object_keys":[]}
    ```
  * 33.1.1

    ```
    moz-bugzilla-sandbox-error: starting..
    moz-bugzilla-sandbox-error: eval result = {"object":{},"array":[1,2,3],"number":123,"string":"123","object_keys":[]}
    ```

conclusions:
  * the bug was introduced some time between versions: 16.0.2 and 17.0
