import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

export default class Chart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data : {
                labels: [],
                datasets: [{
                    label: 'Results',
                    backgroundColor: '#0079ff',
                    data: []
                },
                {
                    label: 'Errors',
                    backgroundColor: '#f87979',
                    data: []
                },
                ]
            },
            d:0
        }
    }
    componentWillReceiveProps(nextProps) {
    const result = ['55/3','57/3','99/73','97/13'];
  //  console.log(result);
    result.forEach(x => {
        var arrR = x.split('/');
        var res = parseInt(arrR[0]);
        var err = parseInt(arrR[1]);

        this.state.data.datasets[0].data.push(res);
        this.state.data.datasets[1].data.push(err);

    });
    for (var i = 0; i < 100; i++) {
        this.state.data.labels.push(i);
    }

    this.setState({ d: 0 });
       
    }


    render() {
        return (
            <div>
                <h2>Line Example</h2>
                <Bar ref="chart" data={this.state.data} />
            </div>
        );
    }

    //componentDidMount() {
    //    const { datasets } = this.refs.chart.chartInstance.data
    //    console.log(datasets[0].data);
    //}
}