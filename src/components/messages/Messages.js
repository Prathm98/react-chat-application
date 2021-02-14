import React, { Fragment } from 'react'

const Messages = () => {
  return (
    <Fragment>      
      <div className="row card channel-heading">
        <div className="col l6 s12 m4">
          Channel <i className="material-icons">star_border</i>
        </div>
        <div className="col l6 s12 m8">
          <div className="col l10 s10 m10">
            <input type="text" placeholder="Search messages..." />
          </div>
          <div className="col l2 s2 m2">
            <i className="material-icons" style={{paddingTop: '15px'}}>search</i>
          </div>
        </div>          
      </div>
      <div className="row" style={{maxHeight: '500px', overflowY:'scroll'}}>
        <div className="card" style={{height: '400px'}}></div>
        <div className="card" style={{height: '400px'}}></div>
        <div className="card" style={{height: '400px'}}></div>
      </div>
    </Fragment>
  )
}

export default Messages;
