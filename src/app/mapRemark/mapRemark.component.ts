import { Component, OnInit} from '@angular/core';
import { MapRemarkService } from './mapRemark.service';

@Component({
  selector: 'app-root',
  templateUrl: './mapRemark.component.html',
  providers: [ MapRemarkService ]
})
export class MapRemarkComponent implements OnInit {
  title: string = 'Landing remark';
  lat:number;
  lng:number;
  selectedMarker;
  display='none';
  markers = [];
  notes:string;
  username:string;
  statusMessage:string;
  searchText:string;

  constructor(public _mapRemarkService : MapRemarkService){
    if (navigator)
    {
    navigator.geolocation.getCurrentPosition( pos => {
        this.lng = +pos.coords.longitude;
        this.lat = +pos.coords.latitude;
        this.addMarker(this.lat,this.lng)
      });
    }
  }

  ngOnInit() {
    this.getAllMarkers();
  }

  getAllMarkers() {
    this._mapRemarkService.getAllMarkers()
        .subscribe(data => {
        	this.markers = data;
          console.log(this.markers);
        },
        error => {
            this.statusMessage =
                'Problem with the service. Please try again after sometime'
    });
  }

  addMarker(lat: number, lng: number) {
    this.markers.push({ lat, lng, alpha: 1 });
  }

  selectMarker(event) {
    let selected_marker = this.markers.filter((data)=>{
      if('username' in data && 'notes' in data){
        return data.lat == event.latitude && data.lng == event.longitude;
      }
    });
    if(selected_marker.length) {
      this.selectedMarker = selected_marker[0];
    }
    else {
      this.openModal();
      this.lat = event.latitude;
      this.lng = event.longitude;
    }
  }

  openModal() {
    this.display='block';
  }

  onCloseHandled() {
      this.display='none';
  }

  save() {
    this.selectedMarker = {
      lat: this.lat,
      lng: this.lng,
      username: this.username,
      notes: this.notes
    };

    this._mapRemarkService.addMarker(this.selectedMarker)
        .subscribe(data => {
          this.display='none';
          this.markers.push(this.selectedMarker);
        },
        error => {
            this.statusMessage =
                'Problem with the service. Please try again after sometime'
    });
  }
  search(){
    this.markers = this.markers.filter((data)=>data.username == this.searchText || data.notes == this.searchText)
  }
}
