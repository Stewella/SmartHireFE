import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts'
import axios from "axios";
import { SERVICE } from "../../../../config/config";

const ColumnStatusPerMonth = () => {
    const [loading, setLoading] = useState(true);
    const [dashboardStatusPerMonth, setDashboardStatusPerMonth] = useState([]);
    const getCndData = async () => {
        await axios.post(SERVICE.JAVA_SERVICE + "/dashboard/dashboardStatusPerMonth").then((response) => {
            setDashboardStatusPerMonth(response.data.data);
            setLoading(false)
        });
    };
    const available = dashboardStatusPerMonth.map((item) =>(
        item.available?item.available:0
    ))
    const notAvailable = dashboardStatusPerMonth.map((item) =>(
        item.notAvailable?item.notAvailable:0
    ))
    const hired = dashboardStatusPerMonth.map((item) =>(
        item.hired?item.hired:0
    ))
    
    useEffect(() => {
        if (loading) {
            getCndData();
        }
    }, [loading]);

    const data = {
        options55: {
            chart: {
                height: 20,
                type: 'bar',
            },
            legend: {
                show: true,
                showForSingleSeries: false,
                showForNullSeries: true,
                showForZeroSeries: true,
                position: 'bottom',
                horizontalAlign: 'center', 
                floating: false,
                fontSize: '12px',
                fontFamily: 'Helvetica, Arial',
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    endingShape: 'rounded',
                    columnWidth: '50%',
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent=']
            },
            xaxis: {
                categories: ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct','Nov','Dec'],
            },
            yaxis: {
                title: {
                    text: 'Person'
                }
            },
            fill: {
                opacity: 1

            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val + " person"
                    }
                }
            }
        },
        series55: [{
            name: 'Available',
            data: available
        }, {
            name: 'Not Available',
            data: notAvailable
        }, {
            name: 'Hired',
            data: hired
        }],
    }



    return (
        <div className="column">
            <Chart options={data.options55} series={data.series55} type="bar" width="100%"/>
        </div>
    );
}


export default ColumnStatusPerMonth;
