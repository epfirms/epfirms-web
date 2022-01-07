export enum FirmStaffRole {
  PARALEGAL = 'paralegal',
  LEGAL_ASSISTANT = 'legal assistant',
  RECEPTIONIST = 'receptionist',
  OTHER = 'other',
  ATTORNEY = 'attorney',
  ASSOCIATE_ATTORNEY = 'associate attorney',
  OFFICE_MANAGER = 'office manager'
}

export const firmRoleOptions: FirmStaffRole[] = [
    FirmStaffRole.PARALEGAL,
    FirmStaffRole.LEGAL_ASSISTANT,
    FirmStaffRole.RECEPTIONIST,
    FirmStaffRole.OFFICE_MANAGER,
    FirmStaffRole.ATTORNEY,
    FirmStaffRole.ASSOCIATE_ATTORNEY,
    FirmStaffRole.OTHER,
  ]