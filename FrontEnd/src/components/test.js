import React from 'react';


function Test() {
    return (
        <div style={{ position: 'relative'}}>
            <div style={{backgroundColor: '#f0f0f0', padding: '20px'}}>Main Content</div>
            <div style={{position: 'absolute', top: '0', left: '0', backgroundColor: 'black', color: 'white', padding: '10px'}}>Overlay Content</div>
        </div>
    );
}

export default Test;
