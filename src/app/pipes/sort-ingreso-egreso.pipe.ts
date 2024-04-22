import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgresoModel } from '../models/ingreso-egreso.model';

@Pipe({
  name: 'sortIngresoEgreso'
})
export class SortIngresoEgresoPipe implements PipeTransform {

  transform(items: IngresoEgresoModel[]): IngresoEgresoModel[] {
    return items.slice().sort((a, b) => b.tipo.localeCompare(a.tipo));
  }

}
