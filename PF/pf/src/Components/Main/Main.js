import React, { useState } from 'react';
import { homeObjOne} from '../InfoSection/Data';
import InfoSection from '../InfoSection';

const Main = () => {
    const[isOpen, setIsOpen] = useState(false);
    
    const toggle = () =>{
        setIsOpen(!isOpen);
    };
    
        return (
            <>
                 <InfoSection {...homeObjOne}/>
            </>
        );
};
    

export default Main
