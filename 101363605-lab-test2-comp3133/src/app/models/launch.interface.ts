export interface Launch {
  mission_id: string;
  mission_name: string;    
  launch_year: string;
  launch_success: boolean;
  links: {
    mission_patch_small: string;
  };
  rocket: {
    first_stage: {
      cores: [
        {
          land_success: boolean | null;
        }
      ];
    };
  };
  launch_site: {
    site_name_long: string;
  };
}