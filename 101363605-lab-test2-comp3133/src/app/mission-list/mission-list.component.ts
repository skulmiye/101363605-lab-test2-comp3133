import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../network/data.service';
import { Launch } from '../models/launch.interface';

@Component({
  selector: 'app-mission-list',
  templateUrl: './mission-list.component.html',
  styleUrls: ['./mission-list.component.css']
})


export class MissionListComponent implements OnInit {
  launches: Launch[] = [];
  filteredLaunches: Launch[] = [];
  selectedFilters: { year: string, launchStatus: boolean | null, landingStatus: boolean | null } = { year: '', launchStatus: null, landingStatus: null };
  years: string[] = [];
  maxFilters = 3;
  

  constructor(
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.loadLaunches();
    this.populateYears();
  }

  loadLaunches(): void {
    this.dataService.getLaunches().subscribe(data => {
      this.launches = data;
      this.filteredLaunches = this.launches;
    });
  }

  populateYears(): void {
    const currentYear = new Date().getFullYear();
    for (let year = 2006; year <= 2020; year++) {
      this.years.push(year.toString());
    }
  }

  applyFilters(): void {
    this.filteredLaunches = this.launches.filter(launch =>
      (!this.selectedFilters.year || launch.launch_year === this.selectedFilters.year) &&
      (this.selectedFilters.launchStatus === null || launch.launch_success === this.selectedFilters.launchStatus) &&
      (this.selectedFilters.landingStatus === null || this.checkLandingSuccess(launch) === this.selectedFilters.landingStatus)
    );
  }
  
  checkLandingSuccess(launch: Launch): boolean {
    const cores = launch.rocket?.first_stage?.cores;
    if (cores) {
      return cores.some(core => core.land_success === true);
    }
    return false;
  }

  updateFilters(type: string, value: string | boolean): void {
    if (type === 'year') {
      this.selectedFilters.year = value as string;
    } else if (type === 'launch') {
      this.selectedFilters.launchStatus = value as boolean;
    } else if (type === 'landing') {
      this.selectedFilters.landingStatus = value as boolean;
    }
    this.applyFilters();
  }

  resetFilter(): void {
    this.selectedFilters = { year: '', launchStatus: null, landingStatus: null };
    this.filteredLaunches = this.launches;
  }

  canSelectFilter(type: string, value: string | boolean): boolean {
    // Check if adding the new filter will exceed the maximum allowed filters
    let count = 0;
    if (this.selectedFilters.year) count++;
    if (this.selectedFilters.launchStatus !== null) count++;
    if (type === 'landing') {
      return count < this.maxFilters || (this.isSelectedFilter('landing', value) && value === false);
    }
    return count < this.maxFilters || this.isSelectedFilter(type, value);
  }

  isSelectedFilter(type: string, value: string | boolean): boolean {
    // Check if the filter is already selected
    if (type === 'year') {
      return this.selectedFilters.year === value;
    } else if (type === 'launch') {
      return this.selectedFilters.launchStatus === value;
    } else if (type === 'landing') {
      return this.selectedFilters.landingStatus === value;
    }
    return false;
  }
}

