import React from "react";
import DeleteIcon from '@material-ui/icons/Delete';

function Villager(props) {
  return (
    <div className="villager">
        <div>
          Year of Death: <input type="number" onChange={props.changed} value={props.yearofdeath} name="yearofdeath" />
        </div>
        <div>
            Age of Death: <input type="number" onChange={props.changed} value={props.ageofdeath} name="ageofdeath" />
        </div>
      <button onClick={() => props.onDelete(props.id)}>
          <DeleteIcon />
      </button>
    </div>
  );
}

export default Villager;
