import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
function avg(array) {
    var sum = 0;
    var count = array.length;
    for (var i = 0; i < count; i++) {
        sum = sum + array[i];
    }
    return sum / count;
}
export default class Chart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
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
            avg: 0,
            N:10
        }
    }
    componentWillReceiveProps(nextProps) {

    
        if (nextProps.UserAchivment != this.props.UserAchivment) {


            this.state.data.datasets[0].data = [];
            this.state.data.datasets[1].data = [];

            nextProps.UserAchivment.forEach(x => {
                var arrR = x.split('/');
                var res = parseInt(arrR[0]);
                var err = parseInt(arrR[1]);

                this.state.data.datasets[0].data.push(res);
                this.state.data.datasets[1].data.push(err);

            });

             var len=this.state.data.datasets[0].data.length
             var lastN=  this.state.data.datasets[0].data.slice(Math.max(0, len - this.state.N), len);
            this.state.avg = avg(lastN);

            this.setState({ data: this.state.data });
        }
        var chart = this.refs.chart.chartInstance;
        chart.update();
        const { datasets } = this.refs.chart.chartInstance.data
        console.log(datasets[0].data);

    }

    componentDidMount() {
          for (var i = 0; i < 100; i++) {
                this.state.data.labels.push(i);
            }
    }

    render() {
        return (
            <div>
                <h2>Среднее значение за поледние {this.state.N} попыток  {this.state.avg}</h2>
                <Bar ref="chart" data={this.state.data} />
            </div>
        );
    }

    //componentDidMount() {
    //    const { datasets } = this.refs.chart.chartInstance.data
    //    console.log(datasets[0].data);
    //}
}