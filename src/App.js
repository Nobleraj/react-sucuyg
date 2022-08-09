import React, { useRef,useState,useEffect, useLayoutEffect, useImperativeHandle } from 'react';
import './style.css';

export default function App() {
  const inputRef = useRef();

  const onFocus = () =>{
    inputRef.current.demo(Math.random());
  }

  return (
    <div>
      <Comp data={[]} />
      <RefChild ref={inputRef}/>
      <button onClick={onFocus}>Focus</button>
    </div>
  );
}

const RefChild = React.forwardRef((props,ref) => {
  const demo = (a) =>{
    alert(a);
  }
  useImperativeHandle(ref,()=>{
    return{
      demo(){
        alert("2")
      }
    }
  },[])
  return(
    <div>
      Ref useImperativeHandle
      <input ref={ref}/>
    </div>
  )
})

const Comp = (props) => {
  const array = props.data;
  const [state, setState] = useState({
    name : '', date : '', data : array
  });
  const [vall, setVall] = useState('');

  const y = (val,v) => {
   console.log(val,v);
  }
  useEffect(()=>{
   y("useeffect",state.data.length);
  },[state.data.length]);

  useLayoutEffect(()=>{
    y("useLayout",state.data.length);
  },[state.data.length]);
  
  const updateState = (newState) =>{
     setState(prev=>{
       return {...prev, ...newState}
     })
  }

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    updateState({[ name ] : value });
  }
  const addHandler = () => {
    let obj = { name : state.name, date : state.date}
    let curr = [...state.data];
    curr.push(obj);
    updateState({ data : curr, name : '', date : '' })
  }
 console.log(state.data);
  return (
    <div>
      <p>Length : {state.data.length}</p>
      <input
        type="text"
        name = "name"
        value={state.name}
        onChange={onChangeHandler}
        placeholder="Name"
      />
      <input
        type="date"
        name = "date"
        value={state.date}
        onChange={onChangeHandler}
        placeholder="Age"
      />
      <button
        onClick={addHandler}
      >
        Add
      </button>

      <div>
        <span>List</span>
        <ul>
          {state.data.map((val,i) => {
            return (
              <li key={i}>
                {val.name} {val.date} <button onClick={()=>{
                  state.data.splice(i,1);
                  updateState({ data : state.data });
                }}>Del</button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
