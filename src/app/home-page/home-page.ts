import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { log } from 'console';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
  cityName: string ='';
  temp: string = '';
  city: string = '';
  humidity: string = '';
  wind: string = '';
  constructor(private cdr: ChangeDetectorRef, private zone: NgZone) { }
  isDataLoaded: boolean = false;
  isLoading: boolean = false;
  weatherCondition: string = '';
  tempCity:string='';
  async search() {
    if (!this.cityName.trim()) return;
    this.isLoading = true;
    this.isDataLoaded = false;
    this.tempCity=this.cityName.substring(0,this.cityName.length-1);
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=54af6d40046a4b998da211253262103&q=${this.tempCity}`);
      if (!response.ok) {
        console.error('API error:', response.status);
        return;
      }
      const data = await response.json();
      console.log(data);


      this.zone.run(() => {
        this.city = data.location.name;
        this.temp = data.current.temp_c;
        this.wind = data.current.wind_kph;
        this.humidity = data.current.humidity;
        this.weatherCondition = data.current.condition.text;

        this.isDataLoaded = true;
        this.isLoading = false;
      });
    }
    catch (error) {
    this.zone.run(() => {
      this.isLoading = false;
    });
    console.error(error);
  } finally {
      this.isLoading = false;

      this.cdr.detectChanges();

    }

  }
}
