import React from 'react';
import { Button } from 'react-bootstrap';

const Pagination = ({ pages, currentPage, changePage }) => {
  return (
    <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
      {
          (pages.length == 0 || currentPage == 1)?<></>:
          <Button key="<" variant="outline-primary" onClick={()=>changePage(currentPage - 1)}>{"<"}</Button>
      }
      &nbsp;
      {
          (pages.length == 0)
          ?
          <></>
          :
          <>{pages.map((result, index)=>{
              return <Button key={"pageButton" + index} variant={result==currentPage?'primary' : 'outline-primary'} style= {{margin : '0 5px'}}onClick={()=>changePage(result)}>{result}</Button>
          })}</>
      }
      &nbsp;
      {
          (pages.length == 0 || currentPage == pages.length)?<></>:
          <Button key=">" variant="outline-primary" onClick={()=>changePage(currentPage + 1)}>{">"}</Button>
      }
  </div>
  );
};

export default Pagination;
