import { Pipe, PipeTransform } from '@angular/core';
import { NameMapService } from '../../core/name-map.service';

@Pipe({
  name: 'codename',
  standalone: true
})
export class CodenamePipe implements PipeTransform {
  constructor(private service: NameMapService) {}

  transform(value: string): string {
    const mapping = this.service['mappingsSubject'].value.find(m => m.realName === value);
    return mapping ? mapping.codeName : value;
  }
}
