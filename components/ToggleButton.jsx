'use client'

import {BiMenu} from 'react-icons/bi';

export const ToggleButton = ({toggle}) => {
    return (
        <button
            onClick={() => toggle(prevState => !prevState)}
            className="p-1 rounded-md bg-secondary text-white hover:bg-darker cursor-pointer"
        >
            <BiMenu size={30}/>
        </button>
    )
}
