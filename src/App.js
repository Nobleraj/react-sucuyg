import React, { useState } from 'react';
import './style.css';

export default function App() {
  return (
    <div>
      <Comp data={[]} />
    </div>
  );
}

const Comp = (props) => {
  const array = props.data;
  const [data, setData] = useState(array);
  const [val, setVal] = useState('');
  const [vall, setVall] = useState('');

  return (
    <div>
      <input
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder="Name"
      />
      <input
        value={vall}
        onChange={(e) => setVall(e.target.value)}
        placeholder="Age"
      />
      <button
        onClick={() => {
          setData([...data, { name: val, age: vall }]);
          setVal('');
          setVall('');
        }}
      >
        Add
      </button>

      <div>
        <span>List</span>
        <ul>
          {data.map((val,i) => {
            return (
              <li>
                {val.name} {val.age} <button onClick={()=>{
                  data.splice(i,1);
                  setData([...data]);
                }}>Del</button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
