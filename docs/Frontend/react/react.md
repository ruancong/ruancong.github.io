### React组件

React components are JavaScript functions that return markup:

```react
function MyButton() {
  return (
    <button>I'm a button</button>
  );
}
```

react组件可以嵌入到其它的组件内。

```react
export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton />
    </div>
  );
}
```

#### 注意事项

* react组件以大写字母开头，而html标签是小写字母

* return的值，如果返回的值是一行html则可以省略`()` , 如果我多选，则需要用`()`括起来，否则return后面的行都会被忽略

* 不能在组件里面定义组件

  > ```react
  > export default function Gallery() {
  > // 🔴 Never define a component inside another component!
  > function Profile() {
  >  // ...
  > }
  > // ...
  > }
  > ```
  >

* 需要移到top level

* The default behavior of rendering all components nested within the updated component is not optimal for performance if the updated component is very high in the tree. If you run into a performance issue, there are several opt-in ways to solve it described in the [Performance](https://reactjs.org/docs/optimizing-performance.html) section. **Don’t optimize prematurely!**

* **React only changes the DOM nodes if there’s a difference between renders.** 

  ```react
  export default function Clock({ time }) {
    return (
      <>
        <h1>{time}</h1>
        <input />
      </>
    );
  }
  ```

  这段代码中，如果time一直变化 ，而在input中输入的值还是会被保留。This works because during this last step, React only updates the content of `<h1>` with the new `time`. It sees that the `<input>` appears in the JSX in the same place as last time, so React doesn’t touch the `<input>`—or its `value`!

* **Setting state only changes it for the next render.**

  ```react
  <button onClick={() => {
    setNumber(number + 1);
    setNumber(number + 1);
    setNumber(number + 1);
  }}>+3</button>
  ```

  点击一次，number只会+1。

  一个state变量在一个渲染里面是不会改变的，即使它在组件内的异步方法内:

  ```react
   const [number, setNumber] = useState(0);
  
    return (
      <>
        <h1>{number}</h1>
        <button onClick={() => {
          setNumber(number + 5);
          setTimeout(() => {
            alert(number);
          }, 3000);
        }}>+5</button>
      </>
  ```

  alert出来的值还是0

* 

### JSX

#### Writing markup with JSX 

The markup syntax you’ve seen above is called *JSX*. 

JSX is stricter than HTML. You have to close tags like `<br />`. **Your component also can’t return multiple JSX tags**. You have to wrap them into a shared parent, like a `<div>...</div>` or an empty `<>...</>` wrapper:

```react
function AboutPage() {
  return (
    <>
      <h1>About</h1>
      <p>Hello there.<br />How do you do?</p>
    </>
  );
}
```

#### The Rules of JSX

1. Return a single root element

   > JSX looks like HTML, but under the hood it is transformed into plain JavaScript objects. You can’t return two objects from a function without wrapping them into an array. This explains why you also can’t return two JSX tags without wrapping them into another tag or a Fragment.

2. Close all the tags

3. camelCase ~~all~~ most of the things!

   JavaScript has limitations on variable names. For example, their names can’t contain dashes or be reserved words like `class`. This is why, in React, many HTML and SVG attributes are written in camelCase. For example, instead of `stroke-width` you use `strokeWidth`. Since `class` is a reserved word, in React you write `className` instead

   > For historical reasons, [`aria-*`](https://developer.mozilla.org/docs/Web/Accessibility/ARIA) and [`data-*`](https://developer.mozilla.org/docs/Learn/HTML/Howto/Use_data_attributes) attributes are written as in HTML with dashes.

#### HTML转化成JSX

If you have a lot of HTML to port to JSX, you can use an [online converter.](https://transform.tools/html-to-jsx)

#### JSX中显示数据

JSX中用大括号括起来的内容当作js去运行

```react
return (
  <h1>
    {user.name}
  </h1>
);
```

在jsx中的属性中也可以使用，只是属性的双引号要改为大括号

```react
return (
  <img
    className="avatar"
    src={user.imageUrl}
  />
);
```

可以使用复杂的表达式，如

```react
 return (
    <>
      <h1>{user.name}</h1>
      <img
        className="avatar"
        src={user.imageUrl}
        alt={'Photo of ' + user.name}
        style={{
          width: user.imageSize,
          height: user.imageSize
        }}
      />
    </>
  );
}
```

其中的`{{}}`并不是一个新的语法，里面的`{}`表示一个对象

#### 在JSX中写内联样式

Inline `style` properties are written in camelCase. For example, HTML `<ul style="background-color: black">` would be written as `<ul style={{ backgroundColor: 'black' }}>`  in your component.

### 条件渲染

#### 几种实现方式

1、

```react
let content;
if (isLoggedIn) {
  content = <AdminPanel />;
} else {
  content = <LoginForm />;
}
return (
  <div>
    {content}
  </div>
);
```

2、

```react
<div>
  {isLoggedIn ? (
    <AdminPanel />
  ) : (
    <LoginForm />
  )}
</div>
```

3、

```react
<div>
  {isLoggedIn && <AdminPanel />}
</div>
```

> **Don’t put numbers on the left side of `&&`.** To test the condition, JavaScript converts the left side to a boolean automatically. However, if the left side is `0`, then the whole expression gets that value (`0`), and React will happily render `0` rather than nothing.

#### Are these two examples fully equivalent?

```react
if (isPacked) {
  return <li className="item">{name} ✅</li>;
}
return <li className="item">{name}</li>;
```

```react
return (
  <li className="item">
    {isPacked ? name + ' ✅' : name}
  </li>
);
```

> you might assume that the two examples above are subtly different because one of them may create two different “instances” of `<li>`. But JSX elements aren’t “instances” because they don’t hold any internal state and aren’t real DOM nodes. They’re lightweight descriptions, like blueprints. So these two examples, in fact, *are* completely equivalent. 

#### 根据条件渲染多行HTML

```react
function Item({ name, isPacked }) {
  return (
    <li className="item">
      {isPacked ? (
        <del>
          {name + ' ✅'}
        </del>
      ) : (
        name
      )}
    </li>
  );
}
```

可以使用`()` 来修饰多行语句，像retun语句一样 

> If your components get messy with too much nested conditional markup, consider extracting child components to clean things up. In React, markup is a part of your code, so you can use tools like variables and functions to tidy up complex expressions.

#### 把JSX赋值给变量

```react
let itemContent = (
      <del>
        {name + " ✅"}
      </del>
    );
```



### 循环渲染

```react
const products = [
  { title: 'Cabbage', isFruit: false, id: 1 },
  { title: 'Garlic', isFruit: false, id: 2 },
  { title: 'Apple', isFruit: true, id: 3 },
];

export default function ShoppingList() {
  const listItems = products.map(product =>
    <li
      key={product.id}
      style={{
        color: product.isFruit ? 'magenta' : 'darkgreen'
      }}
    >
      {product.title}
    </li>
  );

  return (
    <ul>{listItems}</ul>
  );
}

```

> Keeping list items in order with key

> do not generate keys on the fly, e.g. with `key={Math.random()}`. This will cause keys to never match up between renders, leading to all your components and DOM being recreated every time. Not only is this slow, but it will also lose any user input inside the list items. Instead, use a stable ID based on the data.

> Note that your components won’t receive `key` as a prop. It’s only used as a hint by React itself. If your component needs an ID, you have to pass it as a separate prop: `<Profile key={id} userId={id} />`.

#### Displaying several DOM nodes for each list item 

当在循环渲染时，有多个同级DOM节点要同时渲染时，`<></>`这种语法无法使用`key`, 也不必要在顶层加一层`div`，可以使用`Fragment `.

```react
import { Fragment } from 'react';

// ...

const listItems = people.map(person =>
  <Fragment key={person.id}>
    <h1>{person.name}</h1>
    <p>{person.bio}</p>
  </Fragment>
);
```

> Fragments disappear from the DOM, so this will produce a flat list of `<h1>`, `<p>`, `<h1>`, `<p>`, and so on.

### 响应事件

```react
function MyButton() {
  function handleClick() {
    alert('You clicked me!');
  }

  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
}
```

> Functions passed to event handlers must be passed, not called. For example:
>
> | passing a function (correct)     | calling a function (incorrect)     |
> | -------------------------------- | ---------------------------------- |
> | `<button onClick={handleClick}>` | `<button onClick={handleClick()}>` |
>  
>
> When you write code inline, the same pitfall presents itself in a different way:
>
> | passing a function (correct)            | calling a function (incorrect)    |
> | --------------------------------------- | --------------------------------- |
> | `<button onClick={() => alert('...')}>` | `<button onClick={alert('...')}>` |

Event handler functions:

- Are usually defined *inside* your components.
- Have names that start with `handle`, followed by the name of the event.

#### 事件传播与捕获

`e.stopPropagation()` , `onClickCapture`

```react
<div onClickCapture={() => { /* this runs first */ }}>
  <button onClick={e => e.stopPropagation()} />
  <button onClick={e => e.stopPropagation()} />
</div>
```

#### 阻止默认行为

```react
export default function Signup() {
  return (
    <form onSubmit={e => {
      e.preventDefault();
      alert('Submitting!');
    }}>
      <input />
      <button>Send</button>
    </form>
  );
}
```

Don’t confuse `e.stopPropagation()` and `e.preventDefault()`. They are both useful, but are unrelated:

- [`e.stopPropagation()`](https://developer.mozilla.org/docs/Web/API/Event/stopPropagation) stops the event handlers attached to the tags above from firing.
- [`e.preventDefault()` ](https://developer.mozilla.org/docs/Web/API/Event/preventDefault)prevents the default browser behavior for the few events that have it.

### useState 的使用

> 一个组件里内多次使用useState，它是怎么知道正确返回某个state的。 React Hooks: Not Magic, Just Arrays.

```react
import { useState } from 'react';

function MyButton() {
  const [count, setCount] = useState(0);
  // ...
```

> You’ll get two things from `useState`: the current state (`count`), and the function that lets you update it (`setCount`). You can give them any names, but the convention is to write `[something, setSomething]`.

多次使用`MyButton`后，每个`MyButton`都有自己的隔离的state.

普通变量可以完成的事就不要使用useState

```react
// useState初化值时，可以传入初始化函数
useState(()=>{
return .....
})
```



### using Hooks

Functions starting with `use` are called *Hooks*. `useState` is a built-in Hook provided by React. You can find other built-in Hooks in the [API reference.](https://react.dev/reference/react) You can also write your own Hooks by combining the existing ones.

Hooks are more restrictive than other functions. You can only call Hooks ***at the top*** of your components (or other Hooks). If you want to use `useState` in a condition or a loop, extract a new component and put it there.

> You “use” React features at the top of your component similar to how you “import” modules at the top of your file.

### 组件属性

```jsx
function MyButton({ count, onClick }) {
  return (
    <button onClick={onClick}>
      Clicked {count} times
    </button>
  );
}
```

`count`与`onClick`为属性，由使用它的组件传递值给

```jsx
import { useState } from 'react';

export default function MyApp() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Counters that update together</h1>
      <MyButton count={count} onClick={handleClick} />
      <MyButton count={count} onClick={handleClick} />
    </div>
  );
}

function MyButton({ count, onClick }) {
  return (
    <button onClick={onClick}>
      Clicked {count} times
    </button>
  );
}

```

> In React, it’s conventional to use `onSomething` names for props which represent events and `handleSomething` for the function definitions which handle those events.

#### 属性传递

React component functions accept a single argument, a `props` object:

```react
function Avatar(props) {
  let person = props.person;
  let size = props.size;
  // ...
}
```

Usually you don’t need the whole `props` object itself, so you destructure it into individual props.

```react
function Avatar({ person, size }) {
  // ...
}
```

#### 设置默认值

```react
function Avatar({ person, size = 100 }) {
  // ...
}
```

The default value is only used if the `size` prop is missing or if you pass `size={undefined}`. But if you pass `size={null}` or `size={0}`, the default value will **not** be used.

#### 向下传递所有属性

```react
function Profile(props) {
  return (
    <div className="card">
      <Avatar {...props} />
    </div>
  );
}
```

#### Passing JSX as children

When you nest content inside a JSX tag, the parent component will receive that content in a prop called `children`. For example, the `Card` component below will receive a `children` prop set to `<Avatar />` and render it in a wrapper div:

```react
import Avatar from './Avatar.js';

function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

export default function Profile() {
  return (
    <Card>
      <Avatar
        size={100}
        person={{ 
          name: 'Katsuko Saruhashi',
          imageId: 'YfeOqp2'
        }}
      />
    </Card>
  );
}
```

> You can think of a component with a `children` prop as having a “hole” that can be “filled in” by its parent components with arbitrary JSX.

#### Don’t try to “change props”

不要在组件内改变props的值 ，要想改变，只能通过父组件传递进来。

### Props VS State

There are two types of “model” data in React: props and state. The two are very different:

- [**Props** are like arguments you pass](https://react.dev/learn/passing-props-to-a-component) to a function. They let a parent component pass data to a child component and customize its appearance. For example, a `Form` can pass a `color` prop to a `Button`.
- [**State** is like a component’s memory.](https://react.dev/learn/state-a-components-memory) It lets a component keep track of some information and change it in response to interactions. For example, a `Button` might keep track of `isHovered` state.

Props and state are different, but they work together. A parent component will often keep some information in state (so that it can change it), and *pass it down* to child components as their props. It’s okay if the difference still feels fuzzy on the first read. It takes a bit of practice for it to really stick!

### 判断一个变量是否需要State

Which of these are state? Identify the ones that are not:

- Does it **remain unchanged** over time? If so, it isn’t state.
- Is it **passed in from a parent** via props? If so, it isn’t state.
- **Can you compute it** based on existing state or props in your component? If so, it *definitely* isn’t state!

### Example Hooks

doc: https://react.dev/learn/typescript#example-hooks

`useMem`与`useCallback`中第二个参数，可以将依赖设置为空数组`[]`，这样就只有在首次渲染时创建,之后就不会再重新创建。

```react
const incrementCount = useCallback(() => {
    setCount(count + 1);
  }, [])
```

### Default vs named exports

| Syntax  | Export statement                      | Import statement                        |
| ------- | ------------------------------------- | --------------------------------------- |
| Default | `export default function Button() {}` | `import Button from './Button.js';`     |
| Named   | `export function Button() {}`         | `import { Button } from './Button.js';` |

When you write a *default* import, you can put any name you want after `import`. For example, you could write `import Banana from './Button.js'` instead.

> **People often use default exports if the file exports only one component, and use named exports if it exports multiple components and values.** Regardless of which coding style you prefer, always give meaningful names to your component functions and the files that contain them. Components without names, like `export default () => {}`, are discouraged because they make debugging harder.

### keep components pure

React offers a “Strict Mode” in which it calls each component’s function twice during development. **By calling the component functions twice, Strict Mode helps find components that break these rules.**

Strict Mode has no effect in production, so it won’t slow down the app for your users. To opt into Strict Mode, you can wrap your root component into `<React.StrictMode>`. 

> It is useful to remember which operations on arrays mutate them, and which don’t. For example, `push`, `pop`, `reverse`, and `sort` will mutate the original array, but `slice`, `filter`, and `map` will create a new one.

A component must be pure, meaning:

- **It minds its own business.** It should not change any objects or variables that existed before rendering.
- **Same inputs, same output.** Given the same inputs, a component should always return the same JSX.

### Where you can cause side effects

While functional programming relies heavily on purity, at some point, somewhere, *something* has to change. That’s kind of the point of programming! These changes—updating the screen, starting an animation, changing the data—are called **side effects.** They’re things that happen *“on the side”*, not during rendering.

 Even though event handlers are defined *inside* your component, they don’t run *during* rendering! **So event handlers don’t need to be pure.**

If you’ve exhausted all other options and can’t find the right event handler for your side effect, you can still attach it to your returned JSX with a [`useEffect`](https://react.dev/reference/react/useEffect) call in your component. This tells React to execute it later, after rendering, when side effects are allowed. **However, this approach should be your last resort.**

### Queuing a series of State updates

```react
const [number,setNumber] = useState(0);
... 
return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(n => n + 1);
        setNumber(n => n + 1);
        setNumber(n => n + 1);
      }}>+3</button>
    </>
  )
```

Here, `n => n + 1` is called an **updater function.** When you pass it to a state setter:

1. React queues this function to be processed after all the other code in the event handler has run.
2. During the next render, React goes through the queue and gives you the final updated state.

| `n`  | returns     | queued update |
| ---- | ----------- | ------------- |
| `0`  | `0 + 1 = 1` | `n => n + 1`  |
| `1`  | `1 + 1 = 2` | `n => n + 1`  |
| `2`  | `2 + 1 = 3` | `n => n + 1`  |

**updater functions must be pure** and only return the result

通常命名更新函数里面的参数的名字为state变量的第一个字母：

```react
setEnabled(e => !e);
setLastName(ln => ln.reverse());
setFriendCount(fc => fc * 2);
```

### State中的Objects

you should **treat any JavaScript object that you put into state as read-only.** 像基本数据类型一样，【number, string】

```react
...
const [position, setPosition] = useState({ x: 0, y: 0 });
...
onPointerMove={e => {
  position.x = e.clientX;
  position.y = e.clientY;
}} 
```

上面这段代码并不会re-render。需要重新设置一个值：

```react
onPointerMove={e => {
  setPosition({
    x: e.clientX,
    y: e.clientY
  });
}}
```

可以用spread syntax来更方便地change object state

```react
onPointerMove={e => {
  setPerson({
    ...person, // Copy the old fields
    firstName: e.target.value // But override this one
  });
}}
```

> `...` 操作符只能浅拷贝，如果对象有嵌套关系，则需要多次使用它
>
> ```react
> const nextArtwork = { ...person.artwork, city: 'New Delhi' };
> const nextPerson = { ...person, artwork: nextArtwork };
> setPerson(nextPerson);
> // 或者
> setPerson({
>   ...person, // Copy other fields
>   artwork: { // but replace the artwork
>     ...person.artwork, // with the same one
>     city: 'New Delhi' // but in New Delhi!
>   }
> });
> ```
>
> 

#### Using a single event handler for multiple fields

```react
import { useState } from 'react';

export default function Form() {
  const [person, setPerson] = useState({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com'
  });

  function handleChange(e) {
    setPerson({
      ...person,
      [e.target.name]: e.target.value
    });
  }
```

#### 使用 Immer 写出简洁的更新逻辑

To try Immer:

1. Run `npm install use-immer` to add Immer as a dependency
2. Then replace `import { useState } from 'react'` with `import { useImmer } from 'use-immer'`

```react
 const [person, updatePerson] = useImmer({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
  });

  function handleNameChange(e) {
    updatePerson(draft => {
      draft.name = e.target.value;
    });
  }
```

### State中的数组操作

avoid the methods in the left column, and instead prefer the methods in the right column:

|           | avoid (mutates the array)           | prefer (returns a new array)                                 |
| --------- | ----------------------------------- | ------------------------------------------------------------ |
| adding    | `push`, `unshift`                   | `concat`, `[...arr]` spread syntax ([example](https://react.dev/learn/updating-arrays-in-state#adding-to-an-array)) |
| removing  | `pop`, `shift`, `splice`            | `filter`, `slice` ([example](https://react.dev/learn/updating-arrays-in-state#removing-from-an-array)) |
| replacing | `splice`, `arr[i] = ...` assignment | `map` ([example](https://react.dev/learn/updating-arrays-in-state#replacing-items-in-an-array)) |
| sorting   | `reverse`, `sort`                   | copy the array first ([example](https://react.dev/learn/updating-arrays-in-state#making-other-changes-to-an-array)) |

更简洁的方法，也可以运`Immer`

### Controlled and uncontrolled components

组件内的状态都由组件内自己维护，不受父组件控制就是`uncontrolled component`, 反之就是`controlled component`

### Preserving and Resetting State

1. Same component at the same position preserves state 
2. Different components at the same position reset state

#### Resetting state at the same position

```react
import { useState } from 'react';

export default function Scoreboard() {
  const [isPlayerA, setIsPlayerA] = useState(true);
  return (
    <div>
      {isPlayerA ? (
        <Counter person="Taylor" />
      ) : (
        <Counter person="Sarah" />
      )}
      <button onClick={() => {
        setIsPlayerA(!isPlayerA);
      }}>
        Next player!
      </button>
    </div>
  );
}

function Counter({ person }) {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{person}'s score: {score}</h1>
      <button onClick={() => setScore(score + 1)}>
        Add one
      </button>
    </div>
  );
}
```

In the example above, the state can be preserved because the `Counter` component is at same position.

1. Render components in different positions

   ```react
    <div>
         {isPlayerA &&
           <Counter person="Taylor" />
         }
         {!isPlayerA &&
           <Counter person="Sarah" />
         }
         <button onClick={() => {
           setIsPlayerA(!isPlayerA);
         }}>
           Next player!
         </button>
       </div>
   ```

   

2. Give each component an explicit identity with `key`

   > You can use keys make React distinguish between any components. Remember that keys are not globally unique. They only specify the position *within the parent*.

### Exstracting State Logic into a Reducer

> The `useReducer` Hook is similar to `useState`—you must pass it an initial state and it returns a stateful value and a way to set state (in this case, the dispatch function).

```react
import { useReducer } from 'react';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';
import tasksReducer from './tasksReducer.js';

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  function handleAddTask(text) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task: task,
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId,
    });
  }

  return (
    <>
      <h1>Prague itinerary</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}

let nextId = 3;
const initialTasks = [
  {id: 0, text: 'Visit Kafka Museum', done: true},
  {id: 1, text: 'Watch a puppet show', done: false},
  {id: 2, text: 'Lennon Wall pic', done: false},
];

```

```js
export default function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case 'changed': {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
```

#### Writing reducers well

* **Reducers must be pure.** 
* **Each action describes a single user interaction, even if that leads to multiple changes in the data.** 

#### Writing concise reducers with Immer

```react
import { useImmerReducer } from 'use-immer';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';

function tasksReducer(draft, action) {
  switch (action.type) {
    case 'added': {
      draft.push({
        id: action.id,
        text: action.text,
        done: false,
      });
      break;
    }
    case 'changed': {
      const index = draft.findIndex((t) => t.id === action.task.id);
      draft[index] = action.task;
      break;
    }
    case 'deleted': {
      return draft.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export default function TaskApp() {
  const [tasks, dispatch] = useImmerReducer(tasksReducer, initialTasks);

  function handleAddTask(text) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task: task,
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId,
    });
  }

  return (
    <>
      <h1>Prague itinerary</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}

let nextId = 3;
const initialTasks = [
  {id: 0, text: 'Visit Kafka Museum', done: true},
  {id: 1, text: 'Watch a puppet show', done: false},
  {id: 2, text: 'Lennon Wall pic', done: false},
];


```

### Passing data deeply with Context

```react
import { createContext } from 'react';

// 创建,可以初化其它值
export const LevelContext = createContext(0);
//  This initial value of 0 is used as a fallback if a component tries to use the context without being wrapped in a Provider.

...
// 使用
const level = useContext(LevelContext);
...
// 提供
<LevelContext.Provider value={level + 1}>
        {children}
</LevelContext.Provider>
```

> 但是Context不要过度使用，Here’s a few alternatives you should consider before using context:
>
> 1. Start by passing props.
> 2. Extract components and pass JSX as children to them.
>
> If neither of these approaches works well for you, consider context.

#### Use cases for context

* Theming
* Current account
* Routing
* Managing state

### userReducer与useContext联合使用

### escape hatch

When you want a component to “remember” some information, but you don’t want that information to trigger new renders, you can use a ref.

 Refs are an “escape hatch” you won’t need often. Here’s how state and refs compare:

| refs                                                         | state                                                        |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| `useRef(initialValue)` returns `{ current: initialValue }`   | `useState(initialValue)` returns the current value of a state variable and a state setter function ( `[value, setValue]`) |
| Doesn’t trigger re-render when you change it.                | Triggers re-render when you change it.                       |
| Mutable—you can modify and update `current`’s value outside of the rendering process. | ”Immutable”—you must use the state setting function to modify state variables to queue a re-render. |
| You shouldn’t read (or write) the `current` value during rendering. | You can read state at any time. However, each render has its own [snapshot](https://react.dev/learn/state-as-a-snapshot) of state which does not change. |

> // Inside of React
>
> function useRef(initialValue) {
>
>   const [ref, unused] = useState({ current: initialValue });
>
>   return ref;
>
> }

When you pass a ref to a `ref` attribute in JSX, like `<div ref={myRef}>`, React will put the corresponding DOM element into `myRef.current`.Once the element is removed from the DOM, React will update `myRef.current` to be `null`.

#### 引用DOM元素

```react
<ul>
  {items.map((item) => {
    // Doesn't work!
    const ref = useRef(null);
    return <li ref={ref} />;
  })}
</ul>
```

One possible way around this is to get a single ref to their parent element, and then use DOM manipulation methods like [`querySelectorAll`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) to “find” the individual child nodes from it. However, this is brittle and can break if your DOM structure changes.

Another solution is to **pass a function to the `ref` attribute.** This is called a [`ref` callback.](https://react.dev/reference/react-dom/components/common#ref-callback) React will call your ref callback with the DOM node when it’s time to set the ref, and with `null` when it’s time to clear it. This lets you maintain your own array or a [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map), and access any ref by its index or some kind of ID.

```react
import { useRef, useState } from "react";

export default function CatFriends() {
  const itemsRef = useRef(null);
  const [catList, setCatList] = useState(setupCatList);

  function scrollToCat(cat) {
    const map = getMap();
    const node = map.get(cat);
    node.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  function getMap() {
    if (!itemsRef.current) {
      // Initialize the Map on first usage.
      itemsRef.current = new Map();
    }
    return itemsRef.current;
  }

  return (
    <>
      <nav>
        <button onClick={() => scrollToCat(catList[0])}>Tom</button>
        <button onClick={() => scrollToCat(catList[5])}>Maru</button>
        <button onClick={() => scrollToCat(catList[9])}>Jellylorum</button>
      </nav>
      <div>
        <ul>
          {catList.map((cat) => (
            <li
              key={cat}
              ref={(node) => {
                const map = getMap();
                if (node) {
                  map.set(cat, node);
                } else {
                  map.delete(cat);
                }
              }}
            >
              <img src={cat} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function setupCatList() {
  const catList = [];
  for (let i = 0; i < 10; i++) {
    catList.push("https://loremflickr.com/320/240/cat?lock=" + i);
  }

  return catList;
}

```

#### useRef引用react组件

常规用法是不行的。需要forward到组件内的某一个子组件 

```react
import { forwardRef, useRef } from 'react';

const MyInput = forwardRef((props, ref) => {
  return <input {...props} ref={ref} />;
});

export default function Form() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>
        Focus the input
      </button>
    </>
  );
}
```

只暴露一部分api的方法

```react
import {
  forwardRef, 
  useRef, 
  useImperativeHandle
} from 'react';

const MyInput = forwardRef((props, ref) => {
  const realInputRef = useRef(null);
  useImperativeHandle(ref, () => ({
    // Only expose focus and nothing else
    focus() {
      realInputRef.current.focus();
    },
  }));
  return <input {...props} ref={realInputRef} />;
});

export default function Form() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>
        Focus the input
      </button>
    </>
  );
}

```

> Refs are an escape hatch. You should only use them when you have to “step outside React”. Common examples of this include managing focus, scroll position, or calling browser APIs that React does not expose.

#### useEffect

**Don’t rush to add Effects to your components.** Keep in mind that Effects are typically used to “step out” of your React code and synchronize with some *external* system.By default, Effects run after *every* render.

To write an Effect, follow these three steps:

1. **Declare an Effect.** By default, your Effect will run after every [commit](https://react.dev/learn/render-and-commit).
2. **Specify the Effect dependencies.** Most Effects should only re-run *when needed* rather than after every render. For example, a fade-in animation should only trigger when a component appears. Connecting and disconnecting to a chat room should only happen when the component appears and disappears, or when the chat room changes. You will learn how to control this by specifying *dependencies.*
3. **Add cleanup if needed.** 

例子：

```react
import { useState, useRef, useEffect } from 'react';

function VideoPlayer({ src, isPlaying }) {
  const ref = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      console.log('Calling video.play()');
      ref.current.play();
    } else {
      console.log('Calling video.pause()');
      ref.current.pause();
    }
  }, []); // This causes an error

  return <video ref={ref} src={src} loop playsInline />;
}

```

> You will see an error saying `React Hook useEffect has a missing dependency: 'isPlaying'`:  
>
> The problem is that the code inside of your Effect *depends on* the `isPlaying` prop to decide what to do, but this dependency was not explicitly declared. To fix this issue, add `isPlaying` to the dependency array:
>
> ```react
> useEffect(() => {
>     if (isPlaying) { // It's used here...
>       // ...
>     } else {
>       // ...
>     }
>   }, [isPlaying]); // ...so it must be declared here!
> ```

useEffect在`<StrictMode>`开发模式下，会被调用两次，不要试图用元素是否出现去控制里面的逻辑，而需要提供合适的cleanup函数或其它方式来保持正常，下面是一个错误的解决问题的示例：

```react
 const connectionRef = useRef(null);
  useEffect(() => {
    // 🚩 This wont fix the bug!!!
    if (!connectionRef.current) {
      connectionRef.current = createConnection();
      connectionRef.current.connect();
    }
  }, []);
```

##### 控制一些非React的组件

```react 
// 类似地图组件 
useEffect(() => {
  const map = mapRef.current;
  map.setZoomLevel(zoomLevel);
}, [zoomLevel]);

// 类似对话框组件
useEffect(() => {
  const dialog = dialogRef.current;
  dialog.showModal();
  return () => dialog.close();
}, []);

```

##### 订阅事件监听与取消

```react
useEffect(() => {
  function handleScroll(e) {
    console.log(window.scrollX, window.scrollY);
  }
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

##### 触发动画

```react
useEffect(() => {
  const node = ref.current;
  node.style.opacity = 1; // Trigger the animation
  return () => {
    node.style.opacity = 0; // Reset to the initial value
  };
}, []);
```

##### 拉取服务器数据

```react
useEffect(() => {
  let ignore = false;

  async function startFetching() {
    const json = await fetchTodos(userId);
    if (!ignore) {
      setTodos(json);
    }
  }

  startFetching();

  return () => {
    ignore = true;
  };
}, [userId]);
```

> 在useEffect里面从服务器拉取数据，有不少有缺点：
>
> - **Effects don’t run on the server.** This means that the initial server-rendered HTML will only include a loading state with no data. The client computer will have to download all JavaScript and render your app only to discover that now it needs to load the data. This is not very efficient.
> - **Fetching directly in Effects makes it easy to create “network waterfalls”.** You render the parent component, it fetches some data, renders the child components, and then they start fetching their data. If the network is not very fast, this is significantly slower than fetching all data in parallel.
> - **Fetching directly in Effects usually means you don’t preload or cache data.** For example, if the component unmounts and then mounts again, it would have to fetch the data again.
> - **It’s not very ergonomic.** There’s quite a bit of boilerplate code involved when writing `fetch` calls in a way that doesn’t suffer from bugs like [race conditions.](https://maxrozen.com/race-conditions-fetching-data-react-with-useeffect)
>
> we recommend the following approaches:
>
> - **If you use a [framework](https://react.dev/learn/start-a-new-react-project#production-grade-react-frameworks), use its built-in data fetching mechanism.** Modern React frameworks have integrated data fetching mechanisms that are efficient and don’t suffer from the above pitfalls.
> - **Otherwise, consider using or building a client-side cache.** Popular open source solutions include [React Query](https://tanstack.com/query/latest), [useSWR](https://swr.vercel.app/), and [React Router 6.4+.](https://beta.reactrouter.com/en/main/start/overview) You can build your own solution too, in which case you would use Effects under the hood, but add logic for deduplicating requests, caching responses, and avoiding network waterfalls (by preloading data or hoisting data requirements to routes).

还有一个初始化代码还可以写在useEffect外面 ，

```react
if (typeof window !== 'undefined') { // Check if we're running in the browser.
  checkAuthToken();
  loadDataFromLocalStorage();
}

function App() {
  // ...
}
```

> This guarantees that such logic only runs once after the browser loads the page.

##### You might not need an UseEffect

* You don’t need Effects to transform data for rendering.
* You don’t need Effects to handle user events.

How to remove unnecessnary Effects:

1. Updating state based on props or state .

2. Caching expensive calculations .

   How to tell if a calculation is expensive?

   ```js
   console.time('filter array');
   const visibleTodos = getFilteredTodos(todos, filter);
   console.timeEnd('filter array');
   ```

   You will then see logs like `filter array: 0.15ms` in your console. If the overall logged time adds up to a significant amount (say, `1ms` or more), it might make sense to memoize that calculation. 

3. Resetting all state when a prop changes 

   experiment code:

   ```react
   export default function ProfilePage({ userId }) {
     const [comment, setComment] = useState('');
   
     // 🔴 Avoid: Resetting state on prop change in an Effect
     useEffect(() => {
       setComment('');
     }, [userId]);
     // ...
   }
   ```

   Instead, you can tell React that each user’s profile is conceptually a *different* profile by giving it an explicit key. Split your component in two and pass a `key` attribute from the outer component to the inner one:

   ```react
   export default function ProfilePage({ userId }) {
     return (
       <Profile
         userId={userId}
         key={userId}
       />
     );
   }
   
   function Profile({ userId }) {
     // ✅ This and any other state below will reset on key change automatically
     const [comment, setComment] = useState('');
     // ...
   }
   ```

   > By passing userId as a key to the Profile component, you’re asking React to treat two Profile components with different userId as two different components that should not share any state. 

4. Adjusting some state when a prop changes

   ```react
   function List({ items }) {
     const [isReverse, setIsReverse] = useState(false);
     const [selection, setSelection] = useState(null);
   
     // 🔴 Avoid: Adjusting state on prop change in an Effect
     useEffect(() => {
       setSelection(null);
     }, [items]);
     // ...
   }
   ```

   This, too, is not ideal. Every time the `items` change, the `List` and its child components will render with a stale `selection` value at first. Then React will update the DOM and run the Effects. Finally, the `setSelection(null)` call will cause another re-render of the `List` and its child components, restarting this whole process again.

   Start by deleting the Effect. Instead, adjust the state directly during rendering:

   ```react
   function List({ items }) {
     const [isReverse, setIsReverse] = useState(false);
     const [selection, setSelection] = useState(null);
     // Better: Adjust the state while rendering
     const [prevItems, setPrevItems] = useState(items);
     if (items !== prevItems) {
       setPrevItems(items);
       setSelection(null);
     }
     // ...
   }
   ```
    > In the above example, `setSelection` is called directly during a render. React will re-render the `List` *immediately* after it exits with a `return` statement. React has not rendered the `List` children or updated the DOM yet, so this lets the `List` children skip rendering the stale `selection` value.
   
   > When you update a component during rendering, React throws away the returned JSX and immediately retries rendering. To avoid very slow cascading retries, React only lets you update the ***same*** component’s state during a render. If you update another component’s state during a render, you’ll see an error. A condition like `items !== prevItems` is necessary to avoid loops.
   
   **Although this pattern is more efficient than an Effect, most components shouldn’t need it either. **For example, instead of storing (and resetting) the selected *item*, you can store the selected *item ID:*
   
   ```react
   function List({ items }) {
     const [isReverse, setIsReverse] = useState(false);
     const [selectedId, setSelectedId] = useState(null);
     // ✅ Best: Calculate everything during rendering
     const selection = items.find(item => item.id === selectedId) ?? null;
     // ...
   }
   ```
   
5. Initializing the application 
   
   ```react
   function App() {
     // 🔴 Avoid: Effects with logic that should only ever run once
     useEffect(() => {
       loadDataFromLocalStorage();
       checkAuthToken();
     }, []);
     // ...
   }
   ```

6. Notifying parent components about state changes 

   ```react
   function Toggle({ onChange }) {
     const [isOn, setIsOn] = useState(false);
   
     // 🔴 Avoid: The onChange handler runs too late
     useEffect(() => {
       onChange(isOn);
     }, [isOn, onChange])
   
     function handleClick() {
       setIsOn(!isOn);
     }
   
     function handleDragEnd(e) {
       if (isCloserToRightEdge(e)) {
         setIsOn(true);
       } else {
         setIsOn(false);
       }
     }
   
     // ...
   }
   ```

   change to:

   ```react
   function Toggle({ onChange }) {
     const [isOn, setIsOn] = useState(false);
   
     function updateToggle(nextIsOn) {
       // ✅ Good: Perform all updates during the event that caused them
       setIsOn(nextIsOn);
       onChange(nextIsOn);
     }
   
     function handleClick() {
       updateToggle(!isOn);
     }
   
     function handleDragEnd(e) {
       if (isCloserToRightEdge(e)) {
         updateToggle(true);
       } else {
         updateToggle(false);
       }
     }
   
     // ...
   }
   ```

7. Passing data to the parent 

   ```react
   function Parent() {
     const [data, setData] = useState(null);
     // ...
     return <Child onFetched={setData} />;
   }
   
   function Child({ onFetched }) {
     const data = useSomeAPI();
     // 🔴 Avoid: Passing data to the parent in an Effect
     useEffect(() => {
       if (data) {
         onFetched(data);
       }
     }, [onFetched, data]);
     // ...
   }
   ```

   In React, data flows from the parent components to their children. Since both the child and the parent need the same data, let the parent component fetch that data, and *pass it down* to the child instead:

   ```react
   function Parent() {
     const data = useSomeAPI();
     // ...
     // ✅ Good: Passing data down to the child
     return <Child data={data} />;
   }
   
   function Child({ data }) {
     // ...
   }
   ```

8. Subscribing to an external store

   自己实现：

   ```react
   function useOnlineStatus() {
     // Not ideal: Manual store subscription in an Effect
     const [isOnline, setIsOnline] = useState(true);
     useEffect(() => {
       function updateState() {
         setIsOnline(navigator.onLine);
       }
   
       updateState();
   
       window.addEventListener('online', updateState);
       window.addEventListener('offline', updateState);
       return () => {
         window.removeEventListener('online', updateState);
         window.removeEventListener('offline', updateState);
       };
     }, []);
     return isOnline;
   }
   
   function ChatIndicator() {
     const isOnline = useOnlineStatus();
     // ...
   }
   ```

   using built-in Hook: `useSyncExternalStore`

   ```react
   function subscribe(callback) {
     window.addEventListener('online', callback);
     window.addEventListener('offline', callback);
     return () => {
       window.removeEventListener('online', callback);
       window.removeEventListener('offline', callback);
     };
   }
   
   function useOnlineStatus() {
     // ✅ Good: Subscribing to an external store with a built-in Hook
     return useSyncExternalStore(
       subscribe, // React won't resubscribe for as long as you pass the same function
       () => navigator.onLine, // How to get the value on the client
       () => true // How to get the value on the server
     );
   }
   
   function ChatIndicator() {
     const isOnline = useOnlineStatus();
     // ...
   }
   ```

9. Fetching data

   首选一些框架里的网络请求库。如果不想用框架的话，可以这样做：

   ```react
   function SearchResults({ query }) {
     const [page, setPage] = useState(1);
     const params = new URLSearchParams({ query, page });
     const results = useData(`/api/search?${params}`);
   
     function handleNextPageClick() {
       setPage(page + 1);
     }
     // ...
   }
   
   function useData(url) {
     const [data, setData] = useState(null);
     useEffect(() => {
       let ignore = false;
       fetch(url)
         .then(response => response.json())
         .then(json => {
           if (!ignore) {
             setData(json);
           }
         });
       return () => {
         ignore = true;
       };
     }, [url]);
     return data;
   }
   ```

   > In general, whenever you have to resort to writing Effects, keep an eye out for when you can extract a piece of functionality into a custom Hook with a more declarative and purpose-built API like `useData` above. The fewer raw `useEffect` calls you have in your components, the easier you will find to maintain your application. 

### Removing Effect dependencies

#### Are you reading some state to calculate the next state?

```react
function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const connection = createConnection();
    connection.connect();
    connection.on('message', (receivedMessage) => {
      setMessages([...messages, receivedMessage]);
    });
    return () => connection.disconnect();
  }, [roomId, messages]); // ✅ All dependencies declared
  // ...
```

为了防止每收到一个信息，导致effect就重新运行一次，To fix the issue, don’t read `messages` inside the Effect. Instead, pass an [updater function](https://react.dev/reference/react/useState#updating-state-based-on-the-previous-state) to `setMessages`:

```react
function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const connection = createConnection();
    connection.connect();
    connection.on('message', (receivedMessage) => {
      setMessages(msgs => [...msgs, receivedMessage]);
    });
    return () => connection.disconnect();
  }, [roomId]); // ✅ All dependencies declared
  // ...
```
