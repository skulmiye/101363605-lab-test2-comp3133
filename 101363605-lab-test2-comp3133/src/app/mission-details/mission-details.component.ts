import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../network/data.service';
import { MissionDetails } from '../models/details.interface';

@Component({
  selector: 'app-mission-details',
  templateUrl: './mission-details.component.html',
  styleUrls: ['./mission-details.component.css']
})


export class MissionDetailsComponent implements OnInit {
  missionDetails: MissionDetails | undefined;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const missionId = params.get('id');
      if (missionId) {
        this.dataService.getMissionDetails(missionId).subscribe({
          next: (details: MissionDetails) => {
            this.missionDetails = details;
          },
          error: (error) => {
            console.log('Details:', missionId),
            console.error('Error fetching mission details:', error);
          }
        });
      }
    });
  }
}

