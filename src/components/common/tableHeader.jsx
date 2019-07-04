import React, { Component } from 'react';

class TableHeader extends Component {
    handleSort=path=>{
        const sortColumn={...this.state.sortColumn};
        if(sortColumn.path===path)
          sortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc'
          else {
              sortColumn.path = path;
              sortColumn.order = "asc";
          }
        this.setState({sortColumn});           

    };
    render() { 
        return ( <thead>
            <tr>
               {this.props.columns.map(column=>(
               <th  key={column.path || column.key} onClick ={()=> this.handleSort(column.path)} >
               {column.label}</th>
                ))} 
            </tr>
        </thead>  );
    }
}
 
export default TableHeader;