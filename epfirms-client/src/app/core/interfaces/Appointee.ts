export class Appointee {
    id?: number;
      matter_id?: number; 
      // this is a reference to the User object that holds the appointee information
      non_user_profile_id: number; 
      // this is a reference to the appointer's user table info
      appointer_id: number;

      is_executor:  boolean;

      is_trustee:  boolean;
      is_fpoa:  boolean;
      is_mpoa:  boolean;
      is_gom:  boolean;
      is_gop:  boolean;
      is_goe:  boolean;
      executor_rank: number; 
      trustee_rank: number; 
      fpoa_rank: number; 
      mpoa_rank: number; 
      gop_rank: number; 
      gom_rank: number; 
      goe_rank: number; 
      // profile of the user or non user; essentially personal information
      profile?: object;


      constructor() {
        this.is_executor = false;
        this.is_trustee = false;
        this.is_fpoa = false;
        this.is_mpoa = false;
        this.is_gom = false;
        this.is_gop = false;
        this.is_goe = false;
        this.executor_rank = 0;
        this.trustee_rank = 0;
        this.fpoa_rank = 0;
        this.mpoa_rank = 0;
        this.gop_rank = 0;
        this.gom_rank = 0;
        this.goe_rank = 0;
      }


      patch(appointee: Appointee) {
        this.id = appointee.id;
        this.matter_id = appointee.matter_id;
        this.non_user_profile_id = appointee.non_user_profile_id;
        this.appointer_id = appointee.appointer_id;
        this.is_executor = appointee.is_executor;
        this.is_trustee = appointee.is_trustee;
        this.is_fpoa = appointee.is_fpoa;
        this.is_mpoa = appointee.is_mpoa;
        this.is_gom = appointee.is_gom;
        this.is_gop = appointee.is_gop;
        this.is_goe = appointee.is_goe;
        this.executor_rank = appointee.executor_rank;
        this.trustee_rank = appointee.trustee_rank;
        this.fpoa_rank = appointee.fpoa_rank;
        this.mpoa_rank = appointee.mpoa_rank;
        this.gop_rank = appointee.gop_rank;
        this.gom_rank = appointee.gom_rank;
        this.goe_rank = appointee.goe_rank;
        this.profile = appointee.profile;
      }
}