export const MainNav = [
    {
        icon: 'pe-7s-map',
        label: 'Dashboard',
        content: [
            {
                label: 'Candidate',
                to: '#/overview/dashboard',
            },
            {
                label: 'History Opti',
                to: '#/overview/opti',
            },
            {
                label: 'History Detail Kebutuhan',
                to: '#/overview/detkebhist',
            }
        ]
    },
    {
        icon: 'pe-7s-portfolio',
        label: 'Client',
        to: '#/overview/client',
    },
    {
        icon: 'pe-7s-share',
        label: 'Plotting',
        to: '#/overview/plotting',
    },
    {
        icon: 'pe-7s-light',
        label: 'History Candidate',
        to: '#/overview/opti',
    },
    {
        icon: 'pe-7s-browser',
        label: 'Master',
        content: [
            {
                label: 'Industry',
                to: '#/master/industry',
            },
            {
                label: 'Posisi',
                to: '#/master/posisi',
            },
            {
                label: 'Step',
                to: '#/master/step',
            },
            {
                label: 'Service',
                to: '#/master/service',
            },
            {
                label: 'Sales',
                to: '#/master/sales',
            },
        ],
    },
];
