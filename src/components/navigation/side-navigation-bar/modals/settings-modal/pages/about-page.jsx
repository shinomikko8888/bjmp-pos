import React, { version } from 'react'
import PatchNotesBlock from '../components/patch-notes-block'

export default function AboutSettings(props) {
    const {} = props
    const patchNotes = [
        {
            version: '1.1.4',
            changes: [
                'Added print functionality in Profile Page (Print for tables soon)',
                'Adjusted IDs in backend',
                'Removed email in receipt'
            
            ]
        },
        {
            version: '1.1.3',
            changes: [
                'Re-added biometric functionality',
                'Fixed more bugs that are related to ID errors'
            ]
        },
        {
            version: '1.1.2',
            changes: [
                'Fixed bug on adding and editing issues for table entries',
                'Fixed bug that are related to ID errors',
                'Fixed bug that is related to the BJMP Branch and account types'
            ]
        },
        {  
            version: '1.1.1',
            changes: [
                'Partially re-added Settings Modal functionality',
                'Re-added Account Modification.',
                'Re-added biometric Integration',
                'Fixed bug on displaying ID in the changelog tab',
                'Fixed bug on purchasing an item with insufficient balance',
                'Changed all terms of "branch" to "unit"'
            ],
        },
        {
            version: '1.1.0',
            changes: [
                'Refactored code for the whole site',
                'Added profit tracing',
                'Added changelogs',
                'Fixed receipt layout for both Load and Purchase receipts',
                'Changed majority of Chart layouts',
                'Removed majority of features and will be re-added in a future update'
            ],
        },
        {
            version: '1.0.2',
            changes: [
                'Hotfix on Checkout List component'
            ],
        },
        {
            version: '1.0.1',
            changes: [
                'Bugfix on List of Lenders component',
                'Bugfix on the way images are displayed'
            ],
        },
        {
            version: '1.0.0',
            changes: [
                'Initial release'
            ],
        }
    ]
    return (
        <>
            <div className='row g-3 align-items-center'>
                <label htmlFor="change-email" className="col-form-label p-0">Bureau of Jail Management and Penology Region III - Point of Sales v1.1.0</label>
                <label htmlFor="change-email" className="col-form-label m-0 p-0 mb-2">This website was developed for a capstone project by a team 
                    from Bulacan State University, later picked up by the team leader to continue as an individual project</label>
            </div>
            <div className="patch-notes-block">
                <PatchNotesBlock notes={patchNotes} />
            </div>
        </>
    )
}
