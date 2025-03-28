export const REASONS = [
    {
        action: 'Archive',
        content: [
            {
                type: 'User',
                reasons: [
                    'Inactive account.',
                    'Suspicious activity.',
                    'Violation of BJMP protocols.',
                ]
            },
            {
                type: 'PDL',
                reasons: [
                    'Completion of sentence',
                    'Duplicate instance',
                ]
            },
            {
                type: 'Item',
                reasons: [
                    'Outdated information',
                    'Obsolete product',
                    'Duplicate instance',
                    'Supplier unavailability',
                ]
            },
            
        ]
    },
    {
        action: 'Retrieve',
        content: [
            {
                type: 'PDL',
                reasons: [
                    'Re-evaluation of sentence',
                    'Legal reasons',
                ]
            },
            {
                type: 'Item',
                reasons: [
                    'Customer demand',
                    'Supplier availability',
                ]
            },
        ]
    },
    {
        action: 'Delete',
        content: [
            {
                type: 'Instance',
                reasons: [
                    'Excess inventory',
                    'Damage or defect',
                ]
            },
        ]
    },
]