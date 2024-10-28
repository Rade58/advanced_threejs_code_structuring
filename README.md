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

Remeber that we inserted our singleton instance `experience` into globalThis; **Which means it can be accessed through `window` in our browser console**

In our case we can access `play` or `stop` of our animation actions like this in browsers console:

```js
experience.world.fox.animation.actions.running.stop()
experience.world.fox.animation.actions.running.play()

experience.world.fox.animation.actions.idle.play()
experience.world.fox.animation.actions.idle.stop()

experience.world.fox.animation.actions.walking.play()
experience.world.fox.animation.actions.walking.stop()
```