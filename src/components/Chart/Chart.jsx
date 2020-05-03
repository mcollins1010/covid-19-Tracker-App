import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';


import { fetchDailyData } from '../../api';

import styles from './Chart.module.css';

const Chart = ({ data: { confirmed, deaths, recovered }, country }) => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData())
        }


        fetchAPI();
        //[] below, makes the useEffect happen only once like a componentDidMount() 
        // else u will be having continueous data coming in.
    }, []);

    const lineChart = (
        dailyData.length
            ? (
                <Line
                    data={{
                        labels: dailyData.map(({ date }) => date),
                        datasets: [{
                            data: dailyData.map(({ confirmed }) => confirmed),
                            label: 'Infected',
                            borderColor: '#3333ff',
                            fill: true,
                        }, {
                            data: dailyData.map(({ confirmed }) => confirmed),
                            label: 'Deaths',
                            borderColor: '#red',
                            backgroundColor: 'rgba(250, 0, 0 , 0.5)',
                            fill: true,
                        }],
                    }}
                />) : null
    );

    //console.log(confirmed, deaths, recovered)

    const barChart = (
        confirmed
            ? (
                <Bar
                    data={{
                        labels: ['Infected', ' Recovered', 'Deaths'],
                        datasets: [{
                            label: 'People',
                            backgroundColor: [
                                'rgba(0, 0, 255, 0.5)',
                                'rgba(0, 255, 0, 0.5)',
                                'rgba(255, 0, 0 , 0.5)',
                            ],
                            data: [confirmed.value, recovered.value, deaths.value]
                        }]

                    }}
                    options={{
                        legend: { display: false },
                        title: { display: true, text: `Current state in ${country}` },
                    }}
                />
            ) : null
    );
    // in return, use tenary operator to display ctry(bar) or global(line)  
    return (
        <div className={styles.container}>

            {country ? barChart : lineChart}
        </div>
    )

}

export default Chart;