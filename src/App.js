import React, {
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  useImperativeHandle,
  useCallback,
} from 'react';
import './style.css';
import data from './data.js';

export default function App() {
  const inputRef = useRef();

  const onFocus = () => {
    inputRef.current.demo(Math.random());
  };

  return (
    <div>
      <Comp data={[]} />
      <RefChild ref={inputRef} />
      <button onClick={onFocus}>Focus</button>

      <Debounce />
      <Tabs />
      <Accordin data={data} />
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

const Accordin = ({ data }) => {
  const [val, setVal] = useState(data);
  const [expand, setExpand] = useState(false);

  const checkIsFolder = (flag) => {};

  if (data.isFolder) {
    return (
      <div>
        {data.items.map((itm) => {
          return (
            <span style={{ display: 'block', padding: '5px' }}>{itm.name}</span>
          );
        })}
      </div>
    );
  } else {
    return (
      <div>
        <span>{data.name}</span>
      </div>
    );
  }
};
