import * as echarts from 'echarts/core';
import { EChartsOption } from 'echarts';
import { LineChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { Component, Input, OnInit } from '@angular/core';
echarts.use([LineChart, CanvasRenderer]);

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  @Input() data: any;
  chartOptions: EChartsOption = {};

  ngOnInit(): void {
    const transformedData = this.transformData(this.data);
    this.initChart(transformedData);
  }

  initChart(data: any){
    const dateList = data.map(function (item: any[]) {
      return item[0];
    });

    const valueList = data.map(function (item: any[]) {
      return item[1];
    });

    this.chartOptions = {
      visualMap: [
        {
          show: false,
          type: 'continuous',
          seriesIndex: 0,
          min: 0,
          max: 1000
        }
      ],
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          const param = params[0];
          return `<div class="pastel web-font">Ngày: <span class="fw-bold">${param.axisValue}</span><br/>
          Doanh thu: <span class="fw-bold">${this.formatCurrency(param.data)}</span>
          </div>`;
        } 
      },
      xAxis: [
        {
          data: dateList,
        }
      ],
      yAxis: [
        {
          axisLabel: {
            formatter: (value: number) => this.formatCurrency(value)
          }
        }
      ],
      series: [
        {
          type: 'line',
          showSymbol: false,
          data: valueList
        }
      ]
    }
  }

  transformData(data: any[]): any[] {
    return data.map(item => [item.date.split('T')[0], item.totalRevenue]);
  }

  formatCurrency(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '₫';
  }
}



