# Across Interfaces
  
<br>  
  
<p align="center">  
Replaces the need for mixins or <br> 
multiple inheritance in JavaScript. <br><br>
  It allows for <code>implements</code>/<code>interface</code> pattern <br> 
using <a href="https://javascript.info/class#class-expression">functions that return class definitions</a>.
</p>
  
<br>

```js
const addSplit = base => class Split extends base {
    split(separator = "") {
        // ...
    }
}
```
  
```js
class CustomString extends addSplit(addToLower(addToUpper(class{}))) {
    // ...
}
```

<br>
  
## Getting started
Since functions can already return classes like this, we can make 
class structures that behave as mixins or fake multiple inheritance.
The `CustomString` example shows how. `Split` will extend 
whatever parameter we give `addSplit()`, so we chain these "add" functions 
to create entirely new classes by combining the features we want - just like 
mixins. 
  
**The problem**:  
If you try experimenting on the example in the introduction, we hit a JavaScript 
brick wall. There is no `implements` or `interface` keyword in JS. We can't tell 
our IDE that a class already has `this.x`, `this.y`, or `this.z()`.  
  
Across Interfaces exports 2 functions to teach your IDE about the
class hierarchy you're designing. Each function describes different facets of 
your class. 
  
> **across()**:  
`across(paramable_class, ...interfaces)`  
Lists the behaviors your class requires or will supply.  
  
> **I()**:  
`I(acrossed_func)`  
Identifies the behaviors the returned class would have.  
  
## How to replace property mixins
```js
class BasePerson {
    name = ""
}

// Create a base class


const addHairColor = across(T => class HairColor extends T {
    haircolor = ""
})

// `addHairColor` is just like `addSplit()` from the intro, but we use `across()` 
// around our function.

const addEyeColor = across(T => class EyeColor extends T {
    eyecolor = ""
})

const addBirthday = across(T => class Birthday extends T {
    birthday = new Date
})


class Person extends addBirthday(addEyeColor(addHairColor(BasePerson)) {
    // Your code editor will know properties 
    // this.haircolor, this.eyecolor, this.birthday, this.name
    // exist in this class
}
``` 
  
## How to simulate multiple inheritance
```js
class BaseCar {
    color = ""
}

// Add your base class
// If you add properties here, all subclasses can ask for them.


const addWheels = across(T => class Wheels extends T {
    wheels = [true, true, true, true]
})
const hasWheels = I(addWheels)

// After `addWheels()` we create a type-helper, or interface, 
// called `hasWheels`. You can use these in TypeScript or JSDocs.

const addSteeringYoke = across(T => class Yoke extends T {
    steering = "left"
})
const hasSteering = I(addSteeringYoke)


const addDrive = across(T => class Drive extends T {
    drive(direction = "") {
        if(this.steering !== direction) throw "Steering misaligned!"
        if(this.wheels.some(w => w === false) throw "Some wheels are faulty!"
        
        return true
    }
}, hasSteering, hasWheels, BaseCar)

// How does `Drive` know about `this.steering` or `this.wheels`?
// Our type-helpers (or any class) can be passed to `across()` 
// as later parameters.
// This tells `Drive` that it has access to all of `Yoke`, `BaseCar`, `Wheels`

// Is this multiple inheritance? We are using properties 
// from different subclasses, but we aren't joining classes here. 
// Instead, we're describing the class that we will later inherit from.


class Car extends addDrive(addSteeringYoke(addWheels(BaseCar))) {
    // Your code editor also knows the parameter types of 
    // your methods, including what it returns
}

// This is why `addDrive` works, `Car` passes through `addSteeringYoke` 
// first. We add properties in the order of innermost to outermost.
```
  
## How to use aspects (replace aspect mixins)
```js
class BasePlayer {
    hunger = 100
}

const addEat = across(T => class Eat extends T {
    eat(food = 25) {
        this.hunger -= food
    }
}, BasePlayer)
const hasEat = I(addEat)

const eatAddLimit = across(T => class Limit extends T {
    eat(food = 25) {
        if(food > 1000) throw "That's too much to eat."
        
        super.eat(food)
    }
}, hasEat, BasePlayer)
const eatAddContentment = across(T => class Contentment extends T {
    eat(food = 25) {
        if(food > 100) food = food / 2
        
        super.eat(food)
    }
}, hasEat, BasePlayer)

class Player extends eatAddContentment(eatAddLimit(addEat(BasePlayer))) {

}
```
## How to provide buildless tree shaking
```js

// base.js
export class BaseArray {
    values = []
}

// fill.js
export const addFill = across(T => class extends T {
    fill() { /* ... */ }
}, BaseArray)

// filter.js
export const addFilter = across(T => class extends T {
    filter() { /* ... */ }
}, BaseArray)

// find.js
export const addFind = across(T => class extends T {
    find() { /* ... */ }
}, BaseArray)

// findIndex.js
export const addFindIndex = across(T => class extends T {
    findIndex() { /* ... */ }
}, BaseArray)
```
```js
import { BaseArray } from "./example-array-implementation/base.js" 
import { addFind } from "./example-array-implementation/find.js" 
import { addFill } from "./example-array-implementation/fill.js" 

class CustomArray extends addFill(addFind(BaseArray)) {

}
```
