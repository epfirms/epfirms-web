import { Component, OnInit } from '@angular/core';
import {Chart, ChartType} from 'chart.js';
import { ChartConfiguration, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale} from 'chart.js'


@Component({
  selector: 'app-referral-stats',
  templateUrl: './referral-stats.component.html',
  styleUrls: ['./referral-stats.component.scss']
})
export class ReferralStatsComponent implements OnInit {

  linechartType : ChartType = 'line';
  labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
  ];

  data = {
    labels: this.labels,
    datasets: [{
      label: 'My First dataset',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [0, 10, 5, 2, 20, 30, 45],
    }]
  };

  config = {
    type: this.linechartType,
    data: this.data,
    options: {}
  };
  constructor() {
    Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);
   }

  ngOnInit(): void {
    const ctx = document.getElementById('chart') as HTMLCanvasElement;
    const myChart = new Chart(
     ctx, 
      this.config
    );
  }

}
