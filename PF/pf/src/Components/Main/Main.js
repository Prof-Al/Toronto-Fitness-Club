import React, { useState } from 'react';
import { homeObjOne, homeObjTwo} from '../InfoSection/Data';
import InfoSection from '../InfoSection';
import Navbar from '../Navbar/index';
import Memberships from '../Memberships';
import SearchSection from '../SearchSection';
import { SearchObjOne} from '../SearchSection/Data';

const Main = () => {
    const[isOpen, setIsOpen] = useState(false);
    
    const toggle = () =>{
        setIsOpen(!isOpen);
    };
    
        return (
            <>

                <Navbar toggle={toggle} />
                <InfoSection {...homeObjOne}/>
                <InfoSection {...homeObjTwo}/>
                <Memberships />
                <SearchSection {...SearchObjOne}/>
                
            </>
        );
};
    

export default Main
