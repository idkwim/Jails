
**App**, **Controller** and **View**, inherits from a same Common class and they share the same public methods.
Every methods is executed in the Jails elements context.

```js
jails.app('my-app', function(html, data){
    //Here you can call any public methods
    //Or even create your own
});
```

The markup should specify the type of Jails module and it's name aswell.

```html
    <body data-app="my-app" />
    <div data-controller="my-controller" data-template />
    <div data-component="my-component" />
```

---

## .init
    .init function();
`.init()` is automatically called by `Jails`, is really usefull to start your application and let the variables and init things on **top**.

```js
jails.controller('my-controller', function(html, data){

    this.init = function(){
        console.log('Heeey I\'m already loaded!!');
    };
});
```

## .watch
    .watch function( String:selector, String:event, Function:method );

Delegates a event to the container class. You don't have to append events again when child nodes are refreshed.

## .x
    .x function( selector) : Function( String method, arguments... );
This method is called the EXecuter, used when you want to execute some method of other higher class
such as App, Controller or a View.

```js
    jails.app('home', function(html, data){

        var view = this.x('[data-view]');

        this.init = function(){
            view('render', { my_model :true } );
        };
    });
```

## .emit
    .emit function( name, [data] );

Emits an event to node parents and a optional data, name will be appended to the Jails module name.
```js
jails.component('my-component', function(html){

    this.init = function(){
        this.emit('loaded', { instance :this });
    };
});
```
The above example will fire `my-component:loaded` to node parents.

## .listen
    .listen function( name, method );

This method is used to catch `emit` events, using the example above, if you want to listen the component event on some controller/view/app, you can do this:

```js
    jails.view('my-view', function(html, data){

        this.init = function(){
            this.listen('my-component:loaded', cp_loaded);
        };

        function cp_loaded(event, option){
            console.log('my-component instance:', option.instance );
        }
    });
```

---

> While `.listen` and `.emit` has a closed scope and limits to parent and child limits,
`.publish` and `subscribe` has a "global" behavior, any Jails module can listen and emit an event.

---

## .publish
    .publish( event, [data]);

Fires an event globally, every module which is subscribed will listen to that. `data` is optional.

## .subscribe
    .subscribe( event, callback([data]) );

Listen to a global event, and executes the callback. If `publish` send a data, it will be sent as a parameter of callback function.