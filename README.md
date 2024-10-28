# Code Structuring for bigger projects - Advanced ThreeJS Workshop

# EventEmitter

Copied from the [gist](https://gist.github.com/brunosimon/120acda915e6629e3a4d497935b16bdf?permalink_comment_id=3964343#gistcomment-3964343)

The EventEmitter can be used for any of your classes that need to trigger
events
• An animation of the model has finished
• An object has been clicked on
• The player is going out of the level
• An ennemy died
Later, we are going to use it to tell the experience that all the resources are loaded.

# Testing animation without gui (directly in console)

Remember that we only display debugger on `/#debug` hash

Remeber that we inserted our singleton instance `experience` into globalThis; **Which means it can be accessed through `window` in our browser console**

In our case we can access `play` or `stop` of our animation actions like this in browsers console:

```js
experience.world.fox.animation.actions.running.stop();
experience.world.fox.animation.actions.running.play();

experience.world.fox.animation.actions.idle.play();
experience.world.fox.animation.actions.idle.stop();

experience.world.fox.animation.actions.walking.play();
experience.world.fox.animation.actions.walking.stop();
```

We could wrap some of these above, inside some of our methods of Fox class, and we can also test those methods like this, which unlike me author of the workshop actually did in this lesson. He had a play method where he would pass a name of the action as an argument.

# Destroying or disposing the things that aren't being used anymore

If you need to change your scene it is good idea (should be `must`) to destroy everything from previous scene scine leaving all unecessary thing can be too heavy for gpu to handle.

We will create `destroy` method inside `Experience` class

We can go in this order:

## stopping time and resize events (using `.off` method of the EventEmitter; using `off` method will remove all event listeners for specified event)

try calling `destroy` from the console (try starting animations or resizing to see what will happen)

```
experience.destroy()
```

## dispose of everything in the scene

Not that easy, there is [esey](https://threejs.org/docs/#manual/en/introduction/How-to-dispose-of-objects) about it. (read it)

We are doing this inside mentioned `destroy` method on the Experience

**for more complex projects you would define multiple destroy functions**

We need to traverse the the scene and look for the things that we want to dispose

We will proceed it like this:

- Test if it's a Mesh
- Call the `dispose` method on the `geometry` property of the mesh
- loop through every key of the `material` property
- if there is `dispose` function available on mentioned key, call it (we are doing all of this for material because as you remember we can have so many maps (like ao, color, normal, and we need to dispose all of them))

We can then dispose controls, renderer

In case of using post processing you need to dispose EffectComposer, its WebGLRendererTarget and any potential passes you are using (we are not using those in this project)

and we dispose of debug

we didn't remove canvas and the last frame is still rendered in it, but you can remove it from the page if you need to do that

we didn;t dispose actual resize events on window, and if you are pick you can remove that also

## but you still need to go through your code and see what else you need to dispose

this is a good practice
