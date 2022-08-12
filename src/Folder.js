import React, { useState } from 'react';

const Folder = ({ data }) => {
  const [val, setVal] = useState(data);
  const [expand, setExpand] = useState(false);

  const checkIsFolder = (flag) => {};

  if (data.isFolder) {
    return (
      <div>
        <span onClick={()=>setExpand(!expand)}>{data.name}</span>
        <div style={{display : expand ? 'block' : 'none', paddingLeft : '10px'}}>
        {data.items.map((itm) => {
          return (
            <Folder data={itm}/>
          );
        })}
        </div>
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
export default Folder;
