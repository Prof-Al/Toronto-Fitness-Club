import React from 'react';
import PickDateOfClass from './Canlendar'
import BookDrivingSlot from './ListClasses'

function Classes() {

    
    return (
        <div className="App">
            <PickDateOfClass />
        <hr className="k-my-8" />
            <BookDrivingSlot />
        </div>
    );
};
    

export default Classes