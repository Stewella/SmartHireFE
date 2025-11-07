import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from "axios";
import { SERVICE } from "../../../../config/config";



const DoughnutCandidate = () => {
    const [loading, setLoading] = useState(true);
    const [cndAvail, setCndAvail] = useState([]);
    const [cndNotAvail, setCndNotAvail] = useState([]);
    const [cndHired, setCndHired] = useState([]);
    useEffect(() => {
        if (loading) {
            const getCndData = async () => {
                await axios.get(SERVICE.JAVA_SERVICE + "/candidate/availability/Available").then((response) => {
                    setCndAvail(response.data.data);
                });
                await axios.get(SERVICE.JAVA_SERVICE + "/candidate/availability/Not%20Available").then((response) => {
                    setCndNotAvail(response.data.data);
                });
                await axios.get(SERVICE.JAVA_SERVICE + "/candidate/availability/Hired").then((response) => {
                    setCndHired(response.data.data);
                });
                await setLoading(false);
            };
            getCndData();
        }
    }, [loading]);
    
    
    const data = {
        labels: [
            'Available: '+cndAvail.length,
            'Not Available: '+cndNotAvail.length,
            'Hired: '+cndHired.length
        ],
        datasets: [{
            data: [cndAvail.length, cndNotAvail.length, cndHired.length],
            backgroundColor: [
                '#8dace7',
                '#71deb9',
                '#ef869e'
            ],
            hoverBackgroundColor: [
                '#7097e1',
                '#4dd6a7',
                '#eb6886'
            ],
                  
        }],
        options: { events: [] }
    };


    return (
        <div>
            <Doughnut data={data} options= {data.options} />
        </div>
    )
}


export default DoughnutCandidate
