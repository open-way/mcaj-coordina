import { Component, OnInit } from '@angular/core';
import { EstadisticaService } from 'src/app/providers/event/estadistica.service';
import { RegistryService } from 'src/app/providers/event/registry.service';
import { map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

import { EChartOption } from 'echarts';

// interface initOpts {{ '{' }}
// devicePixelRatio ?: number,
//   renderer ?: string,
//   width ?: number | string,
//   height ? number | string,
// }

@Component({
  selector: 'mcaj-estadistica-main',
  templateUrl: './estadistica-main.component.html',
  styleUrls: ['./estadistica-main.component.scss']
})
export class EstadisticaMainComponent implements OnInit {
  public registros: any[];
  public estadisticas: any[];
  public chartOption: any;
  public registroControl = new FormControl('');

  public nameSerie: string;

  constructor(private estadisticaService: EstadisticaService, private registryService: RegistryService) { }

  ngOnInit() {
    this.loadMasters();
    this.subcribeRegistroControl();
  }

  private loadMasters() {
    this.registryService.getAll$()
      .pipe(map(res => res.data))
      .subscribe(response => {
        this.registros = response;
      });
  }

  private clearAll() {
    this.estadisticas = [];
    this.chartOption = { ...[] };
  }

  private subcribeRegistroControl() {
    this.registroControl.valueChanges.subscribe(res => {
      if (res === '') {
        this.clearAll();
        return;
      }
      this.nameSerie = (this.registros.find(ress => ress.registry_id = res)).name;
      this.getEstadisticas(res);
    });
  }

  private getEstadisticas(registroId) {
    this.estadisticaService.getById$(registroId)
      .pipe(map(res => res.data))
      .subscribe(response => {
        this.estadisticas = response;
        this.prepareData(this.estadisticas);
      });
  }

  private prepareData(estadisticas) {
    const categorias = estadisticas.map(res => res.name);
    const values = estadisticas.map(res => res.value);
    this.chartOption = {
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: [...categorias],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [{
        type: 'value'
      }],
      series: [
        {
          name: this.nameSerie,
          type: 'bar',
          barWidth: '60%',
          data: [...values]
        }
      ]
    };
  }

  // initOpts = {
  //   renderer: 'svg',
  //   width: 300,
  //   height: 300
  // };


}
