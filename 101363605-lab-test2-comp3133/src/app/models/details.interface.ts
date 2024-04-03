export interface MissionDetails {
  mission_id: string;
  mission_name: string;
  launch_year: string;
  links: {
    mission_patch_small: string;
  };
  rocket: {
    rocket_name: string;
    rocket_type: string;
  };
  launch_site: {
    site_name_long: string;
  };
  details: string;
}
  