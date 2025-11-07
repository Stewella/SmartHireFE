import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts'
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
    options4: {
      chart: {
        id: 'donutcandidate'
      },
      labels: ['Available', 'Not Available', 'Hired'],
    },
    series4: [cndAvail.length, cndNotAvail.length, cndHired.length],
  }


  return (
    <div className="donut text-center">
      <Chart options={data.options4} series={data.series4} type="donut" width="50%" />
    </div>
  );
}


export default DoughnutCandidate;
