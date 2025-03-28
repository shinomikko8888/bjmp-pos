import React from 'react'

export default function PatchNotesBlock(props){
    const {notes} = props
    return (
        <>
            {notes.map(note => (
                <>
                    <label><b>Version {note.version}</b></label>
                    <ul className='list-none text-muted'>
                        {note.changes.map(change => (
                                <li>
                                    {change}
                                </li>
                            
                        ))}
                    </ul>
                </>
            ))}
        </>
    )
}
