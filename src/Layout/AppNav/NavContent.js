export const dashboard =
    {
        icon: 'pe-7s-map',
        label: 'Dashboard',
        content: []
    }

export const master =
    {
        icon: 'pe-7s-browser',
        label: 'Master',
        content: []
    }

export const pvbCandidate =
    {
        label: 'Candidate',
        to: '#/overview/dashboard',
    }

export const pvbHistOp =
    {
        label: 'History Opti',
        to: '#/overview/opti',
    }

export const pvbHistDet =
    {
        label: 'History Detail Kebutuhan',
        to: '#/overview/detkebhist',
    }

export const pvmIndustri =
    {
        label: 'Industry',
        to: '#/master/industry',
    }

export const pvmPosisi =
    {
        label: 'Posisi',
        to: '#/master/posisi',
    }

export const pvmStep =
    {
        label: 'Step',
        to: '#/master/step',
    }

export const pvmService =
    {
        label: 'Service',
        to: '#/master/service',
    }

export const pvmSales =
    {
        label: 'Sales',
        to: '#/master/sales',
    }


export const pvmClient =
    {
        icon: 'pe-7s-portfolio',
        label: 'Client',
        to: '#/overview/client',
    }

export const pvmCandidate =
    {
        icon: 'pe-7s-users',
        label: 'Candidate',
        to: '#/overview/candidate',
    }

export const pvtPlot =
    {
        icon: 'pe-7s-share',
        label: 'Plotting',
        to: '#/overview/plotting',
    }

export const pvmUser =
    {
        icon: 'pe-7s-share',
        label: 'User',
        to: '#/master/user',
    }

//menu independen
export const menuIndependen = {
    "pvm_client": pvmClient,
    "pvm_candidate": [pvmCandidate, pvmUser],
    "pvt_plot": pvtPlot
}
export const menuKeys = Object.keys(menuIndependen)
export const menuValues = Object.values(menuIndependen)


//menu dashboard
export const menuDashboard = {
    "pvb_candidate": pvbCandidate,
    "pvb_hist_op": pvbHistOp,
    "pvb_hist_det": pvbHistDet
}
export const dashKeys = Object.keys(menuDashboard)
export const dashValues = Object.values(menuDashboard)


//menu master
export const menuMaster = {
    "pvm_industri": pvmIndustri,
    "pvm_posisi": pvmPosisi,
    "pvm_step": pvmStep,
    "pvm_service": pvmService,
    "pvm_sales": pvmSales
}
export const masterKeys = Object.keys(menuMaster)
export const masterValues = Object.values(menuMaster)