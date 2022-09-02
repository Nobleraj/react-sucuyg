import React, {
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  useImperativeHandle,
  useCallback,
} from 'react';
import './style.css';
import data from './data';
import Folder from './Folder';
import useCounter from './CustomHook';

export default function App() {
  const [count, increament] = useCounter(10);

  const inputRef = useRef();

  const onFocus = () => {
    inputRef.current.demo(Math.random());
  };

  const [search, setSearch] = useState([
    'hello',
    'demo',
    'ho',
    'helefewf',
    'hellwswso',
    'tees',
  ]);
  const [dynamic, setDynamic] = useState([]);
  const handlerSearch = (e) => {
    const value = e.target.value;
    let temp = [];
    if (value.length) {
      temp = search.filter((val) => {
        return val.includes(value);
      });
    } else {
      temp = [];
    }
    setDynamic([...temp]);
  };
  const debounce = (fn, delay) => {
    let timer;
    return (...args) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  };
  const handler = useCallback(debounce(handlerSearch, 1000), []);
  return (
    <div>
      {/* Counter using custom hook*/}

      <input placeholder="search" onChange={handler} />
      <div>
        {dynamic.map((val) => (
          <div key={val}>{val}</div>
        ))}
      </div>

      <h1>Counter : {count}</h1>
      <button onClick={increament}>Add</button>

      <Comp data={[]} />
      <RefChild ref={inputRef} />
      <button onClick={onFocus}>Focus</button>

      <Debounce />
      <Tabs />
      <Folder data={data} />
    </div>
  );
}

const RefChild = React.forwardRef((props, ref) => {
  const demo = (a) => {
    alert(a);
  };
  useImperativeHandle(
    ref,
    () => {
      return {
        demo() {
          alert('2');
        },
      };
    },
    []
  );
  return (
    <div>
      Ref useImperativeHandle
      <input ref={ref} />
    </div>
  );
});

const Comp = (props) => {
  const array = props.data;
  const [state, setState] = useState({
    name: '',
    date: '',
    data: array,
  });
  const [vall, setVall] = useState('');

  const y = (val, v) => {
    console.log(val, v);
  };
  useEffect(() => {
    y('useeffect', state.data.length);
  }, [state.data.length]);

  useLayoutEffect(() => {
    y('useLayout', state.data.length);
  }, [state.data.length]);

  const updateState = (newState) => {
    setState((prev) => {
      return { ...prev, ...newState };
    });
  };

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    updateState({ [name]: value });
  };
  const addHandler = () => {
    let obj = { name: state.name, date: state.date };
    let curr = [...state.data];
    curr.push(obj);
    updateState({ data: curr, name: '', date: '' });
  };
  console.log(state.data);
  return (
    <div>
      <p>Length : {state.data.length}</p>
      <input
        type="text"
        name="name"
        value={state.name}
        onChange={onChangeHandler}
        placeholder="Name"
      />
      <input
        type="date"
        name="date"
        value={state.date}
        onChange={onChangeHandler}
        placeholder="Age"
      />
      <button onClick={addHandler}>Add</button>

      <div>
        <span>List</span>
        <ul>
          {state.data.map((val, i) => {
            return (
              <li key={i}>
                {val.name} {val.date}{' '}
                <button
                  onClick={() => {
                    state.data.splice(i, 1);
                    updateState({ data: state.data });
                  }}
                >
                  Del
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

const Debounce = () => {
  const [val, setVal] = useState('');

  const debounce = (fn, delay) => {
    let timer;
    return (...args) => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  const eventChange = (e) => {
    console.log(e.target.value);
  };

  const onChangeHandler = useCallback(debounce(eventChange, 2000), []);

  return (
    <div>
      <input onChange={onChangeHandler} placeholder="Enter" />
    </div>
  );
};

const Tabs = () => {
  const [tab, setTab] = useState([
    { id: 0, name: 'A', value: '' },
    { id: 1, name: 'B', value: '' },
    { id: 2, name: 'C', value: '' },
  ]);

  const [active, setActive] = useState(0);

  const onTabClick = (id) => {
    setActive(id);
  };

  const onChangeHandler = (e) => {
    let curr = [...tab];
    curr[active].value = e.target.value;
    setTab(curr);
  };

  return (
    <div>
      <div class="tabs-wrapper">
        {tab.map((val) => (
          <button
            className={`clss${val.id}`}
            id={val.id}
            onClick={() => onTabClick(val.id)}
          >
            {val.name}
          </button>
        ))}
      </div>

      <div className="tab-info">{`You clicked ${tab[active].name}`}</div>

      <input value={tab[active].value} onChange={onChangeHandler} />
    </div>
  );
};
