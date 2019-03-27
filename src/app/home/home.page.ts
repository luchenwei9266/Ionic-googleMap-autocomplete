/// <reference types="@types/googlemaps" />
import { Component, ViewChild, OnInit, AfterViewInit , NgZone } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {
	@ViewChild('addresstext') addresstext: any;

	public adressType: string;
	public autocompleteInput: string;

	constructor(
		private _ngZone: NgZone
	) {}

	ngOnInit() {
	}

	ngAfterViewInit() {
		setTimeout(() => {
			this.getPlaceAutocomplete();
		},1000);
	}

	private getPlaceAutocomplete() {
			let ele = document.getElementById('addresstext').getElementsByTagName('input')[0];
			// let ele = this.addresstext.nativeElement;
			const autocomplete = new google.maps.places.Autocomplete(ele,
				{
					// googlemap set country
						componentRestrictions: { country: 'CN' },
						types: [this.adressType]  // 'establishment' / 'address' / 'geocode'
				});
			google.maps.event.addListener(autocomplete, 'place_changed', () => {
				const place = autocomplete.getPlace();
				this.autocompleteInput = place.formatted_address;
				this._ngZone.run(()=>{});
			});
	}
}
