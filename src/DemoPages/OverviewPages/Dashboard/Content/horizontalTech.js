import React, { useEffect, useState } from "react";
import { HorizontalBar } from "react-chartjs-2";
import axios from "axios";
import { SERVICE } from "../../../../config/config";

const HorizontalTech = () => {
  let label;
  let dataCek;
  var arr =[];
  const [loading, setLoading] = useState(true);
  const [dashboardTech, setDashboardTech] = useState([]);
  const getCndData = async () => {
    await axios
      .post(SERVICE.JAVA_SERVICE + "/dashboard/dashboardTech")
      .then((response) => {
        setDashboardTech(response.data.data);
        setLoading(false);
      });
  };
  useEffect(() => {
    if (loading) {
      getCndData();
    }
  }, [loading]);
  if (dashboardTech) {
    label = dashboardTech.map((item) => item.posisi);
    dataCek = dashboardTech.map((item) => item.jumlah);
    dataCek.push(0);
    const getData = () => {
        for (var i = 0; i < dashboardTech.length; i++) {
        var letters = [
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
        ];
        var color = "#";
        for (var j = 0; j < 6; j++) {
          const a = letters[Math.floor(Math.random() * letters.length)];
          color += a;
          const index = letters.indexOf(a);
          if (index > -1) {
            letters.splice(index, 1);
          }
        }
        arr.push(color)
        //   this.data.datasets[0].backgroundColor[i] = color;
      }
    };
    if (dashboardTech.length !== 0) {
      getData();
    }
  }

  var data = {
    labels: label,
    datasets: [
      {
        label: "Teknologi",
        labelColor:"#FFFFFF",
        backgroundColor: arr,
        // borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        // hoverBackgroundColor: "rgba(255,99,132,0.4)",
        // hoverBorderColor: "rgba(255,99,132,1)",
        borderCapStyle: "round",
        data: dataCek,
      },
    ],
  };

  return (
    <div>
      <HorizontalBar data={data}  />
    </div>
  );
};

export default HorizontalTech;
