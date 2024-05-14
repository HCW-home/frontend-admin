import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { SettingsService } from '../services/settings.service';

export interface Settings {
  id: string;
  order: number;
  prefix: string;
  provider: string;
  isWhatsapp: boolean;
  isDisabled: boolean;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})


export class SettingsComponent implements OnInit {
  settings: Settings[] = [];
 separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private settingsService: SettingsService) {}

  ngOnInit() {
    this.getSettings();
  }

  getSettings() {
    this.settingsService.getSmsProviders().subscribe({
      next: data => {
        this.settings = data.sort((a, b) => a.order - b.order);;
      }, error: (err) => {
        console.log(err, 'err');
      }
    });
  }

  drop(event: CdkDragDrop<Settings[]>) {
    moveItemInArray(this.settings, event.previousIndex, event.currentIndex);
    this.updateOrders();
  }

  add(event: MatChipInputEvent, setting: any): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      setting.prefix = setting.prefix ? setting.prefix + ',' + value.trim() : value.trim();
      this.updateSetting(setting);
    }

    if (input) {
      input.value = '';
    }
  }

  remove(prefix: string, setting: any): void {
    const prefixes = setting.prefix.split(',');
    const index = prefixes.indexOf(prefix);

    if (index >= 0) {
      prefixes.splice(index, 1);
      setting.prefix = prefixes.join(',');
      this.updateSetting(setting);
    }
  }

  updateSetting(setting: Settings): void {
    this.settingsService.updateSetting(setting).subscribe(
      response => {
        console.log('Update successful', response);
      },
      error => {
        console.error('Error updating setting', error);
      }
    );
  }

  updateOrders(): void {
    const updates = this.settings.map((setting, index) => ({
      id: setting.id,
      order: index
    }));

    this.settingsService.updateSettingsOrders(updates).subscribe(
      response => console.log('All orders updated successfully'),
      error => console.error('Failed to update orders', error)
    );
  }

}
