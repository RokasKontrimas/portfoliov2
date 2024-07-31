import React from 'react'
import {HashLink} from 'react-router-hash-link';


const NavigationComponent = ({sections, clickLink, isActive}) => {
    return (
        <header style={{position: "sticky", top: 0, height: "auto", width: "100%", zIndex: 100}}>
            <nav style={{display: "flex", flexWrap: "wrap"}}>
                {sections.map(({id}) => (
                    <ul key={id}>
                        <HashLink
                            onClick={(e) => clickLink(e, id)}
                            className={isActive(id)}
                            smooth
                            to={`#${id}`}
                            data-link={id}
                        >
                            {id.charAt(0).toUpperCase() + id.slice(1)}
                        </HashLink>
                    </ul>
                ))}
            </nav>
        </header>
    )
}
export default NavigationComponent
