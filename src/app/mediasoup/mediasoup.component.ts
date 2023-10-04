import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators, FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {MediasoupserverService} from "../services/mediasoupserver.service";
import {ErrorStateMatcher} from "@angular/material/core";

export class FormErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

@Component({
  selector: 'app-mediasoup',
  templateUrl: './mediasoup.component.html',
  styleUrls: ['./mediasoup.component.scss']
})

export class MediasoupComponent implements OnInit {
  configForm: FormGroup;
  matcher = new FormErrorStateMatcher();

  constructor(private fb: FormBuilder,
              private mediasoupserverService: MediasoupserverService) {
  }

  ngOnInit() {
    this.configForm = this.fb.group({
      configs: this.fb.array([])
    });

    this.loadConfigs();
  }

  get configs() {
    return this.configForm.get('configs') as FormArray;
  }

  loadConfigs() {
    this.mediasoupserverService.getConfig().subscribe(servers => {
      for (let server of servers) {
        const config = this.fb.group({
          url: [server.url, [Validators.required,
            Validators.pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,63}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/)
          ]],
          username: [server.username, [Validators.required]],
          password: [server.password, [Validators.required]],
          maxNumberOfSessions: [server.maxNumberOfSessions, [Validators.required]],
          id: [server.id, Validators.required],
          active: [server.active]
        });
        this.configs.push(config);
      }
    });
  }

  addConfig() {
    const config = this.fb.group({
      url: ['', [Validators.required,
        Validators.pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,63}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/)]
      ],
      username: ['', Validators.required],
      password: ['', Validators.required],
      maxNumberOfSessions: ['', Validators.required],
      active: [true]
    });
    this.configs.push(config);
  }

  deleteConfig(index: number) {
    const configId = this.configs.at(index).get('id').value;
    if (configId) {
      this.mediasoupserverService.delete(configId).subscribe(() => {
        this.configs.removeAt(index);
      });
    } else {
      this.configs.removeAt(index);
    }
  }

  save(index: number) {
    const values = this.configs.at(index).value

    if (values.id) {
      const configId = this.configs.at(index).get('id').value;
      this.mediasoupserverService.update(configId, values).subscribe(updatedConfig => {
        this.configForm = this.fb.group({
          configs: this.fb.array([])
        });
        this.loadConfigs();
      });
    } else {
      this.mediasoupserverService.create(values).subscribe(newConfig => {
        this.configForm = this.fb.group({
          configs: this.fb.array([])
        });
        this.loadConfigs();
      });
    }
  }
}
